'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  ttfb: number;
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
  navigationStart: number;
  responseStart: number;
  domContentLoaded: number;
  loadComplete: number;
}

// gtag types are declared globally in types/globals.d.ts

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Wait for page to load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);

  const measurePerformance = () => {
    try {
      // Use Performance Observer for more accurate measurements
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const metrics = calculateMetrics(entry);
            reportMetrics(metrics);
          }
        });
      });

      observer.observe({ entryTypes: ['navigation'] });

      // Fallback for browsers that don't support Performance Observer
      setTimeout(() => {
        const navTiming = performance.getEntriesByType('navigation')[0];
        if (navTiming) {
          const metrics = calculateMetrics(navTiming);
          reportMetrics(metrics);
        }
      }, 0);
    } catch (error) {
      console.error('Performance monitoring error:', error);
    }
  };

  const calculateMetrics = (navTiming: any): PerformanceMetrics => {
    return {
      ttfb: Math.round((navTiming.responseStart || 0) - (navTiming.navigationStart || 0)),
      fcp: 0, // Will be populated by Web Vitals
      lcp: 0, // Will be populated by Web Vitals
      cls: 0, // Will be populated by Web Vitals
      fid: 0, // Will be populated by Web Vitals
      navigationStart: Math.round(navTiming.navigationStart || 0),
      responseStart: Math.round(navTiming.responseStart || 0),
      domContentLoaded: Math.round((navTiming.domContentLoadedEventEnd || 0) - (navTiming.navigationStart || 0)),
      loadComplete: Math.round((navTiming.loadEventEnd || 0) - (navTiming.navigationStart || 0)),
    };
  };

  const reportMetrics = (metrics: PerformanceMetrics) => {
    // Report to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚀 Performance Metrics');
      console.log(`⏱️  TTFB: ${metrics.ttfb}ms`);
      console.log(`🎨 DOM Content Loaded: ${metrics.domContentLoaded}ms`);
      console.log(`✅ Load Complete: ${metrics.loadComplete}ms`);
      console.groupEnd();
    }

    // Report to analytics
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'performance_timing', {
        event_category: 'Performance',
        event_label: 'TTFB',
        value: metrics.ttfb,
      });

      window.gtag('event', 'performance_timing', {
        event_category: 'Performance',
        event_label: 'DOM_Content_Loaded',
        value: metrics.domContentLoaded,
      });

      window.gtag('event', 'performance_timing', {
        event_category: 'Performance',
        event_label: 'Load_Complete',
        value: metrics.loadComplete,
      });
    }

    // Report to Vercel Speed Insights if available
    if (typeof (window as any).webVitals === 'function') {
      (window as any).webVitals({
        name: 'TTFB',
        value: metrics.ttfb,
        id: 'ttfb-' + Math.random().toString(36).substr(2, 9),
      });
    }
  };

  return null; // This component doesn't render anything
}