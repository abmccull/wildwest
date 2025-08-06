"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { getCurrentPageData } from "@/lib/analytics";

// Google Analytics 4 Configuration
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";
const FACEBOOK_PIXEL_ID =
  process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "XXXXXXXXX";

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

// Main Analytics component
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Google Analytics 4 with manual configuration
    if (typeof window !== "undefined") {
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

      // Set up phone number click tracking
      const addPhoneTracking = () => {
        const phoneLinks = document.querySelectorAll('a[href*="tel:"]');
        phoneLinks.forEach((link) => {
          link.addEventListener("click", () => {
            const source = link.getAttribute("data-source") || "website";
            const serviceType = link.getAttribute("data-service-type") || "general";
            trackPhoneClick(source, serviceType);
          });
        });
      };

      // Set up WhatsApp click tracking
      const addWhatsAppTracking = () => {
        const whatsappLinks = document.querySelectorAll(
          `a[href*="wa.me"], a[href*="whatsapp"]`,
        );
        whatsappLinks.forEach((link) => {
          link.addEventListener("click", () => {
            const source = link.getAttribute("data-source") || "website";
            const serviceType = link.getAttribute("data-service-type") || "general";
            trackWhatsAppClick(source, serviceType);
          });
        });
      };

      // Initialize tracking after DOM is loaded
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => {
          addPhoneTracking();
          addWhatsAppTracking();
        });
      } else {
        addPhoneTracking();
        addWhatsAppTracking();
      }

      // Re-run tracking setup when content changes (for SPA navigation) with debouncing
      const debouncedTrackingUpdate = debounce(() => {
        addPhoneTracking();
        addWhatsAppTracking();
      }, 100); // 100ms debounce

      const observer = new MutationObserver(() => {
        debouncedTrackingUpdate();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (pathname) {
      const url = window.location.href;
      const title = document.title;
      trackPageView(url, title);
    }
  }, [pathname]);

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      
      {/* Facebook Pixel Script */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FACEBOOK_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      
      {/* Facebook Pixel noscript fallback */}
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
