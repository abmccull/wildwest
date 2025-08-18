'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface AnalyticsProps {
  gtmId?: string;
  gaId?: string;
  enableWebVitals?: boolean;
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const Analytics: React.FC<AnalyticsProps> = ({ gtmId, gaId, enableWebVitals = true }) => {
  useEffect(() => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];

    if (enableWebVitals && 'PerformanceObserver' in window) {
      // Web Vitals tracking
      const trackWebVital = (name: string, value: number, id?: string) => {
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'performance',
            event_label: name,
            value: Math.round(value),
            custom_parameter_id: id,
          });
        }
      };

      // LCP - Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        trackWebVital('LCP', lastEntry.startTime, lastEntry.id);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // INP - Interaction to Next Paint (replaces FID)
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const e = entry as any;
          if (e.interactionId) {
            const inp = e.processingStart - e.startTime;
            trackWebVital('INP', inp, e.interactionId.toString());
          }
        }
      });
      inpObserver.observe({ type: 'event', buffered: true });

      // CLS - Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        trackWebVital('CLS', clsValue);
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // FCP - First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstEntry = entries[0];
        trackWebVital('FCP', firstEntry.startTime);
      });
      fcpObserver.observe({ type: 'paint', buffered: true });

      // TTFB - Time to First Byte
      const ttfbObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          if (entry.name === window.location.href) {
            trackWebVital('TTFB', (entry as any).responseStart);
          }
        }
      });
      ttfbObserver.observe({ type: 'navigation', buffered: true });
    }
  }, [enableWebVitals]);

  return (
    <>
      {/* Google Tag Manager */}
      {gtmId && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmId}');
              `,
            }}
          />

          {/* GTM noscript fallback */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Google Analytics 4 */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_title: document.title,
                  page_location: window.location.href,
                  custom_map: {
                    'custom_parameter_id': 'metric_id'
                  }
                });
              `,
            }}
          />
        </>
      )}

      {/* Performance monitoring script */}
      <Script
        id="performance-monitor"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Resource timing monitoring
            window.addEventListener('load', function() {
              setTimeout(function() {
                const navigation = performance.getEntriesByType('navigation')[0];
                const resources = performance.getEntriesByType('resource');
                
                // Track page load metrics
                if (window.gtag && navigation) {
                  window.gtag('event', 'page_load_metrics', {
                    event_category: 'performance',
                    dom_content_loaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
                    load_complete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
                    total_page_size: resources.reduce((total, resource) => total + (resource.transferSize || 0), 0)
                  });
                }
                
                // Track slow resources
                resources.forEach(resource => {
                  if (resource.duration > 1000) { // Resources taking more than 1 second
                    if (window.gtag) {
                      window.gtag('event', 'slow_resource', {
                        event_category: 'performance',
                        resource_name: resource.name,
                        duration: Math.round(resource.duration)
                      });
                    }
                  }
                });
              }, 1000);
            });
          `,
        }}
      />
    </>
  );
};

export default Analytics;
