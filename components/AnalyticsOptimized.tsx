"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { getCurrentPageData } from "@/lib/analytics";
import { getCacheMonitor } from "@/lib/cache-monitor";

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";
const FACEBOOK_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "XXXXXXXXX";

// Performance optimization: Only load scripts when needed
const IDLE_TIMEOUT = 5000; // Desktop fallback - increased for better FID
const INTERACTION_EVENTS = ['mousedown', 'keydown', 'touchstart', 'click']; // Removed passive events that can hurt FID

// Business contact information
const BUSINESS_PHONE = "(801) 691-4065";

// Type definition for event parameters
type EventParameters = Record<string, string | number | boolean | undefined>;

// Analytics events
export const trackEvent = (
  eventName: string,
  parameters: EventParameters = {},
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      ...parameters,
      timestamp: new Date().toISOString(),
    });
  }
};

// Lead tracking
export const trackLead = (leadData: {
  name: string;
  email?: string;
  phone?: string;
  service: string;
  location: string;
  source: string;
}) => {
  // Google Analytics 4 conversion tracking
  trackEvent("generate_lead", {
    event_category: "Lead Generation",
    event_label: leadData.service,
    value: 1,
    currency: "USD",
    lead_source: leadData.source,
    service_type: leadData.service,
    location: leadData.location,
    has_email: !!leadData.email,
    has_phone: !!leadData.phone,
  });

  // Facebook Pixel conversion tracking
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", {
      content_name: leadData.service,
      content_category: "Construction Services",
      value: 100, // Estimated lead value
      currency: "USD",
      source: leadData.source,
      location: leadData.location,
    });
  }
};

// Phone click tracking
export const trackPhoneClick = (source: string = "unknown", serviceType: string = "general") => {
  const pageData = getCurrentPageData();
  
  trackEvent("click_to_call", {
    event_category: "Contact",
    event_label: "Phone Call",
    phone_number: BUSINESS_PHONE,
    source: source,
    service_type: serviceType,
    page_location: pageData?.url || window.location.href,
    page_title: pageData?.title || document.title,
  });

  // Facebook Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact", {
      content_name: "Phone Call",
      source: source,
      service_type: serviceType,
    });
  }
};

// WhatsApp click tracking
export const trackWhatsAppClick = (source: string = "unknown", serviceType: string = "general") => {
  const pageData = getCurrentPageData();
  
  trackEvent("whatsapp_click", {
    event_category: "Contact",
    event_label: "WhatsApp",
    source: source,
    service_type: serviceType,
    page_location: pageData?.url || window.location.href,
    page_title: pageData?.title || document.title,
  });

  // Facebook Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact", {
      content_name: "WhatsApp",
      source: source,
      service_type: serviceType,
    });
  }
};

// Form submission tracking
export const trackFormSubmission = (formType: string, location: string) => {
  trackEvent("form_submit", {
    event_category: "Engagement",
    event_label: formType,
    form_type: formType,
    location: location,
  });
};

// Page view tracking
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_title: title,
      page_location: url,
    });
  }

  // Facebook Pixel page view
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

// Service quote request tracking
export const trackQuoteRequest = (
  service: string,
  location: string,
  estimatedValue: number = 500,
) => {
  trackEvent("request_quote", {
    event_category: "Conversion",
    event_label: service,
    value: estimatedValue,
    currency: "USD",
    service_type: service,
    location: location,
  });

  // Facebook Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "AddToCart", {
      content_name: service,
      content_category: "Construction Services",
      value: estimatedValue,
      currency: "USD",
    });
  }
};

// Debounce utility function
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Main Analytics component with lazy loading optimization
export default function Analytics() {
  const pathname = usePathname();
  const [shouldLoadGtag, setShouldLoadGtag] = useState(false);
  const [shouldLoadFb, setShouldLoadFb] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState({ gtag: false, fbq: false });

  // Lazy loading logic - load scripts on user interaction; desktop has small timeout fallback, mobile has none
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const isMobile = typeof window !== 'undefined' && (window.matchMedia?.('(pointer: coarse)').matches || window.innerWidth < 768);
    
    const handleUserInteraction = () => {
      setShouldLoadGtag(true);
      setShouldLoadFb(true);
      // Remove event listeners once triggered
      INTERACTION_EVENTS.forEach(event => {
        window.removeEventListener(event, handleUserInteraction, { passive: true } as any);
      });
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    // Load on user interaction
    INTERACTION_EVENTS.forEach(event => {
      window.addEventListener(event, handleUserInteraction, { passive: true } as any);
    });

    // Desktop-only fallback: load after longer timeout to improve FID; mobile has no fallback for best CWV
    if (!isMobile) {
      timeoutId = setTimeout(() => {
        // Use requestIdleCallback to defer analytics loading until browser is idle
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            setShouldLoadGtag(true);
            setShouldLoadFb(true);
          }, { timeout: IDLE_TIMEOUT });
        } else {
          setShouldLoadGtag(true);
          setShouldLoadFb(true);
        }
        INTERACTION_EVENTS.forEach(event => {
          window.removeEventListener(event, handleUserInteraction, { passive: true } as any);
        });
      }, IDLE_TIMEOUT);
    }

    return () => {
      INTERACTION_EVENTS.forEach(event => {
        window.removeEventListener(event, handleUserInteraction, { passive: true } as any);
      });
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Initialize Google Analytics 4 when script loads
  useEffect(() => {
    if (typeof window !== "undefined" && shouldLoadGtag && scriptsLoaded.gtag) {
      // Initialize gtag manually (script is loaded via Script components)
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false, // We'll handle this manually
        custom_map: {
          'custom_parameter_1': 'lead_source',
          'custom_parameter_2': 'service_type',
          'custom_parameter_3': 'location'
        }
      });

      // Enhanced ecommerce and conversion tracking
      gtag('config', GA_MEASUREMENT_ID, {
        custom_map: {
          'custom_parameter_lead_value': 'lead_value',
          'custom_parameter_service': 'service_requested'
        }
      });
      
      // Initialize cache monitoring for analytics
      const cacheMonitor = getCacheMonitor();
      if (cacheMonitor && process.env.NODE_ENV === 'production') {
        // Report cache performance metrics periodically
        setInterval(() => {
          cacheMonitor.reportToAnalytics();
        }, 300000); // Every 5 minutes
      }
    }
  }, [shouldLoadGtag, scriptsLoaded.gtag]);

  // Initialize tracking after both scripts are loaded
  useEffect(() => {
    if (scriptsLoaded.gtag && scriptsLoaded.fbq) {
      // Initialize phone and WhatsApp tracking with debouncing
      const initializeTracking = () => {
        const addPhoneTracking = () => {
          const phoneLinks = document.querySelectorAll('a[href*="tel:"]');
          phoneLinks.forEach((link) => {
            const el = link as HTMLElement;
            if ((el as any).dataset.tracked === '1') return;
            (el as any).dataset.tracked = '1';
            el.addEventListener("click", () => {
              const source = el.getAttribute("data-source") || "website";
              const serviceType = el.getAttribute("data-service-type") || "general";
              trackPhoneClick(source, serviceType);
            }, { passive: true });
          });
        };

        const addWhatsAppTracking = () => {
          const whatsappLinks = document.querySelectorAll(`a[href*="wa.me"], a[href*="whatsapp"]`);
          whatsappLinks.forEach((link) => {
            const el = link as HTMLElement;
            if ((el as any).dataset.tracked === '1') return;
            (el as any).dataset.tracked = '1';
            el.addEventListener("click", () => {
              const source = el.getAttribute("data-source") || "website";
              const serviceType = el.getAttribute("data-service-type") || "general";
              trackWhatsAppClick(source, serviceType);
            }, { passive: true });
          });
        };

        addPhoneTracking();
        addWhatsAppTracking();
      };

      // Initialize immediately if DOM is ready
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeTracking);
      } else {
        initializeTracking();
      }

      // Re-run setup on route changes only, to avoid MutationObserver-induced reflows
      // Re-declare helpers in this scope to satisfy TS and avoid hoisting issues
      const setupPhone = () => {
        const phoneLinks = document.querySelectorAll('a[href*="tel:"]');
        phoneLinks.forEach((link) => {
          const el = link as HTMLElement;
          if ((el as any).dataset.tracked === '1') return;
          (el as any).dataset.tracked = '1';
          el.addEventListener("click", () => {
            const source = el.getAttribute("data-source") || "website";
            const serviceType = el.getAttribute("data-service-type") || "general";
            trackPhoneClick(source, serviceType);
          }, { passive: true });
        });
      };
      const setupWhatsApp = () => {
        const whatsappLinks = document.querySelectorAll(`a[href*="wa.me"], a[href*="whatsapp"]`);
        whatsappLinks.forEach((link) => {
          const el = link as HTMLElement;
          if ((el as any).dataset.tracked === '1') return;
          (el as any).dataset.tracked = '1';
          el.addEventListener("click", () => {
            const source = el.getAttribute("data-source") || "website";
            const serviceType = el.getAttribute("data-service-type") || "general";
            trackWhatsAppClick(source, serviceType);
          }, { passive: true });
        });
      };
      const runSetup = debounce(() => {
        setupPhone();
        setupWhatsApp();
      }, 100);
      runSetup();
      return () => { /* no-op */ };
    }
  }, [scriptsLoaded]);

  // Track page views on route changes - only if scripts are loaded
  useEffect(() => {
    if (pathname && scriptsLoaded.gtag && scriptsLoaded.fbq) {
      // Small delay to ensure scripts are fully initialized
      setTimeout(() => {
        const url = window.location.href;
        const title = document.title;
        trackPageView(url, title);
      }, 150);
    }
  }, [pathname, scriptsLoaded]);

  return (
    <>
      {/* Only load scripts when user interaction is detected or after timeout */}
      {(shouldLoadGtag || shouldLoadFb) && (
        <>
          {/* Google Analytics Script with optimized loading */}
          {shouldLoadGtag && (
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="lazyOnload"
              onLoad={() => setScriptsLoaded(prev => ({ ...prev, gtag: true }))}
            />
          )}
          
          {/* Facebook Pixel Script with optimized lazy loading */}
          {shouldLoadFb && (
            <Script 
              id="facebook-pixel" 
              strategy="lazyOnload"
              onLoad={() => setScriptsLoaded(prev => ({ ...prev, fbq: true }))}
            >
              {`
              (function(f,b,e,v,n,t,s){
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.defer=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              })(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              
              // Initialize with minimal code
              window.fbq = window.fbq || function(){
                (window.fbq.q = window.fbq.q || []).push(arguments)
              };
              
              // Defer initialization to prevent blocking - use requestIdleCallback for better FID
              if ('requestIdleCallback' in window) {
                requestIdleCallback(function(){
                  if(window.fbq && typeof window.fbq === 'function'){
                    window.fbq('init', '${FACEBOOK_PIXEL_ID}');
                    window.fbq('track', 'PageView');
                  }
                }, { timeout: 200 });
              } else {
                setTimeout(function(){
                  if(window.fbq && typeof window.fbq === 'function'){
                    window.fbq('init', '${FACEBOOK_PIXEL_ID}');
                    window.fbq('track', 'PageView');
                  }
                }, 200);
              }
            `}
            </Script>
          )}
        </>
      )}
      
      {/* Facebook Pixel noscript fallback - always present for crawlers */}
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// TypeScript declarations for global analytics objects
// Type declarations are handled elsewhere