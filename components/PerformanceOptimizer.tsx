"use client";

import { useEffect } from "react";

/**
 * Performance Optimizer Component
 * Prevents forced reflows, optimizes JavaScript execution,
 * and improves overall rendering performance
 */
const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Batch DOM reads and writes to prevent forced reflows
    const optimizeDOMOperations = () => {
      // Use requestAnimationFrame to batch DOM operations
      const batchDOMUpdates = (callback: () => void) => {
        requestAnimationFrame(() => {
          callback();
        });
      };

      // Override common DOM methods that cause reflows
      const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
      const originalOffsetHeight = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'offsetHeight'
      );
      const originalOffsetWidth = Object.getOwnPropertyDescriptor(
        HTMLElement.prototype,
        'offsetWidth'
      );
      const originalScrollHeight = Object.getOwnPropertyDescriptor(
        Element.prototype,
        'scrollHeight'
      );
      const originalScrollWidth = Object.getOwnPropertyDescriptor(
        Element.prototype,
        'scrollWidth'
      );

      // Cache geometric properties to reduce reflows
      const geometryCache = new WeakMap();
      const cacheTimeout = 16; // One frame at 60fps

      // Helper to get cached geometry
      const getCachedGeometry = (element: Element, getter: () => any) => {
        if (!geometryCache.has(element)) {
          geometryCache.set(element, {
            value: getter(),
            timestamp: Date.now()
          });
        }
        
        const cached = geometryCache.get(element);
        if (Date.now() - cached.timestamp > cacheTimeout) {
          cached.value = getter();
          cached.timestamp = Date.now();
        }
        
        return cached.value;
      };

      // Optimize getBoundingClientRect calls
      Element.prototype.getBoundingClientRect = function() {
        return getCachedGeometry(this, () => originalGetBoundingClientRect.call(this));
      };

      // Batch style changes
      const batchStyleChanges = () => {
        const styleChanges: Array<{ element: HTMLElement; changes: Partial<CSSStyleDeclaration> }> = [];
        
        // Override style setter
        const originalStyleSetter = Object.getOwnPropertyDescriptor(
          HTMLElement.prototype,
          'style'
        );
        
        if (originalStyleSetter?.set) {
          Object.defineProperty(HTMLElement.prototype, 'style', {
            ...originalStyleSetter,
            set: function(value) {
              batchDOMUpdates(() => {
                originalStyleSetter.set?.call(this, value);
              });
            }
          });
        }
      };

      batchStyleChanges();
    };

    // Optimize scroll event handlers
    const optimizeScrollHandlers = () => {
      let scrollTimeout: NodeJS.Timeout;
      let isScrolling = false;
      
      const handleScroll = () => {
        if (!isScrolling) {
          window.requestAnimationFrame(() => {
            // Dispatch custom event for optimized scroll handling
            window.dispatchEvent(new CustomEvent('optimizedscroll'));
            isScrolling = false;
          });
          isScrolling = true;
        }
        
        // Debounce scroll end
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          window.dispatchEvent(new CustomEvent('scrollend'));
        }, 150);
      };
      
      // Replace default scroll listener with optimized version
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    };

    // Optimize resize event handlers
    const optimizeResizeHandlers = () => {
      let resizeTimeout: NodeJS.Timeout;
      let isResizing = false;
      
      const handleResize = () => {
        if (!isResizing) {
          window.requestAnimationFrame(() => {
            // Dispatch custom event for optimized resize handling
            window.dispatchEvent(new CustomEvent('optimizedresize'));
            isResizing = false;
          });
          isResizing = true;
        }
        
        // Debounce resize end
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          window.dispatchEvent(new CustomEvent('resizeend'));
        }, 300);
      };
      
      window.addEventListener('resize', handleResize, { passive: true });
      
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
      };
    };

    // Optimize image loading to prevent layout shifts
    const optimizeImageLoading = () => {
      const images = document.querySelectorAll('img:not([data-optimized])');
      
      images.forEach((img: Element) => {
        const imgElement = img as HTMLImageElement;
        
        // Mark as optimized
        imgElement.dataset.optimized = 'true';
        
        // Set dimensions if not already set
        if (!imgElement.width && imgElement.naturalWidth) {
          imgElement.width = imgElement.naturalWidth;
        }
        if (!imgElement.height && imgElement.naturalHeight) {
          imgElement.height = imgElement.naturalHeight;
        }
        
        // Add loading=lazy if not critical
        if (!imgElement.loading && !imgElement.dataset.priority) {
          imgElement.loading = 'lazy';
        }
        
        // Prevent layout shift on load
        imgElement.addEventListener('load', () => {
          imgElement.classList.add('loaded');
        }, { once: true });
      });
    };

    // Defer non-critical JavaScript execution
    const deferNonCriticalJS = () => {
      // Move non-critical scripts to idle time
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          // Load analytics and other non-critical scripts
          const scripts = document.querySelectorAll('script[data-defer]');
          scripts.forEach((script) => {
            const newScript = document.createElement('script');
            Array.from(script.attributes).forEach(attr => {
              newScript.setAttribute(attr.name, attr.value);
            });
            newScript.textContent = script.textContent;
            script.parentNode?.replaceChild(newScript, script);
          });
        }, { timeout: 2000 });
      }
    };

    // Use Intersection Observer for lazy loading
    const setupLazyLoading = () => {
      if ('IntersectionObserver' in window) {
        const lazyLoadObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const target = entry.target as HTMLElement;
                
                // Load lazy images
                if (target.tagName === 'IMG' && target.dataset.src) {
                  (target as HTMLImageElement).src = target.dataset.src;
                  delete target.dataset.src;
                }
                
                // Load lazy components
                if (target.dataset.lazyLoad) {
                  target.classList.add('lazy-loaded');
                  delete target.dataset.lazyLoad;
                }
                
                lazyLoadObserver.unobserve(target);
              }
            });
          },
          {
            rootMargin: '50px 0px',
            threshold: 0.01
          }
        );
        
        // Observe all lazy elements
        document.querySelectorAll('[data-src], [data-lazy-load]').forEach(el => {
          lazyLoadObserver.observe(el);
        });
        
        return lazyLoadObserver;
      }
      return null;
    };

    // Optimize animation frames
    const optimizeAnimations = () => {
      let rafId: number | null = null;
      const animations: Array<() => void> = [];
      
      const runAnimations = () => {
        animations.forEach(fn => fn());
        animations.length = 0;
        rafId = null;
      };
      
      // Batch animations
      (window as any).scheduleAnimation = (fn: () => void) => {
        animations.push(fn);
        if (!rafId) {
          rafId = requestAnimationFrame(runAnimations);
        }
      };
    };

    // Monitor and log performance metrics
    const monitorPerformance = () => {
      if ('PerformanceObserver' in window) {
        // Monitor long tasks
        try {
          const longTaskObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
              if (entry.duration > 50) {
                if (process.env.NODE_ENV === 'development') {
                  console.warn('Long task detected:', entry.duration, 'ms');
                }
                
                // Report to analytics if needed
                if ((window as any).gtag) {
                  (window as any).gtag('event', 'performance', {
                    event_category: 'Web Vitals',
                    event_label: 'Long Task',
                    value: Math.round(entry.duration)
                  });
                }
              }
            });
          });
          
          longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch (e) {
          // Silently handle if longtask is not supported
        }
        
        // Monitor layout shifts
        try {
          const layoutShiftObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (entry.value > 0.1) {
                if (process.env.NODE_ENV === 'development') {
                  console.warn('Layout shift detected:', entry.value);
                }
              }
            });
          });
          
          layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          // Silently handle if layout-shift is not supported
        }
      }
    };

    // Initialize all optimizations
    const initialize = () => {
      optimizeDOMOperations();
      const scrollCleanup = optimizeScrollHandlers();
      const resizeCleanup = optimizeResizeHandlers();
      optimizeImageLoading();
      deferNonCriticalJS();
      const lazyObserver = setupLazyLoading();
      optimizeAnimations();
      monitorPerformance();
      
      // Setup mutation observer for new content
      const mutationObserver = new MutationObserver(() => {
        optimizeImageLoading();
      });
      
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      // Cleanup function
      return () => {
        scrollCleanup();
        resizeCleanup();
        lazyObserver?.disconnect();
        mutationObserver.disconnect();
      };
    };

    // Run optimizations based on document state
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialize);
    } else {
      const cleanup = initialize();
      return cleanup;
    }
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceOptimizer;