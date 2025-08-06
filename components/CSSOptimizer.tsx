"use client";

import { useEffect } from "react";

/**
 * Enhanced CSS Optimizer Component
 * Aggressively eliminates render-blocking CSS and optimizes resource loading
 * Targets Core Web Vitals: LCP < 2.5s, FCP < 1.8s, CLS < 0.1
 */
const CSSOptimizer: React.FC = () => {
  useEffect(() => {
    // Aggressive CSS optimization to eliminate ALL render-blocking
    const loadCSSAsynchronously = () => {
      // Find ALL stylesheets, including render-blocking ones
      const allStylesheets = document.querySelectorAll('link[rel="stylesheet"], link[data-n-css]');
      const cssFiles: string[] = [];
      
      // Aggressively handle ALL stylesheets to prevent render-blocking
      allStylesheets.forEach((link: any) => {
        if (link.href && !link.dataset.cssOptimized) {
          cssFiles.push(link.href);
          
          // Mark as optimized to prevent reprocessing
          link.dataset.cssOptimized = 'true';
          
          // Clone the link for async loading
          const asyncLink = link.cloneNode() as HTMLLinkElement;
          asyncLink.media = 'print';
          asyncLink.onload = function() {
            asyncLink.media = 'all';
            asyncLink.onload = null;
          };
          
          // Replace original with async version
          link.parentNode?.replaceChild(asyncLink, link);
          
          // Ensure media is set after next frame
          requestAnimationFrame(() => {
            if (asyncLink.media === 'print') {
              asyncLink.media = 'all';
            }
          });
        }
      });
      
      // Discover CSS files from Next.js build manifest
      if (cssFiles.length === 0) {
        // Look for build manifest or script tags containing CSS references
        const scripts = document.querySelectorAll('script[id="__NEXT_DATA__"], script');
        scripts.forEach((script: any) => {
          let scriptContent = script.innerHTML || script.textContent || '';
          
          // Look for CSS file patterns
          const cssPatterns = [
            /"_next\/static\/css\/[a-z0-9]+\.css"/g,
            /static\/css\/[a-z0-9]+\.css/g,
            /dc1f36d2e80006fc\.css/g
          ];
          
          cssPatterns.forEach(pattern => {
            const matches = scriptContent.match(pattern);
            if (matches) {
              matches.forEach((match: string) => {
                let cssUrl = match.replace(/"/g, '');
                // Ensure absolute URL
                if (cssUrl.startsWith('_next/')) {
                  cssUrl = '/' + cssUrl;
                }
                if (!cssFiles.includes(cssUrl)) {
                  cssFiles.push(cssUrl);
                }
              });
            }
          });
        });
      }
      
      // Enhanced async loading with priority hints
      cssFiles.forEach((cssUrl, index) => {
        // Skip if already has a preload
        const existingPreload = document.querySelector(`link[rel="preload"][href="${cssUrl}"]`);
        if (!existingPreload) {
          // Create high-priority preload for critical CSS
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'style';
          preloadLink.href = cssUrl;
          preloadLink.crossOrigin = 'anonymous';
          
          // Add fetchpriority for critical CSS (first file)
          if (index === 0) {
            (preloadLink as any).fetchPriority = 'high';
          }
          
          document.head.insertBefore(preloadLink, document.head.firstChild);
        }
        
        // Check if stylesheet already exists
        const existingStylesheet = document.querySelector(`link[rel="stylesheet"][href="${cssUrl}"]`);
        if (!existingStylesheet) {
          // Create async stylesheet
          const stylesheet = document.createElement('link');
          stylesheet.rel = 'stylesheet';
          stylesheet.href = cssUrl;
          stylesheet.media = 'print';
          (stylesheet as any).dataset.cssOptimized = 'true';
          
          // Progressive loading
          stylesheet.onload = function() {
            stylesheet.media = 'all';
            stylesheet.onload = null;
          };
          
          // Immediate fallback using requestAnimationFrame
          requestAnimationFrame(() => {
            stylesheet.media = 'all';
          });
          
          document.head.appendChild(stylesheet);
        }
      });
      
      // Performance logging in development
      if (process.env.NODE_ENV === 'development' && cssFiles.length > 0) {
        console.log('🎨 CSSOptimizer: Loaded', cssFiles.length, 'CSS files asynchronously:', cssFiles);
      }
    };

    // Ultra-aggressive critical rendering path optimization
    const optimizeCriticalRenderingPath = () => {
      // Run multiple times to catch all CSS
      loadCSSAsynchronously();
      
      // Use microtask to run ASAP
      Promise.resolve().then(() => loadCSSAsynchronously());
      
      // Run after next frame
      if ('requestAnimationFrame' in window) {
        requestAnimationFrame(() => {
          loadCSSAsynchronously();
          // Double-check after animation frame
          requestAnimationFrame(() => loadCSSAsynchronously());
        });
      }
      
      // Run when idle
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          loadCSSAsynchronously();
        }, { timeout: 500 });
      }
      
      // Final check after short delay
      setTimeout(() => loadCSSAsynchronously(), 10);
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
      // Run CSS optimization immediately - highest priority
      optimizeCriticalRenderingPath();
      
      // Run other optimizations
      optimizeFonts();
      setupProgressiveEnhancement();
      monitorPerformance();
      
      // Delay non-critical optimizations
      setTimeout(() => {
        prefetchCriticalResources();
      }, 1000);
    };

    // Execute optimizations immediately and repeatedly
    optimizeCriticalRenderingPath();
    
    // Also run on micro-task to catch early CSS
    queueMicrotask(() => optimizeCriticalRenderingPath());

    // Run full initialization based on document ready state
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialize);
    } else {
      initialize();
    }
    
    // Additional optimization on load event
    window.addEventListener('load', () => {
      optimizeCriticalRenderingPath();
    }, { once: true })

    // Cleanup function
    return () => {
      // Cleanup observers and event listeners
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default CSSOptimizer;