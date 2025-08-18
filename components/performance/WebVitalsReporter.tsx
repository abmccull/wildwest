'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric) {
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value);

    // Provide performance recommendations
    const recommendations: Record<
      string,
      { good: number; needs_improvement: number; poor: number; tip: string }
    > = {
      CLS: {
        good: 0.1,
        needs_improvement: 0.25,
        poor: 0.25,
        tip: 'Reduce layout shifts by setting explicit dimensions on images and avoiding dynamic content insertion.',
      },
      FCP: {
        good: 1800,
        needs_improvement: 3000,
        poor: 3000,
        tip: 'Improve First Contentful Paint by reducing render-blocking resources and optimizing critical CSS.',
      },
      FID: {
        good: 100,
        needs_improvement: 300,
        poor: 300,
        tip: 'Improve First Input Delay by breaking up long tasks and using web workers for heavy computations.',
      },
      INP: {
        good: 200,
        needs_improvement: 500,
        poor: 500,
        tip: 'Improve Interaction to Next Paint by optimizing event handlers and reducing JavaScript execution time.',
      },
      LCP: {
        good: 2500,
        needs_improvement: 4000,
        poor: 4000,
        tip: 'Improve Largest Contentful Paint by optimizing images, preloading critical resources, and using a CDN.',
      },
      TTFB: {
        good: 800,
        needs_improvement: 1800,
        poor: 1800,
        tip: 'Improve Time to First Byte by optimizing server response times and using caching strategies.',
      },
    };

    const threshold = recommendations[metric.name];
    if (threshold) {
      let rating = 'good';
      if (metric.value > threshold.needs_improvement) {
        rating = metric.value > threshold.poor ? 'poor' : 'needs improvement';
      }

      console.log(`[Web Vitals] ${metric.name} rating: ${rating}`);
      if (rating !== 'good') {
        console.log(`[Web Vitals] Tip: ${threshold.tip}`);
      }
    }
  }

  // Send to custom analytics endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        id: metric.id,
        navigationType: metric.navigationType,
        url: window.location.href,
        timestamp: Date.now(),
      }),
    }).catch(() => {
      // Silently fail analytics reporting
    });
  }
}

export function WebVitalsReporter() {
  useEffect(() => {
    // Report all Web Vitals metrics
    onCLS(sendToAnalytics);
    onFCP(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);

    // Performance observer for additional metrics
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Observe long tasks
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('[Performance] Long task detected:', {
                duration: entry.duration,
                startTime: entry.startTime,
                name: entry.name,
              });
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Long task observer not supported
      }

      // Observe resource timing
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const resourceEntry = entry as PerformanceResourceTiming;
            if (resourceEntry.duration > 1000) {
              console.warn('[Performance] Slow resource:', {
                name: resourceEntry.name,
                duration: resourceEntry.duration,
                type: resourceEntry.initiatorType,
              });
            }
          }
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        // Resource timing observer not supported
      }
    }

    // Monitor memory usage (Chrome only)
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const checkMemory = () => {
        const memory = (performance as any).memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
        const totalMB = Math.round(memory.totalJSHeapSize / 1048576);

        if (usedMB > totalMB * 0.9) {
          console.warn('[Performance] High memory usage:', {
            used: `${usedMB}MB`,
            total: `${totalMB}MB`,
            percentage: Math.round((usedMB / totalMB) * 100),
          });
        }
      };

      // Check memory every 30 seconds
      const memoryInterval = setInterval(checkMemory, 30000);
      return () => clearInterval(memoryInterval);
    }
  }, []);

  return null;
}

export default WebVitalsReporter;
