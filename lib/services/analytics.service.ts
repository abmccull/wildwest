interface GA4Event {
  name: string;
  parameters: Record<string, any>;
}

interface GA4Config {
  measurementId: string;
  apiSecret: string;
  clientId?: string;
  userId?: string;
}

export interface LeadAnalyticsData {
  leadId: number;
  name: string;
  email?: string;
  mobile: string;
  service?: string;
  city?: string;
  source?: string;
  campaign?: string;
  medium?: string;
  value?: number;
}

export interface BookingAnalyticsData {
  bookingId: number;
  leadId?: number;
  date: string;
  time: string;
  status: string;
  value?: number;
}

export interface WhatsAppAnalyticsData {
  page_path?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface SmsAnalyticsData {
  phone_number?: string;
  message_length?: number;
  page_path?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  success?: boolean;
  error_type?: string;
}

class AnalyticsService {
  private measurementId: string;
  private apiSecret: string;
  private baseUrl: string;

  constructor() {
    this.measurementId = process.env.GA4_MEASUREMENT_ID || '';
    this.apiSecret = process.env.GA4_API_SECRET || '';
    this.baseUrl = 'https://www.google-analytics.com/mp/collect';

    if (!this.measurementId || !this.apiSecret) {
      console.warn(
        'GA4_MEASUREMENT_ID or GA4_API_SECRET not configured - Analytics tracking disabled'
      );
    }
  }

  private generateClientId(): string {
    // Generate a random client ID if not provided
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private async sendEvent(event: GA4Event, config: Partial<GA4Config> = {}): Promise<boolean> {
    if (!this.measurementId || !this.apiSecret) {
      console.log('Analytics event skipped - GA4 not configured');
      return false;
    }

    try {
      const clientId = config.clientId || this.generateClientId();

      const payload = {
        client_id: clientId,
        user_id: config.userId,
        events: [
          {
            name: event.name,
            parameters: {
              ...event.parameters,
              // Add timestamp
              timestamp_micros: Date.now() * 1000,
            },
          },
        ],
      };

      const url = `${this.baseUrl}?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`GA4 API error: ${response.status} ${response.statusText}`);
      }

      console.log('GA4 event sent successfully:', event.name);
      return true;
    } catch (error) {
      console.error('Failed to send GA4 event:', error);
      return false;
    }
  }

  async trackLead(data: LeadAnalyticsData, clientId?: string): Promise<boolean> {
    const event: GA4Event = {
      name: 'generate_lead',
      parameters: {
        currency: 'USD',
        value: data.value || 100, // Default lead value
        lead_id: data.leadId.toString(),
        contact_method: 'form',
        service_type: data.service || 'unknown',
        city: data.city || 'unknown',
        // UTM parameters
        source: data.source || 'direct',
        medium: data.medium || 'website',
        campaign: data.campaign || 'organic',
        // Custom parameters
        has_email: !!data.email,
        phone_provided: !!data.mobile,
      },
    };

    return this.sendEvent(event, { clientId });
  }

  async trackBooking(data: BookingAnalyticsData, clientId?: string): Promise<boolean> {
    const event: GA4Event = {
      name: 'book_appointment',
      parameters: {
        currency: 'USD',
        value: data.value || 250, // Default booking value
        booking_id: data.bookingId.toString(),
        lead_id: data.leadId?.toString(),
        appointment_date: data.date,
        appointment_time: data.time,
        booking_status: data.status,
        event_category: 'appointment',
        event_label: `${data.date}_${data.time}`,
      },
    };

    return this.sendEvent(event, { clientId });
  }

  async trackWhatsAppClick(data: WhatsAppAnalyticsData, clientId?: string): Promise<boolean> {
    const event: GA4Event = {
      name: 'contact_whatsapp',
      parameters: {
        contact_method: 'whatsapp',
        page_location: data.page_path || 'unknown',
        // UTM parameters if available
        source: data.utm_source || 'direct',
        medium: data.utm_medium || 'website',
        campaign: data.utm_campaign || 'organic',
        term: data.utm_term,
        content: data.utm_content,
        event_category: 'engagement',
        event_label: 'whatsapp_click',
      },
    };

    return this.sendEvent(event, { clientId });
  }

  async trackSmsClick(data: SmsAnalyticsData, clientId?: string): Promise<boolean> {
    const event: GA4Event = {
      name: 'contact_sms',
      parameters: {
        contact_method: 'sms',
        page_location: data.page_path || 'unknown',
        message_length: data.message_length || 0,
        success: data.success ?? true,
        error_type: data.error_type,
        // UTM parameters if available
        source: data.utm_source || 'direct',
        medium: data.utm_medium || 'website',
        campaign: data.utm_campaign || 'organic',
        term: data.utm_term,
        content: data.utm_content,
        event_category: 'engagement',
        event_label: 'sms_click',
      },
    };

    return this.sendEvent(event, { clientId });
  }

  async trackSmsSent(data: SmsAnalyticsData, clientId?: string): Promise<boolean> {
    const event: GA4Event = {
      name: 'sms_sent',
      parameters: {
        contact_method: 'sms',
        message_length: data.message_length || 0,
        page_location: data.page_path || 'unknown',
        success: data.success ?? true,
        error_type: data.error_type,
        // UTM parameters
        source: data.utm_source || 'direct',
        medium: data.utm_medium || 'website',
        campaign: data.utm_campaign || 'organic',
        term: data.utm_term,
        content: data.utm_content,
        event_category: 'communication',
        event_label: data.success ? 'sms_sent_success' : 'sms_sent_failure',
        value: data.success ? 1 : 0, // Success metric
      },
    };

    return this.sendEvent(event, { clientId });
  }

  async trackFormSubmission(
    formType: string,
    success: boolean,
    formData?: Record<string, any>,
    clientId?: string
  ): Promise<boolean> {
    const event: GA4Event = {
      name: success ? 'form_submit' : 'form_error',
      parameters: {
        form_type: formType,
        form_success: success,
        form_id: formData?.form_id || 'unknown',
        event_category: 'form',
        event_label: `${formType}_${success ? 'success' : 'error'}`,
        ...formData,
      },
    };

    return this.sendEvent(event, { clientId });
  }

  async trackFileUpload(
    fileType: string,
    fileSize: number,
    success: boolean,
    clientId?: string
  ): Promise<boolean> {
    const event: GA4Event = {
      name: success ? 'file_upload' : 'file_upload_error',
      parameters: {
        file_type: fileType,
        file_size: fileSize,
        upload_success: success,
        event_category: 'file',
        event_label: `${fileType}_upload`,
      },
    };

    return this.sendEvent(event, { clientId });
  }

  async trackApiError(
    endpoint: string,
    errorType: string,
    errorMessage: string,
    clientId?: string
  ): Promise<boolean> {
    const event: GA4Event = {
      name: 'api_error',
      parameters: {
        api_endpoint: endpoint,
        error_type: errorType,
        error_message: errorMessage.substring(0, 100), // Limit message length
        event_category: 'api',
        event_label: `${endpoint}_error`,
      },
    };

    return this.sendEvent(event, { clientId });
  }

  async trackPageView(
    pagePath: string,
    pageTitle: string,
    utmParams?: Record<string, string>,
    clientId?: string
  ): Promise<boolean> {
    const event: GA4Event = {
      name: 'page_view',
      parameters: {
        page_location: pagePath,
        page_title: pageTitle,
        // UTM parameters
        source: utmParams?.utm_source || 'direct',
        medium: utmParams?.utm_medium || 'website',
        campaign: utmParams?.utm_campaign || 'organic',
        term: utmParams?.utm_term,
        content: utmParams?.utm_content,
      },
    };

    return this.sendEvent(event, { clientId });
  }

  async trackCustomEvent(
    eventName: string,
    parameters: Record<string, any>,
    clientId?: string
  ): Promise<boolean> {
    const event: GA4Event = {
      name: eventName,
      parameters: {
        ...parameters,
        event_category: parameters.event_category || 'custom',
      },
    };

    return this.sendEvent(event, { clientId });
  }

  // Batch event tracking for better performance
  async trackMultipleEvents(
    events: Array<{ event: GA4Event; config?: Partial<GA4Config> }>
  ): Promise<boolean> {
    if (!this.measurementId || !this.apiSecret) {
      console.log('Batch analytics events skipped - GA4 not configured');
      return false;
    }

    try {
      const clientId = events[0]?.config?.clientId || this.generateClientId();

      const payload = {
        client_id: clientId,
        user_id: events[0]?.config?.userId,
        events: events.map(({ event }) => ({
          name: event.name,
          parameters: {
            ...event.parameters,
            timestamp_micros: Date.now() * 1000,
          },
        })),
      };

      const url = `${this.baseUrl}?measurement_id=${this.measurementId}&api_secret=${this.apiSecret}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`GA4 Batch API error: ${response.status} ${response.statusText}`);
      }

      console.log(`GA4 batch events sent successfully: ${events.length} events`);
      return true;
    } catch (error) {
      console.error('Failed to send GA4 batch events:', error);
      return false;
    }
  }

  // Helper method to extract UTM parameters from URL or object
  extractUtmParams(params: Record<string, any>): Record<string, string> {
    const utmParams: Record<string, string> = {};

    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

    utmKeys.forEach((key) => {
      if (params[key]) {
        utmParams[key] = params[key].toString();
      }
    });

    return utmParams;
  }

  // Test analytics configuration
  async testAnalytics(clientId?: string): Promise<boolean> {
    return this.trackCustomEvent(
      'test_event',
      {
        test_parameter: 'analytics_test',
        timestamp: new Date().toISOString(),
      },
      clientId
    );
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();
export default analyticsService;
