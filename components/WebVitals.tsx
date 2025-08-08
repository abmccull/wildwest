"use client";

import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  useEffect(() => {
    const register = () => {
      useReportWebVitals((metric) => {
        if (process.env.NODE_ENV === "development") {
          console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
        }
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
        if (typeof window !== "undefined" && window.fbq) {
          window.fbq("trackCustom", `WebVital_${metric.name}`, {
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
          });
        }
      });
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(register, { timeout: 2000 });
    } else {
      setTimeout(register, 2000);
    }
  }, []);

  return null;
}

// Global Window interface extensions are defined in types/global.d.ts
