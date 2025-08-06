// Global type declarations for analytics

interface Window {
  gtag: (...args: any[]) => void;
  dataLayer: any[];
  fbq: (...args: any[]) => void;
  _fbq: any;
}

// Global gtag function
declare function gtag(...args: any[]): void;