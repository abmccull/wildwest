"use client";

import { useEffect } from "react";

/**
 * Resource Loader Component
 * Optimizes network dependency chain and resource loading priorities
 * Reduces critical path latency and improves overall load performance
 */
const ResourceLoader: React.FC = () => {
  useEffect(() => {
    // Priority queue for resource loading
    const resourceQueue = {
      critical: [] as Array<() => Promise<void>>,
      high: [] as Array<() => Promise<void>>,
      normal: [] as Array<() => Promise<void>>,
      low: [] as Array<() => Promise<void>>
    };

    // Load resources based on priority
    const loadResourcesByPriority = async () => {
      // Load critical resources first
      await Promise.all(resourceQueue.critical.map(fn => fn()));
      
      // Load high priority resources
      requestAnimationFrame(() => {
        Promise.all(resourceQueue.high.map(fn => fn()));
      });
      
      // Load normal priority resources when idle
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          Promise.all(resourceQueue.normal.map(fn => fn()));
        }, { timeout: 3000 });
      } else {
        setTimeout(() => {
          Promise.all(resourceQueue.normal.map(fn => fn()));
        }, 100);
      }
      
      // Load low priority resources after everything else
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          Promise.all(resourceQueue.low.map(fn => fn()));
        }, { timeout: 5000 });
      } else {
        setTimeout(() => {
          Promise.all(resourceQueue.low.map(fn => fn()));
        }, 2000);
      }
    };

    // Optimize CSS loading chain
    const optimizeCSSChain = () => {
      const links = document.querySelectorAll('link[rel="stylesheet"]');
      const cssUrls: string[] = [];
      
      links.forEach((link: Element) => {
        const linkElement = link as HTMLLinkElement;
        if (linkElement.href && !linkElement.dataset.optimized) {
          cssUrls.push(linkElement.href);
          linkElement.dataset.optimized = 'true';
        }
      });
      
      // Load CSS files in parallel with fetch
      cssUrls.forEach((url) => {
        resourceQueue.critical.push(async () => {
          try {
            const response = await fetch(url, {
              priority: 'high' as RequestPriority,
              mode: 'no-cors'
            });
            
            // Preload the CSS content
            if (response.ok || response.type === 'opaque') {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'style';
              link.href = url;
              document.head.appendChild(link);
            }
          } catch (e) {
            // Silently handle fetch errors
          }
        });
      });
    };

    // Optimize JavaScript loading chain
    const optimizeJSChain = () => {
      const scripts = document.querySelectorAll('script[src]');
      
      scripts.forEach((script: Element) => {
        const scriptElement = script as HTMLScriptElement;
        
        if (scriptElement.src && !scriptElement.dataset.optimized) {
          scriptElement.dataset.optimized = 'true';
          
          // Determine priority based on script attributes or URL
          const isAnalytics = scriptElement.src.includes('analytics') || 
                            scriptElement.src.includes('gtag') ||
                            scriptElement.src.includes('facebook');
          
          const isFramework = scriptElement.src.includes('_next/static/chunks/framework') ||
                             scriptElement.src.includes('_next/static/chunks/main');
          
          if (isFramework) {
            // Framework scripts are critical
            resourceQueue.critical.push(async () => {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'script';
              link.href = scriptElement.src;
              document.head.appendChild(link);
            });
          } else if (isAnalytics) {
            // Analytics are low priority
            resourceQueue.low.push(async () => {
              scriptElement.async = true;
              scriptElement.defer = true;
            });
          } else {
            // Other scripts are normal priority
            resourceQueue.normal.push(async () => {
              scriptElement.async = true;
            });
          }
        }
      });
    };

    // Optimize font loading chain
    const optimizeFontChain = () => {
      // Preload critical font files
      const criticalFonts = [
        'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.woff2',
        'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.woff2'
      ];
      
      criticalFonts.forEach((fontUrl) => {
        resourceQueue.critical.push(async () => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'font';
          link.type = 'font/woff2';
          link.crossOrigin = 'anonymous';
          link.href = fontUrl;
          document.head.appendChild(link);
        });
      });
      
      // Optimize Google Fonts CSS
      const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
      fontLinks.forEach((link: Element) => {
        const linkElement = link as HTMLLinkElement;
        
        // Add display=swap if not present
        if (!linkElement.href.includes('display=')) {
          const separator = linkElement.href.includes('?') ? '&' : '?';
          linkElement.href = `${linkElement.href}${separator}display=swap`;
        }
        
        // Set as high priority
        (linkElement as any).fetchPriority = 'high';
      });
    };

    // Optimize image loading chain
    const optimizeImageChain = () => {
      const images = document.querySelectorAll('img');
      const viewportHeight = window.innerHeight;
      
      images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const isAboveFold = rect.top < viewportHeight;
        
        if (isAboveFold && !img.loading) {
          // Above-fold images should load eagerly
          img.loading = 'eager';
          (img as any).fetchPriority = 'high';
          
          // Preload if src is available
          if (img.src) {
            resourceQueue.high.push(async () => {
              const link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = img.src;
              if (img.srcset) {
                (link as any).imageSrcset = img.srcset;
              }
              document.head.appendChild(link);
            });
          }
        } else if (!img.loading) {
          // Below-fold images should lazy load
          img.loading = 'lazy';
          (img as any).fetchPriority = 'low';
        }
      });
    };

    // Prefetch critical pages for faster navigation
    const prefetchCriticalPages = () => {
      const criticalPaths = [
        '/services/flooring',
        '/services/demolition',
        '/services/junk-removal'
      ];
      
      criticalPaths.forEach((path) => {
        resourceQueue.low.push(async () => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = path;
          document.head.appendChild(link);
        });
      });
    };

    // Use Resource Hints API for better loading
    const setupResourceHints = () => {
      // Preconnect to critical domains
      const criticalDomains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com'
      ];
      
      criticalDomains.forEach((domain) => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        if (domain.includes('fonts.gstatic.com')) {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      });
      
      // DNS prefetch for analytics
      const analyticsDomains = [
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://connect.facebook.net'
      ];
      
      analyticsDomains.forEach((domain) => {
        resourceQueue.low.push(async () => {
          const link = document.createElement('link');
          link.rel = 'dns-prefetch';
          link.href = domain;
          document.head.appendChild(link);
        });
      });
    };

    // Monitor network performance
    const monitorNetworkPerformance = () => {
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              // Log slow resources in development
              if (process.env.NODE_ENV === 'development') {
                if (entry.duration > 500) {
                  console.warn(`Slow resource: ${entry.name} took ${entry.duration}ms`);
                }
              }
              
              // Track critical resource timing
              if (entry.initiatorType === 'css' && entry.duration > 150) {
                // CSS is taking too long, might be render-blocking
                if ((window as any).gtag) {
                  (window as any).gtag('event', 'performance', {
                    event_category: 'Resource Timing',
                    event_label: 'Slow CSS',
                    value: Math.round(entry.duration)
                  });
                }
              }
            });
          });
          
          observer.observe({ entryTypes: ['resource'] });
        } catch (e) {
          // Silently handle if not supported
        }
      }
    };

    // HTTP/2 Server Push simulation via preload
    const simulateServerPush = () => {
      // Critical resources that would benefit from server push
      const pushResources = [
        { href: '/logo.webp', as: 'image', type: 'image/webp' }
      ];
      
      pushResources.forEach((resource) => {
        const existingPreload = document.querySelector(
          `link[rel="preload"][href="${resource.href}"]`
        );
        
        if (!existingPreload) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = resource.href;
          link.as = resource.as;
          if (resource.type) {
            link.type = resource.type;
          }
          document.head.insertBefore(link, document.head.firstChild);
        }
      });
    };

    // Initialize resource optimization
    const initialize = () => {
      // Setup optimizations
      setupResourceHints();
      optimizeCSSChain();
      optimizeJSChain();
      optimizeFontChain();
      optimizeImageChain();
      prefetchCriticalPages();
      simulateServerPush();
      monitorNetworkPerformance();
      
      // Execute resource loading queue
      loadResourcesByPriority();
      
      // Re-optimize when new content is added
      const observer = new MutationObserver(() => {
        optimizeImageChain();
        optimizeJSChain();
      });
      
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
      
      return observer;
    };

    // Start optimization immediately
    const observer = initialize();
    
    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ResourceLoader;