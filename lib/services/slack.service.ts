import type { Lead, Booking } from '../supabase';

export interface SlackNotificationData {
  lead?: Lead;
  booking?: Booking;
  type: 'lead' | 'booking' | 'whatsapp_click';
  metadata?: Record<string, any>;
}

export interface SlackField {
  title: string;
  value: string;
  short: boolean;
}

export interface SlackAttachment {
  color: string;
  title: string;
  fields: SlackField[];
  footer?: string;
  ts?: number;
}

export interface SlackMessage {
  text: string;
  attachments: SlackAttachment[];
  channel?: string;
  username?: string;
  icon_emoji?: string;
}

class SlackService {
  private webhookUrl: string;
  private defaultChannel: string;
  private botName: string;

  constructor() {
    this.webhookUrl = process.env.SLACK_WEBHOOK_URL || '';
    this.defaultChannel = process.env.SLACK_DEFAULT_CHANNEL || '#leads';
    this.botName = 'Wild West Bot';

    if (!this.webhookUrl) {
      console.warn('SLACK_WEBHOOK_URL not configured - Slack notifications disabled');
    }
  }

  private async sendToSlack(message: SlackMessage): Promise<boolean> {
    if (!this.webhookUrl) {
      console.log('Slack notification skipped - webhook not configured');
      return false;
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel: message.channel || this.defaultChannel,
          username: this.botName,
          icon_emoji: message.icon_emoji || ':construction:',
          text: message.text,
          attachments: message.attachments,
        }),
      });

      if (!response.ok) {
        throw new Error(`Slack API error: ${response.status} ${response.statusText}`);
      }

      console.log('Slack notification sent successfully');
      return true;
    } catch (error) {
      console.error('Failed to send Slack notification:', error);
      return false;
    }
  }

  private formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  }

  private formatDateTime(dateTime: string): string {
    try {
      return new Date(dateTime).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Denver', // Mountain Time for Wild West Construction
      });
    } catch {
      return dateTime;
    }
  }

  async notifyNewLead(data: SlackNotificationData): Promise<boolean> {
    if (!data.lead) return false;

    const lead = data.lead;
    const fields: SlackField[] = [
      {
        title: 'Name',
        value: lead.name,
        short: true,
      },
      {
        title: 'Phone',
        value: this.formatPhoneNumber(lead.mobile),
        short: true,
      },
    ];

    if (lead.email) {
      fields.push({
        title: 'Email',
        value: lead.email,
        short: true,
      });
    }

    if (lead.address) {
      fields.push({
        title: 'Address',
        value: lead.address,
        short: false,
      });
    }

    if (lead.preferred_date && lead.preferred_time) {
      fields.push({
        title: 'Preferred Date/Time',
        value: `${lead.preferred_date} at ${lead.preferred_time}`,
        short: true,
      });
    }

    if (lead.details) {
      fields.push({
        title: 'Details',
        value: lead.details,
        short: false,
      });
    }

    // Add consent information
    const consentInfo = [];
    if (lead.sms_consent) consentInfo.push('SMS');
    if (lead.whatsapp_consent) consentInfo.push('WhatsApp');

    if (consentInfo.length > 0) {
      fields.push({
        title: 'Consent Given',
        value: consentInfo.join(', '),
        short: true,
      });
    }

    // Add UTM parameters if available
    if (lead.utm_params && typeof lead.utm_params === 'object') {
      const utmInfo = Object.entries(lead.utm_params)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      if (utmInfo) {
        fields.push({
          title: 'Source',
          value: utmInfo,
          short: false,
        });
      }
    }

    if (lead.page_path) {
      fields.push({
        title: 'Page',
        value: lead.page_path,
        short: true,
      });
    }

    const message: SlackMessage = {
      text: ':bell: New Lead Received!',
      icon_emoji: ':construction_worker:',
      attachments: [
        {
          color: '#36a64f', // Green
          title: `Lead #${lead.id}`,
          fields,
          footer: 'Wild West Construction',
          ts: Math.floor(new Date(lead.created_at).getTime() / 1000),
        },
      ],
    };

    return this.sendToSlack(message);
  }

  async notifyNewBooking(data: SlackNotificationData): Promise<boolean> {
    if (!data.booking) return false;

    const booking = data.booking;
    const fields: SlackField[] = [
      {
        title: 'Booking Date',
        value: booking.slot_date,
        short: true,
      },
      {
        title: 'Time Slot',
        value: booking.slot_time,
        short: true,
      },
      {
        title: 'Status',
        value: booking.status.toUpperCase(),
        short: true,
      },
    ];

    if (booking.lead_id) {
      fields.push({
        title: 'Lead ID',
        value: `#${booking.lead_id}`,
        short: true,
      });
    }

    const statusColor = {
      pending: '#ff9f40', // Orange
      confirmed: '#36a64f', // Green
      cancelled: '#ff6384', // Red
    };

    const message: SlackMessage = {
      text: ':calendar: New Booking Created!',
      icon_emoji: ':calendar:',
      attachments: [
        {
          color: statusColor[booking.status] || '#ff9f40',
          title: `Booking #${booking.id}`,
          fields,
          footer: 'Wild West Construction',
          ts: Math.floor(new Date(booking.created_at).getTime() / 1000),
        },
      ],
    };

    return this.sendToSlack(message);
  }

  async notifyWhatsAppClick(data: SlackNotificationData): Promise<boolean> {
    const metadata = data.metadata || {};
    const fields: SlackField[] = [];

    if (metadata.ip) {
      fields.push({
        title: 'IP Address',
        value: metadata.ip,
        short: true,
      });
    }

    if (metadata.userAgent) {
      fields.push({
        title: 'User Agent',
        value:
          metadata.userAgent.substring(0, 100) + (metadata.userAgent.length > 100 ? '...' : ''),
        short: false,
      });
    }

    if (metadata.page_path) {
      fields.push({
        title: 'Page',
        value: metadata.page_path,
        short: true,
      });
    }

    if (metadata.utm_params && typeof metadata.utm_params === 'object') {
      const utmInfo = Object.entries(metadata.utm_params)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      if (utmInfo) {
        fields.push({
          title: 'UTM Parameters',
          value: utmInfo,
          short: false,
        });
      }
    }

    const message: SlackMessage = {
      text: ':phone: WhatsApp Click Tracked',
      icon_emoji: ':phone:',
      attachments: [
        {
          color: '#25D366', // WhatsApp green
          title: 'WhatsApp Engagement',
          fields,
          footer: 'Wild West Construction',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    };

    return this.sendToSlack(message);
  }

  async notifyError(error: string, context?: Record<string, any>): Promise<boolean> {
    const fields: SlackField[] = [
      {
        title: 'Error Message',
        value: error,
        short: false,
      },
    ];

    if (context) {
      fields.push({
        title: 'Context',
        value: JSON.stringify(context, null, 2),
        short: false,
      });
    }

    const message: SlackMessage = {
      text: ':warning: API Error Detected',
      icon_emoji: ':warning:',
      channel: '#alerts', // Send errors to alerts channel
      attachments: [
        {
          color: '#ff0000', // Red
          title: 'API Error',
          fields,
          footer: 'Wild West Construction API',
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    };

    return this.sendToSlack(message);
  }
}

// Export singleton instance
export const slackService = new SlackService();
export default slackService;
