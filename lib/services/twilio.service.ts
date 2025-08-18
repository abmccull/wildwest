import Twilio from 'twilio';
import { supabase } from '@/lib/supabase';
import { SmsInteractionInsert, SmsInteractionUpdate } from '@/supabase/types/database.types';

export interface SendSmsOptions {
  phoneNumber: string;
  message: string;
  leadId?: number;
  utmParams?: Record<string, any>;
  pagePath?: string;
  consentGiven?: boolean;
}

export interface SmsResponse {
  success: boolean;
  messageId?: string;
  twilioSid?: string;
  error?: string;
  interactionId?: number;
}

export interface SmsDeliveryStatus {
  id: number;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  errorMessage?: string;
  updatedAt: string;
}

class TwilioService {
  private client: Twilio.Twilio | null = null;
  private accountSid: string;
  private authToken: string;
  private fromNumber: string;

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID || '';
    this.authToken = process.env.TWILIO_AUTH_TOKEN || '';
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER || '';

    if (!this.accountSid || !this.authToken || !this.fromNumber) {
      console.warn('Twilio credentials not fully configured - SMS functionality will be disabled');
    } else {
      try {
        this.client = Twilio(this.accountSid, this.authToken);
      } catch (error) {
        console.error('Failed to initialize Twilio client:', error);
      }
    }
  }

  private isConfigured(): boolean {
    return !!(this.client && this.accountSid && this.authToken && this.fromNumber);
  }

  private formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Add country code if not present (assuming US numbers)
    if (cleaned.length === 10) {
      return `+1${cleaned}`;
    } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+${cleaned}`;
    } else if (cleaned.startsWith('+')) {
      return phoneNumber; // Already formatted
    } else {
      return `+${cleaned}`; // Assume international format
    }
  }

  private async createSmsInteraction(data: SmsInteractionInsert): Promise<number | null> {
    try {
      const { data: interaction, error } = await supabase
        .from('sms_interactions')
        .insert(data)
        .select('id')
        .single();

      if (error) {
        console.error('Failed to create SMS interaction:', error);
        return null;
      }

      return interaction.id;
    } catch (error) {
      console.error('Error creating SMS interaction:', error);
      return null;
    }
  }

  private async updateSmsInteraction(id: number, updates: SmsInteractionUpdate): Promise<boolean> {
    try {
      const { error } = await supabase.from('sms_interactions').update(updates).eq('id', id);

      if (error) {
        console.error('Failed to update SMS interaction:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error updating SMS interaction:', error);
      return false;
    }
  }

  async sendSms(options: SendSmsOptions): Promise<SmsResponse> {
    const { phoneNumber, message, leadId, utmParams = {}, pagePath, consentGiven = true } = options;

    // Validate input
    if (!phoneNumber || !message) {
      return {
        success: false,
        error: 'Phone number and message are required',
      };
    }

    if (!consentGiven) {
      return {
        success: false,
        error: 'SMS consent is required',
      };
    }

    // Check if Twilio is configured
    if (!this.isConfigured()) {
      return {
        success: false,
        error: 'SMS service is not configured',
      };
    }

    const formattedPhone = this.formatPhoneNumber(phoneNumber);

    // Create SMS interaction record first
    const interactionData: SmsInteractionInsert = {
      lead_id: leadId || null,
      phone_number: formattedPhone,
      message_text: message,
      message_type: 'outbound',
      status: 'pending',
      utm_params: Object.keys(utmParams).length > 0 ? utmParams : null,
      page_path: pagePath || null,
      consent_given: consentGiven,
    };

    const interactionId = await this.createSmsInteraction(interactionData);

    try {
      if (!this.client) {
        throw new Error('Twilio client not initialized');
      }

      // Send SMS via Twilio
      const twilioMessage = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: formattedPhone,
        // Optional: Add status callback URL for delivery tracking
        // statusCallback: `${process.env.NEXT_PUBLIC_BASE_URL}/api/sms/webhook`,
      });

      // Update interaction with success
      if (interactionId) {
        await this.updateSmsInteraction(interactionId, {
          twilio_sid: twilioMessage.sid,
          status: 'sent',
        });
      }

      return {
        success: true,
        messageId: twilioMessage.sid,
        twilioSid: twilioMessage.sid,
        interactionId: interactionId || undefined,
      };
    } catch (error: any) {
      console.error('Failed to send SMS:', error);

      // Update interaction with error
      if (interactionId) {
        await this.updateSmsInteraction(interactionId, {
          status: 'failed',
          error_message: error.message || 'Unknown error occurred',
        });
      }

      return {
        success: false,
        error: error.message || 'Failed to send SMS',
        interactionId: interactionId || undefined,
      };
    }
  }

  async getMessageStatus(twilioSid: string): Promise<SmsDeliveryStatus | null> {
    if (!this.isConfigured() || !twilioSid) {
      return null;
    }

    try {
      if (!this.client) {
        throw new Error('Twilio client not initialized');
      }

      const message = await this.client.messages(twilioSid).fetch();

      // Map Twilio statuses to our internal statuses
      let status: 'pending' | 'sent' | 'delivered' | 'failed';
      switch (message.status) {
        case 'accepted':
        case 'queued':
        case 'sending':
          status = 'pending';
          break;
        case 'sent':
          status = 'sent';
          break;
        case 'delivered':
          status = 'delivered';
          break;
        case 'failed':
        case 'undelivered':
          status = 'failed';
          break;
        default:
          status = 'pending';
      }

      // Update our database record
      const { data: interaction } = await supabase
        .from('sms_interactions')
        .select('id')
        .eq('twilio_sid', twilioSid)
        .single();

      if (interaction) {
        await this.updateSmsInteraction(interaction.id, {
          status,
          error_message: message.errorMessage || null,
        });

        return {
          id: interaction.id,
          status,
          errorMessage: message.errorMessage || undefined,
          updatedAt: new Date().toISOString(),
        };
      }

      return null;
    } catch (error: any) {
      console.error('Failed to get message status:', error);
      return null;
    }
  }

  async getSmsInteractionsByLead(leadId: number): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('sms_interactions')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to get SMS interactions:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting SMS interactions:', error);
      return [];
    }
  }

  async getSmsInteractionsByPhone(phoneNumber: string): Promise<any[]> {
    try {
      const formattedPhone = this.formatPhoneNumber(phoneNumber);

      const { data, error } = await supabase
        .from('sms_interactions')
        .select('*')
        .eq('phone_number', formattedPhone)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to get SMS interactions:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error getting SMS interactions:', error);
      return [];
    }
  }

  // Get SMS analytics data
  async getSmsAnalytics(startDate?: string, endDate?: string): Promise<any> {
    try {
      let query = supabase
        .from('sms_interactions')
        .select('status, message_type, cost_cents, created_at, utm_params');

      if (startDate) {
        query = query.gte('created_at', startDate);
      }

      if (endDate) {
        query = query.lte('created_at', endDate);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Failed to get SMS analytics:', error);
        return null;
      }

      // Process analytics data
      const analytics = {
        totalMessages: data.length,
        sentMessages: data.filter((msg) => msg.status === 'sent').length,
        deliveredMessages: data.filter((msg) => msg.status === 'delivered').length,
        failedMessages: data.filter((msg) => msg.status === 'failed').length,
        totalCost: data.reduce((sum, msg) => sum + (msg.cost_cents || 0), 0),
        bySource: {},
      };

      // Group by UTM source
      data.forEach((msg) => {
        const source = msg.utm_params?.utm_source || 'direct';
        if (!(analytics.bySource as any)[source]) {
          (analytics.bySource as any)[source] = 0;
        }
        (analytics.bySource as any)[source]++;
      });

      return analytics;
    } catch (error) {
      console.error('Error getting SMS analytics:', error);
      return null;
    }
  }

  // Test SMS configuration
  async testSms(testPhoneNumber?: string): Promise<SmsResponse> {
    const phoneNumber = testPhoneNumber || process.env.TWILIO_TEST_PHONE_NUMBER;

    if (!phoneNumber) {
      return {
        success: false,
        error: 'Test phone number not provided',
      };
    }

    return this.sendSms({
      phoneNumber,
      message: 'Test message from Wild West Construction SMS service. This is a test.',
      consentGiven: true,
      utmParams: { utm_source: 'test', utm_medium: 'api', utm_campaign: 'sms_test' },
      pagePath: '/test',
    });
  }

  // Helper method to generate common SMS templates
  generateMessageTemplate(
    type: 'quote_request' | 'booking_confirmation' | 'reminder',
    data: any = {}
  ): string {
    const templates = {
      quote_request: `Hi ${data.name || 'there'}! Thanks for your interest in Wild West Construction. We've received your request for ${data.service || 'our services'} and will text you back with a quote within 24 hours. Reply STOP to opt out.`,

      booking_confirmation: `Hi ${data.name || 'there'}! Your appointment with Wild West Construction is confirmed for ${data.date || 'TBD'} at ${data.time || 'TBD'}. We'll text you a reminder 24 hours before. Reply STOP to opt out.`,

      reminder: `Reminder: You have an appointment with Wild West Construction tomorrow at ${data.time || 'TBD'}. We'll see you then! Reply STOP to opt out.`,
    };

    return templates[type] || 'Message from Wild West Construction. Reply STOP to opt out.';
  }
}

// Export singleton instance
export const twilioService = new TwilioService();
export default twilioService;
