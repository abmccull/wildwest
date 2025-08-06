"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Log Core Web Vitals to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
    }

    // Send to analytics service in production
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", metric.name, {
        event_category: "Web Vitals",
        event_label: metric.id,
        value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value,
        ),
        non_interaction: true,
        custom_parameters: {
          metric_delta: metric.delta,
          metric_rating: metric.rating,
          metric_entries_length: metric.entries.length,
        },
      });
    }

    // Send to other analytics platforms
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", `WebVital_${metric.name}`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    }
  });

  return null;
}

// Global Window interface extensions are defined in types/global.d.ts
