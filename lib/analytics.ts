/**
 * Analytics Helper Library for Wild West Construction
 *
 * This library provides utility functions for tracking user interactions,
 * lead generation, and conversions across the website.
 */

// Analytics configuration
export const ANALYTICS_CONFIG = {
  GA_MEASUREMENT_ID:
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX",
  FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || "XXXXXXXXX",
  BUSINESS_PHONE: "(801) 691-4065",
  WHATSAPP_URL: "https://wa.me/18016914065",
  COMPANY_NAME: "Wild West Construction",
};

// Lead value estimation based on service type
export const SERVICE_VALUES = {
  flooring: 2500,
  demolition: 1800,
  "junk-removal": 400,
  "general-construction": 3500,
  renovation: 5000,
  default: 1000,
} as const;

export type ServiceType = keyof typeof SERVICE_VALUES | "default";

// Lead source tracking
export type LeadSource =
  | "organic-search"
  | "google-ads"
  | "facebook-ads"
  | "direct"
  | "referral"
  | "social-media"
  | "phone-call"
  | "whatsapp"
  | "contact-form"
  | "quote-form"
  | "unknown";

// Utility function to get current page data
export const getCurrentPageData = () => {
  if (typeof window === "undefined") return null;

  return {
    url: window.location.href,
    pathname: window.location.pathname,
    title: document.title,
    referrer: document.referrer,
    timestamp: new Date().toISOString(),
  };
};

// Utility function to detect lead source
export const detectLeadSource = (): LeadSource => {
  if (typeof window === "undefined") return "unknown";

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source");
  const utmMedium = urlParams.get("utm_medium");
  const referrer = document.referrer;

  // Check UTM parameters first
  if (utmSource) {
    if (utmSource.includes("google")) return "google-ads";
    if (utmSource.includes("facebook")) return "facebook-ads";
    if (utmMedium === "social") return "social-media";
  }

  // Check referrer
  if (referrer) {
    if (referrer.includes("google.com")) return "organic-search";
    if (referrer.includes("facebook.com")) return "social-media";
    if (referrer.includes("instagram.com")) return "social-media";
    return "referral";
  }

  return "direct";
};

// Enhanced lead submission tracking
export const trackLeadSubmission = async (leadData: {
  name: string;
  email?: string;
  phone?: string;
  service: ServiceType;
  location: string;
  message?: string;
  source?: LeadSource;
}) => {
  const pageData = getCurrentPageData();
  const detectedSource = leadData.source || detectLeadSource();
  const estimatedValue =
    SERVICE_VALUES[leadData.service] || SERVICE_VALUES.default;

  const trackingData = {
    ...leadData,
    source: detectedSource,
    value: estimatedValue,
    page_url: pageData?.url,
    page_title: pageData?.title,
    timestamp: pageData?.timestamp,
  };

  // Google Analytics 4 Enhanced Conversion Tracking
  if (typeof window !== "undefined" && window.gtag) {
    // Standard lead event
    window.gtag("event", "generate_lead", {
      event_category: "Lead Generation",
      event_label: leadData.service,
      value: estimatedValue,
      currency: "USD",
      transaction_id: `lead_${Date.now()}`,
      items: [
        {
          item_id: leadData.service,
          item_name: `${leadData.service} service`,
          item_category: "Construction Services",
          quantity: 1,
          price: estimatedValue,
        },
      ],
    });

    // Enhanced conversion data
    window.gtag("event", "conversion", {
      send_to: `${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}/lead_generation`,
      value: estimatedValue,
      currency: "USD",
      transaction_id: `conv_${Date.now()}`,
    });

    // Custom event with detailed data
    window.gtag("event", "lead_detailed", {
      event_category: "Lead Generation",
      lead_source: detectedSource,
      service_type: leadData.service,
      location: leadData.location,
      has_email: !!leadData.email,
      has_phone: !!leadData.phone,
      estimated_value: estimatedValue,
    });
  }

  // Facebook Pixel Conversion Tracking
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", {
      content_name: leadData.service,
      content_category: "Construction Services",
      value: estimatedValue,
      currency: "USD",
      content_ids: [leadData.service],
      lead_event_source: detectedSource,
    });

    // Additional Facebook events
    window.fbq("track", "CompleteRegistration", {
      content_name: `${leadData.service} inquiry`,
      value: estimatedValue,
      currency: "USD",
    });
  }

  return trackingData;
};

// Type definitions for tracking data
export interface TrackingData {
  [key: string]: string | number | boolean | undefined;
}

// Page view tracking with enhanced data
export const trackPageView = (additionalData?: TrackingData) => {
  const pageData = getCurrentPageData();
  if (!pageData) return;

  // Google Analytics 4 page view
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
      page_title: pageData.title,
      page_location: pageData.url,
      content_group1: determineContentGroup(pageData.pathname),
      custom_map: {
        custom_parameter_1: "page_section",
        custom_parameter_2: "service_category",
      },
      ...additionalData,
    });

    // Track page engagement
    window.gtag("event", "page_view_enhanced", {
      event_category: "Engagement",
      page_section: determineContentGroup(pageData.pathname),
      ...additionalData,
    });
  }

  // Facebook Pixel page view
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView", {
      content_name: pageData.title,
      content_category: determineContentGroup(pageData.pathname),
    });
  }
};

// Determine content group based on pathname
export const determineContentGroup = (pathname: string): string => {
  if (pathname === "/") return "Homepage";
  if (pathname.startsWith("/locations/")) {
    if (pathname.includes("/flooring")) return "Flooring Services";
    if (pathname.includes("/demolition")) return "Demolition Services";
    if (pathname.includes("/junk-removal")) return "Junk Removal Services";
    return "Location Pages";
  }
  if (pathname.startsWith("/services/")) return "Service Pages";
  if (pathname.includes("contact")) return "Contact";
  if (pathname.includes("about")) return "About";
  return "Other";
};

// Contact method tracking
export const trackContactMethod = (
  method: "phone" | "whatsapp" | "email" | "form",
  source: string = "website",
) => {
  const pageData = getCurrentPageData();

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", `contact_${method}`, {
      event_category: "Contact",
      event_label: method.charAt(0).toUpperCase() + method.slice(1),
      source: source,
      page_url: pageData?.url,
    });
  }

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact", {
      content_name: method,
      source: source,
    });
  }
};

// Quote request tracking
export const trackQuoteRequest = (quoteData: {
  service: ServiceType;
  location: string;
  urgency?: "immediate" | "within_week" | "within_month" | "planning_ahead";
  budget_range?: string;
  source?: LeadSource;
}) => {
  const detectedSource = quoteData.source || detectLeadSource();
  const estimatedValue =
    SERVICE_VALUES[quoteData.service] || SERVICE_VALUES.default;

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "request_quote", {
      event_category: "Conversion",
      event_label: quoteData.service,
      value: estimatedValue,
      currency: "USD",
      service_type: quoteData.service,
      location: quoteData.location,
      urgency: quoteData.urgency,
      budget_range: quoteData.budget_range,
      lead_source: detectedSource,
    });

    // E-commerce tracking for quote requests
    window.gtag("event", "add_to_cart", {
      currency: "USD",
      value: estimatedValue,
      items: [
        {
          item_id: quoteData.service,
          item_name: `${quoteData.service} quote`,
          item_category: "Construction Services",
          quantity: 1,
          price: estimatedValue,
        },
      ],
    });
  }

  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "AddToCart", {
      content_name: quoteData.service,
      content_category: "Construction Services",
      value: estimatedValue,
      currency: "USD",
      contents: [
        {
          id: quoteData.service,
          quantity: 1,
          item_price: estimatedValue,
        },
      ],
    });
  }
};

// Conversion funnel tracking
export const trackFunnelStep = (
  step:
    | "awareness"
    | "interest"
    | "consideration"
    | "intent"
    | "evaluation"
    | "purchase",
  data?: TrackingData,
) => {
  const pageData = getCurrentPageData();

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", `funnel_${step}`, {
      event_category: "Conversion Funnel",
      event_label: step,
      funnel_step: step,
      page_url: pageData?.url,
      ...data,
    });
  }
};

// User engagement tracking
export const trackEngagement = (action: string, details?: TrackingData) => {
  const pageData = getCurrentPageData();

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "engagement", {
      event_category: "User Engagement",
      event_label: action,
      action_type: action,
      page_url: pageData?.url,
      ...details,
    });
  }
};

// Scroll depth tracking
export const initScrollTracking = () => {
  if (typeof window === "undefined") return;

  const scrollThresholds = [25, 50, 75, 90];
  const triggeredThresholds = new Set();

  const trackScrollDepth = () => {
    const scrollPercentage = Math.round(
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
        100,
    );

    scrollThresholds.forEach((threshold) => {
      if (
        scrollPercentage >= threshold &&
        !triggeredThresholds.has(threshold)
      ) {
        triggeredThresholds.add(threshold);

        if (window.gtag) {
          window.gtag("event", "scroll_depth", {
            event_category: "Engagement",
            event_label: `${threshold}%`,
            scroll_percentage: threshold,
            page_url: window.location.href,
          });
        }
      }
    });
  };

  // Throttle scroll events
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        trackScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => window.removeEventListener("scroll", handleScroll);
};

// Form interaction tracking
export const trackFormInteraction = (
  formName: string,
  interaction:
    | "start"
    | "field_focus"
    | "validation_error"
    | "submit_attempt"
    | "submit_success",
  field?: string,
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", `form_${interaction}`, {
      event_category: "Form Interaction",
      event_label: formName,
      form_name: formName,
      field_name: field,
    });
  }
};

// Session tracking utilities
export const getSessionData = () => {
  if (typeof window === "undefined") return null;

  return {
    session_id:
      sessionStorage.getItem("analytics_session_id") || generateSessionId(),
    landing_page:
      sessionStorage.getItem("landing_page") || window.location.href,
    traffic_source: detectLeadSource(),
    session_start:
      sessionStorage.getItem("session_start") || new Date().toISOString(),
  };
};

const generateSessionId = () => {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem("analytics_session_id", sessionId);
  sessionStorage.setItem("session_start", new Date().toISOString());
  sessionStorage.setItem("landing_page", window.location.href);
  return sessionId;
};

// Initialize analytics utilities
export const initAnalytics = () => {
  if (typeof window === "undefined") return;

  // Initialize session tracking
  getSessionData();

  // Initialize scroll tracking
  const cleanup = initScrollTracking();

  // Track initial page load
  trackPageView();

  return cleanup;
};
