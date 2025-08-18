/**
 * Performance optimization utilities for Core Web Vitals
 */

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload fonts
  const fonts = ['/fonts/inter-var.woff2', '/fonts/inter-latin-ext.woff2'];

  fonts.forEach((font) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.href = font;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Preconnect to external domains
  const domains = [
    'https://fonts.googleapis.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
  ];

  domains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImages() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  );

  images.forEach((img) => imageObserver.observe(img));
}

/**
 * Defer non-critical CSS
 */
export function deferNonCriticalCSS() {
  if (typeof window === 'undefined') return;

  const nonCriticalStyles = document.querySelectorAll('link[data-defer]');

  nonCriticalStyles.forEach((link) => {
    const actualLink = link as HTMLLinkElement;
    actualLink.media = 'print';
    actualLink.onload = function () {
      actualLink.media = 'all';
    };
  });
}

/**
 * Prefetch links on hover/focus
 */
export function prefetchOnInteraction() {
  if (typeof window === 'undefined' || !('requestIdleCallback' in window)) return;

  const prefetchedUrls = new Set<string>();

  const prefetchLink = (url: string) => {
    if (prefetchedUrls.has(url)) return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
    prefetchedUrls.add(url);
  };

  const links = document.querySelectorAll('a[href^="/"]');

  links.forEach((link) => {
    const anchor = link as HTMLAnchorElement;

    ['mouseenter', 'touchstart', 'focus'].forEach((event) => {
      anchor.addEventListener(
        event,
        () => {
          requestIdleCallback(() => {
            prefetchLink(anchor.href);
          });
        },
        { passive: true, once: true }
      );
    });
  });
}

/**
 * Optimize third-party scripts
 */
export function optimizeThirdPartyScripts() {
  if (typeof window === 'undefined') return;

  // Load Google Analytics asynchronously
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
  }

  // Defer non-critical third-party scripts
  const scripts = document.querySelectorAll('script[data-defer]');

  scripts.forEach((script) => {
    const scriptElement = script as HTMLScriptElement;
    scriptElement.defer = true;
  });
}

/**
 * Reduce JavaScript execution time
 */
export function optimizeJavaScriptExecution() {
  if (typeof window === 'undefined') return;

  // Use requestIdleCallback for non-critical tasks
  const nonCriticalTasks: (() => void)[] = [];

  const runNonCriticalTasks = () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback((deadline) => {
        while (deadline.timeRemaining() > 0 && nonCriticalTasks.length > 0) {
          const task = nonCriticalTasks.shift();
          if (task) task();
        }

        if (nonCriticalTasks.length > 0) {
          runNonCriticalTasks();
        }
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        const task = nonCriticalTasks.shift();
        if (task) task();

        if (nonCriticalTasks.length > 0) {
          runNonCriticalTasks();
        }
      }, 1);
    }
  };

  // Export function to add non-critical tasks
  (window as any).addNonCriticalTask = (task: () => void) => {
    nonCriticalTasks.push(task);
    if (nonCriticalTasks.length === 1) {
      runNonCriticalTasks();
    }
  };
}

/**
 * Implement resource hints
 */
export function implementResourceHints() {
  if (typeof window === 'undefined') return;

  // DNS prefetch for external domains
  const dnsPrefetchDomains = [
    'fonts.gstatic.com',
    'www.google-analytics.com',
    'www.googletagmanager.com',
  ];

  dnsPrefetchDomains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });
}

/**
 * Monitor and report performance metrics
 */
export function monitorPerformance() {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  // Log navigation timing
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      if (perfData) {
        const metrics = {
          dnsLookup: perfData.domainLookupEnd - perfData.domainLookupStart,
          tcpConnection: perfData.connectEnd - perfData.connectStart,
          request: perfData.responseStart - perfData.requestStart,
          response: perfData.responseEnd - perfData.responseStart,
          domProcessing: perfData.domComplete - perfData.domInteractive,
          loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
          totalTime: perfData.loadEventEnd - perfData.fetchStart,
        };

        // Log slow metrics
        Object.entries(metrics).forEach(([key, value]) => {
          if (value > 1000) {
            console.warn(`[Performance] Slow ${key}: ${value}ms`);
          }
        });

        // Send to analytics
        if (window.gtag) {
          window.gtag('event', 'performance_metrics', {
            event_category: 'Performance',
            event_label: 'Page Load',
            value: Math.round(metrics.totalTime),
          });
        }
      }
    }, 0);
  });
}

/**
 * Initialize all performance optimizations
 */
export function initializePerformanceOptimizations() {
  if (typeof window === 'undefined') return;

  // Run immediately
  preloadCriticalResources();
  implementResourceHints();

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      lazyLoadImages();
      deferNonCriticalCSS();
      prefetchOnInteraction();
      optimizeThirdPartyScripts();
      optimizeJavaScriptExecution();
    });
  } else {
    lazyLoadImages();
    deferNonCriticalCSS();
    prefetchOnInteraction();
    optimizeThirdPartyScripts();
    optimizeJavaScriptExecution();
  }

  // Monitor performance
  monitorPerformance();
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
  initializePerformanceOptimizations();
}
