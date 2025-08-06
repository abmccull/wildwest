/**
 * Cache Monitoring Utility
 * Tracks cache performance and provides insights
 */

interface CacheMetrics {
  hits: number;
  misses: number;
  size: number;
  items: number;
  performance: {
    averageLoadTime: number;
    cachedLoadTime: number;
    networkLoadTime: number;
  };
}

class CacheMonitor {
  private metrics: Map<string, CacheMetrics> = new Map();
  private performanceObserver: PerformanceObserver | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializePerformanceObserver();
      this.monitorCacheAPI();
    }
  }

  private initializePerformanceObserver() {
    if ('PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            this.trackResourceTiming(resourceEntry);
          }
        }
      });

      this.performanceObserver.observe({ entryTypes: ['resource'] });
    }
  }

  private trackResourceTiming(entry: PerformanceResourceTiming) {
    const url = new URL(entry.name);
    const isThirdParty = url.origin !== window.location.origin;
    const cacheType = isThirdParty ? 'third-party' : 'first-party';
    
    const metrics = this.metrics.get(cacheType) || this.createEmptyMetrics();
    
    // Check if resource was served from cache
    const fromCache = entry.transferSize === 0 && entry.decodedBodySize > 0;
    
    if (fromCache) {
      metrics.hits++;
      metrics.performance.cachedLoadTime = 
        (metrics.performance.cachedLoadTime + entry.duration) / 2;
    } else {
      metrics.misses++;
      metrics.performance.networkLoadTime = 
        (metrics.performance.networkLoadTime + entry.duration) / 2;
    }
    
    metrics.performance.averageLoadTime = 
      (metrics.performance.averageLoadTime + entry.duration) / 2;
    
    this.metrics.set(cacheType, metrics);
  }

  private monitorCacheAPI() {
    if ('caches' in window) {
      // Periodically check cache storage
      setInterval(async () => {
        try {
          const cacheNames = await caches.keys();
          for (const cacheName of cacheNames) {
            const cache = await caches.open(cacheName);
            const requests = await cache.keys();
            
            const metrics = this.metrics.get(cacheName) || this.createEmptyMetrics();
            metrics.items = requests.length;
            
            // Estimate cache size
            if ('estimate' in navigator.storage) {
              const estimate = await navigator.storage.estimate();
              metrics.size = estimate.usage || 0;
            }
            
            this.metrics.set(cacheName, metrics);
          }
        } catch (error) {
          console.error('Cache monitoring error:', error);
        }
      }, 30000); // Check every 30 seconds
    }
  }

  private createEmptyMetrics(): CacheMetrics {
    return {
      hits: 0,
      misses: 0,
      size: 0,
      items: 0,
      performance: {
        averageLoadTime: 0,
        cachedLoadTime: 0,
        networkLoadTime: 0,
      },
    };
  }

  public getMetrics(): Map<string, CacheMetrics> {
    return this.metrics;
  }

  public getCacheHitRate(cacheType: string = 'all'): number {
    if (cacheType === 'all') {
      let totalHits = 0;
      let totalRequests = 0;
      
      this.metrics.forEach((metrics) => {
        totalHits += metrics.hits;
        totalRequests += metrics.hits + metrics.misses;
      });
      
      return totalRequests > 0 ? (totalHits / totalRequests) * 100 : 0;
    }
    
    const metrics = this.metrics.get(cacheType);
    if (!metrics) return 0;
    
    const total = metrics.hits + metrics.misses;
    return total > 0 ? (metrics.hits / total) * 100 : 0;
  }

  public getPerformanceGain(): number {
    let cachedTime = 0;
    let networkTime = 0;
    let count = 0;
    
    this.metrics.forEach((metrics) => {
      if (metrics.performance.cachedLoadTime > 0) {
        cachedTime += metrics.performance.cachedLoadTime;
        networkTime += metrics.performance.networkLoadTime;
        count++;
      }
    });
    
    if (count === 0 || networkTime === 0) return 0;
    
    const avgCached = cachedTime / count;
    const avgNetwork = networkTime / count;
    
    return ((avgNetwork - avgCached) / avgNetwork) * 100;
  }

  public logMetrics() {
    console.group('Cache Performance Metrics');
    
    this.metrics.forEach((metrics, cacheType) => {
      console.group(cacheType);
      console.log(`Hit Rate: ${this.getCacheHitRate(cacheType).toFixed(2)}%`);
      console.log(`Hits: ${metrics.hits}`);
      console.log(`Misses: ${metrics.misses}`);
      console.log(`Items Cached: ${metrics.items}`);
      console.log(`Cache Size: ${(metrics.size / 1024 / 1024).toFixed(2)} MB`);
      console.log(`Avg Load Time: ${metrics.performance.averageLoadTime.toFixed(2)}ms`);
      console.log(`Cached Load Time: ${metrics.performance.cachedLoadTime.toFixed(2)}ms`);
      console.log(`Network Load Time: ${metrics.performance.networkLoadTime.toFixed(2)}ms`);
      console.groupEnd();
    });
    
    console.log(`Overall Cache Hit Rate: ${this.getCacheHitRate().toFixed(2)}%`);
    console.log(`Performance Gain: ${this.getPerformanceGain().toFixed(2)}%`);
    console.groupEnd();
  }

  public reportToAnalytics() {
    // Send cache metrics to analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = window.gtag as Function;
      
      gtag('event', 'cache_performance', {
        event_category: 'Performance',
        event_label: 'Cache Metrics',
        value: Math.round(this.getCacheHitRate()),
        custom_map: {
          dimension1: 'cache_hit_rate',
          dimension2: 'performance_gain',
          metric1: this.getCacheHitRate(),
          metric2: this.getPerformanceGain(),
        },
      });
    }
  }

  public destroy() {
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
      this.performanceObserver = null;
    }
  }
}

// Export singleton instance
let cacheMonitorInstance: CacheMonitor | null = null;

export function getCacheMonitor(): CacheMonitor {
  if (!cacheMonitorInstance && typeof window !== 'undefined') {
    cacheMonitorInstance = new CacheMonitor();
  }
  return cacheMonitorInstance!;
}

export function destroyCacheMonitor() {
  if (cacheMonitorInstance) {
    cacheMonitorInstance.destroy();
    cacheMonitorInstance = null;
  }
}

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  getCacheMonitor();
  
  // Log metrics in development
  if (process.env.NODE_ENV === 'development') {
    setInterval(() => {
      getCacheMonitor().logMetrics();
    }, 60000); // Log every minute in dev
  }
  
  // Report to analytics in production
  if (process.env.NODE_ENV === 'production') {
    setInterval(() => {
      getCacheMonitor().reportToAnalytics();
    }, 300000); // Report every 5 minutes in production
  }
}