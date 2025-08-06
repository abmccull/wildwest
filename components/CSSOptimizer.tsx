"use client";

import { useEffect } from "react";

/**
 * Advanced CSS Optimizer Component
 * Implements critical CSS loading strategy to eliminate render-blocking CSS
 * and improve LCP/FCP performance metrics
 */
const CSSOptimizer: React.FC = () => {
  useEffect(() => {
    // Load CSS asynchronously after critical rendering
    const loadCSSAsynchronously = () => {
      // Find Next.js CSS files that need to be loaded
      const existingStylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      const cssFiles: string[] = [];
      
      // Extract CSS file URLs from existing stylesheets
      existingStylesheets.forEach((link: any) => {
        if (link.href && link.href.includes('_next/static/css/')) {
          cssFiles.push(link.href);
          // Remove the render-blocking stylesheet temporarily
          link.disabled = true;
        }
      });
      
      // If no existing CSS files found, try to discover them
      if (cssFiles.length === 0) {
        // Look for CSS files in script tags or manifest
        const scripts = document.querySelectorAll('script');
        scripts.forEach((script: any) => {
          if (script.innerHTML && script.innerHTML.includes('_next/static/css/')) {
            const matches = script.innerHTML.match(/"_next\/static\/css\/[^"]+\.css"/g);
            if (matches) {
              matches.forEach((match: string) => {
                const cssUrl = match.replace(/"/g, '');
                if (!cssFiles.includes(cssUrl)) {
                  cssFiles.push(cssUrl);
                }
              });
            }
          }
        });
      }
      
      // Load CSS files asynchronously
      cssFiles.forEach((cssUrl) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = cssUrl;
        link.onload = function() {
          // Convert preload to stylesheet after loading
          const stylesheet = document.createElement('link');
          stylesheet.rel = 'stylesheet';
          stylesheet.href = cssUrl;
          stylesheet.media = 'all';
          document.head.appendChild(stylesheet);
        };
        document.head.appendChild(link);
      });
    };

    // Re-enable critical rendering path after initial paint
    const optimizeCriticalRenderingPath = () => {
      // Delay non-critical CSS loading until after initial paint
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          loadCSSAsynchronously();
        });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          loadCSSAsynchronously();
        }, 100);
      }
    };

    // Optimize font loading for performance
    const optimizeFonts = () => {
      // Ensure Inter font is loaded with optimal display strategy
      const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"], link[href*="fonts.gstatic.com"]');
      fontLinks.forEach((link: any) => {
        if (link.href && !link.href.includes('display=swap')) {
          const separator = link.href.includes('?') ? '&' : '?';
          link.href = `${link.href}${separator}display=swap`;
        }
      });

      // Preload font files for better performance
      const fontPreloads = [
        'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.woff2',
        'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.woff2'
      ];

      fontPreloads.forEach(fontUrl => {
        const existingPreload = document.querySelector(`link[href="${fontUrl}"]`);
        if (!existingPreload) {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'font';
          preloadLink.type = 'font/woff2';
          preloadLink.crossOrigin = 'anonymous';
          preloadLink.href = fontUrl;
          document.head.appendChild(preloadLink);
        }
      });
    };

    // Setup intersection observer for progressive enhancement
    const setupProgressiveEnhancement = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              
              // Enable transitions and animations for below-fold content
              target.style.transition = 'all 0.3s ease-in-out';
              
              // Load non-critical images
              const images = target.querySelectorAll('img[data-src]');
              images.forEach((img: any) => {
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.removeAttribute('data-src');
                }
              });
              
              // Load non-critical components
              const lazyComponents = target.querySelectorAll('[data-lazy-component]');
              lazyComponents.forEach((component: any) => {
                const componentName = component.dataset.lazyComponent;
                // Trigger lazy loading for specific components
                if (componentName) {
                  component.classList.add('component-loaded');
                }
              });
              
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.1,
        }
      );

      // Observe below-fold sections
      const belowFoldElements = document.querySelectorAll('[id*="below-fold"], .below-fold, [data-below-fold]');
      belowFoldElements.forEach((el) => observer.observe(el));
      
      return observer;
    };

    // Prefetch critical resources for future navigation
    const prefetchCriticalResources = () => {
      const criticalPages = ['/', '/services/flooring', '/services/demolition', '/services/junk-removal'];
      
      criticalPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });
    };

    // Monitor and optimize performance metrics
    const monitorPerformance = () => {
      // Monitor LCP
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            // Log LCP for debugging (remove in production)
            if (process.env.NODE_ENV === 'development') {
              console.log('LCP:', lastEntry.startTime);
            }
            
            // If LCP is still poor, try additional optimizations
            if (lastEntry.startTime > 2500) {
              // Additional optimizations for slow LCP
              optimizeCriticalRenderingPath();
            }
          });
          
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // Silently handle any errors
        }
      }
    };

    // Main initialization function
    const initialize = () => {
      optimizeFonts();
      setupProgressiveEnhancement();
      monitorPerformance();
      
      // Delay non-critical optimizations
      setTimeout(() => {
        prefetchCriticalResources();
        optimizeCriticalRenderingPath();
      }, 1000);
    };

    // Run optimizations based on document ready state
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialize);
    } else {
      initialize();
    }

    // Cleanup function
    return () => {
      // Cleanup observers and event listeners
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default CSSOptimizer;