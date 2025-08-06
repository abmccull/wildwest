// Global type definitions for analytics and external scripts

interface GtagItem {
  item_id: string;
  item_name: string;
  item_category: string;
  quantity: number;
  price: number;
}

interface GtagEventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  currency?: string;
  transaction_id?: string;
  items?: GtagItem[];
  send_to?: string;
  [key: string]: string | number | boolean | undefined | GtagItem[];
}

interface GtagConfigParams {
  page_title?: string;
  page_location?: string;
  content_group1?: string;
  custom_map?: Record<string, string>;
  send_page_view?: boolean;
  [key: string]: string | number | boolean | undefined | Record<string, string>;
}

interface FacebookPixelContent {
  id: string;
  quantity: number;
  item_price: number;
}

interface FacebookPixelParams {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  content_ids?: string[];
  lead_event_source?: string;
  source?: string;
  location?: string;
  contents?: FacebookPixelContent[];
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | string[]
    | FacebookPixelContent[];
}

declare global {
  interface Window {
    gtag: (
      command: "event" | "config" | "js",
      targetId: string | Date,
      params?: GtagEventParams | GtagConfigParams,
    ) => void;
    dataLayer: any[];
    fbq: (
      command: string,
      eventName: string,
      params?: FacebookPixelParams,
    ) => void;
    _fbq?: any;
  }
}

export {};
