'use client';

import { useEffect } from 'react';

interface ThirdPartyScriptProxyProps {
  src: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

const SCRIPT_CACHE = new Map<string, Promise<void>>();

export function ThirdPartyScriptProxy({
  src,
  strategy = 'afterInteractive',
  onLoad,
  onError,
}: ThirdPartyScriptProxyProps) {
  useEffect(() => {
    if (strategy === 'beforeInteractive') return;

    const loadScript = async () => {
      // Check if script is already loading or loaded
      if (SCRIPT_CACHE.has(src)) {
        try {
          await SCRIPT_CACHE.get(src);
          onLoad?.();
        } catch (error) {
          onError?.(error as Error);
        }
        return;
      }

      // Create promise for this script
      const scriptPromise = new Promise<void>((resolve, reject) => {
        // Check if script already exists in DOM
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.defer = strategy === 'lazyOnload';
        
        // Add cache headers hints
        script.setAttribute('crossorigin', 'anonymous');
        
        // Add resource hints for better caching
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = new URL(src).origin;
        document.head.appendChild(link);

        script.onload = () => {
          resolve();
          onLoad?.();
        };

        script.onerror = () => {
          const error = new Error(`Failed to load script: ${src}`);
          reject(error);
          onError?.(error);
        };

        if (strategy === 'lazyOnload') {
          // Load on interaction or after idle
          const loadLazy = () => {
            document.body.appendChild(script);
            // Remove listeners after loading
            ['scroll', 'click', 'touchstart'].forEach(event => {
              window.removeEventListener(event, loadLazy);
            });
          };

          // Add interaction listeners
          ['scroll', 'click', 'touchstart'].forEach(event => {
            window.addEventListener(event, loadLazy, { once: true });
          });

          // Use Intersection Observer for viewport-based loading
          if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
              if (entries[0].isIntersecting) {
                loadLazy();
                observer.disconnect();
              }
            });
            
            // Observe the document body
            observer.observe(document.body);
          } else {
            // Fallback to idle callback
            if ('requestIdleCallback' in window) {
              requestIdleCallback(loadLazy, { timeout: 2000 });
            } else {
              setTimeout(loadLazy, 2000);
            }
          }
        } else {
          // Load immediately for afterInteractive
          document.body.appendChild(script);
        }
      });

      SCRIPT_CACHE.set(src, scriptPromise);

      try {
        await scriptPromise;
      } catch (error) {
        // Remove from cache on error to allow retry
        SCRIPT_CACHE.delete(src);
        throw error;
      }
    };

    loadScript();
  }, [src, strategy, onLoad, onError]);

  return null;
}

// Specific proxies for common third-party scripts
export function GoogleAnalyticsProxy({ measurementId }: { measurementId: string }) {
  const gtmUrl = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  
  return (
    <>
      <ThirdPartyScriptProxy
        src={gtmUrl}
        strategy="afterInteractive"
        onLoad={() => {
          // Initialize Google Analytics
          window.dataLayer = window.dataLayer || [];
          function gtag(...args: any[]) {
            window.dataLayer.push(args);
          }
          gtag('js', new Date());
          gtag('config', measurementId, {
            page_path: window.location.pathname,
            cookie_flags: 'SameSite=None;Secure',
            cookie_expires: 28 * 24 * 60 * 60, // 28 days
          });
        }}
      />
    </>
  );
}

export function FacebookPixelProxy({ pixelId }: { pixelId: string }) {
  return (
    <ThirdPartyScriptProxy
      src="https://connect.facebook.net/en_US/fbevents.js"
      strategy="lazyOnload"
      onLoad={() => {
        // Initialize Facebook Pixel with optimized settings
        if (typeof window.fbq === 'function') return;
        
        const n = window.fbq = function(...args: any[]) {
          n.callMethod ? n.callMethod(...args) : n.queue.push(args);
        } as any;
        
        if (!window._fbq) window._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = '2.0';
        n.queue = [];
        
        window.fbq('init', pixelId, {}, {
          agent: 'wildwest-nextjs',
        });
        window.fbq('track', 'PageView');
      }}
    />
  );
}

// Declare global types
declare global {
  interface Window {
    dataLayer: any[];
    fbq: (...args: any[]) => void;
    _fbq: any;
    gtag: (...args: any[]) => void;
  }
}