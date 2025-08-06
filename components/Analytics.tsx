"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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
export const trackPhoneClick = (source: string = "unknown") => {
  trackEvent("phone_click", {
    event_category: "Contact",
    event_label: "Phone Call",
    phone_number: BUSINESS_PHONE,
    source: source,
  });

  // Facebook Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact", {
      content_name: "Phone Call",
      source: source,
    });
  }
};

// WhatsApp click tracking
export const trackWhatsAppClick = (source: string = "unknown") => {
  trackEvent("whatsapp_click", {
    event_category: "Contact",
    event_label: "WhatsApp",
    source: source,
  });

  // Facebook Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact", {
      content_name: "WhatsApp",
      source: source,
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

// Main Analytics component
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Google Analytics 4
    if (typeof window !== "undefined") {
      // Load Google Analytics script
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script1);

      // Initialize gtag
      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          send_page_view: false, // We'll handle this manually
          custom_map: {
            'custom_parameter_1': 'lead_source',
            'custom_parameter_2': 'service_type',
            'custom_parameter_3': 'location'
          }
        });

        // Enhanced ecommerce and conversion tracking
        gtag('config', '${GA_MEASUREMENT_ID}', {
          custom_map: {
            'custom_parameter_lead_value': 'lead_value',
            'custom_parameter_service': 'service_requested'
          }
        });
      `;
      document.head.appendChild(script2);

      // Load Facebook Pixel
      const fbScript = document.createElement("script");
      fbScript.innerHTML = `
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
      `;
      document.head.appendChild(fbScript);

      // Add noscript fallback for Facebook Pixel
      const noscript = document.createElement("noscript");
      noscript.innerHTML = `
        <img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=${FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1" />
      `;
      document.body.appendChild(noscript);

      // Set up phone number click tracking
      const addPhoneTracking = () => {
        const phoneLinks = document.querySelectorAll('a[href*="tel:"]');
        phoneLinks.forEach((link) => {
          link.addEventListener("click", () => {
            const source = link.getAttribute("data-source") || "website";
            trackPhoneClick(source);
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
            trackWhatsAppClick(source);
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

      // Re-run tracking setup when content changes (for SPA navigation)
      const observer = new MutationObserver(() => {
        addPhoneTracking();
        addWhatsAppTracking();
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

  return null; // This component doesn't render anything visible
}

// TypeScript declarations for global analytics objects
// Type declarations are handled elsewhere
