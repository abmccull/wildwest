import { Resend } from 'resend';
import type { Lead, Booking } from '../supabase';

// Simple email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export interface LeadConfirmationData {
  lead: Lead;
  leadId: number;
}

export interface BookingConfirmationData {
  booking: Booking;
  lead?: Lead;
  icsAttachment?: string;
}

class EmailService {
  private resend: Resend | null;
  private fromEmail: string;
  private replyToEmail: string;
  private companyName: string;
  private isEnabled: boolean;

  constructor() {
    const resendApiKey = process.env.RESEND_API_KEY;

    // Only initialize Resend if API key is provided
    if (resendApiKey) {
      this.resend = new Resend(resendApiKey);
      this.isEnabled = true;
    } else {
      this.resend = null;
      this.isEnabled = false;
      console.warn('Email service disabled: RESEND_API_KEY not configured');
    }

    this.fromEmail = process.env.FROM_EMAIL || 'noreply@wildwestconstruction.com';
    this.replyToEmail = process.env.REPLY_TO_EMAIL || 'contact@wildwestconstruction.com';
    this.companyName = 'Wild West Construction';
  }

  private formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  }

  private formatDateTime(date: string, time?: string): string {
    try {
      const dateObj = new Date(date + (time ? `T${time}` : ''));
      return dateObj.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: time ? '2-digit' : undefined,
        minute: time ? '2-digit' : undefined,
        timeZone: 'America/Denver',
      });
    } catch {
      return date + (time ? ` at ${time}` : '');
    }
  }

  private generateLeadConfirmationHtml(data: LeadConfirmationData): string {
    const { lead, leadId } = data;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Thank You - ${this.companyName}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px;
            }
            .header { 
              background: #d2691e; 
              color: white; 
              padding: 20px; 
              text-align: center; 
              border-radius: 5px 5px 0 0;
            }
            .content { 
              background: #f9f9f9; 
              padding: 30px; 
              border-radius: 0 0 5px 5px;
            }
            .highlight { 
              background: #fff; 
              padding: 15px; 
              border-left: 4px solid #d2691e; 
              margin: 20px 0;
            }
            .footer { 
              text-align: center; 
              margin-top: 30px; 
              font-size: 14px; 
              color: #666;
            }
            .contact-info {
              background: #fff;
              padding: 20px;
              border-radius: 5px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${this.companyName}</h1>
            <p>Thank you for your interest!</p>
          </div>
          
          <div class="content">
            <h2>Hi ${lead.name},</h2>
            
            <p>Thank you for reaching out to ${this.companyName}! We've received your request and our team will be in touch with you soon.</p>
            
            <div class="highlight">
              <h3>Your Request Details:</h3>
              <p><strong>Name:</strong> ${lead.name}</p>
              <p><strong>Phone:</strong> ${this.formatPhoneNumber(lead.mobile)}</p>
              ${lead.email ? `<p><strong>Email:</strong> ${lead.email}</p>` : ''}
              ${lead.address ? `<p><strong>Address:</strong> ${lead.address}</p>` : ''}
              ${
                lead.preferred_date && lead.preferred_time
                  ? `<p><strong>Preferred Date/Time:</strong> ${this.formatDateTime(lead.preferred_date, lead.preferred_time)}</p>`
                  : ''
              }
              ${lead.details ? `<p><strong>Additional Details:</strong> ${lead.details}</p>` : ''}
              <p><strong>Reference ID:</strong> #${leadId}</p>
            </div>
            
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our team will review your request within 24 hours</li>
              <li>We'll contact you via phone or email to discuss your project</li>
              <li>We'll schedule a convenient time for a consultation if needed</li>
            </ul>
            
            <div class="contact-info">
              <h3>Need immediate assistance?</h3>
              <p>Feel free to call us directly at: <strong>(555) 123-4567</strong></p>
              <p>Or send us an email at: <strong>${this.replyToEmail}</strong></p>
              <p>Business Hours: Monday - Friday, 8:00 AM - 6:00 PM MT</p>
              ${
                lead.whatsapp_consent
                  ? '<p>You can also reach us on <strong>WhatsApp</strong> at the same number!</p>'
                  : ''
              }
            </div>
            
            <p>We appreciate your business and look forward to working with you!</p>
            
            <p>Best regards,<br>
            The ${this.companyName} Team</p>
          </div>
          
          <div class="footer">
            <p>${this.companyName} | Professional Construction Services</p>
            <p>This email was sent in response to your inquiry on our website.</p>
          </div>
        </body>
      </html>
    `;
  }

  private generateLeadConfirmationText(data: LeadConfirmationData): string {
    const { lead, leadId } = data;

    return `
Hi ${lead.name},

Thank you for reaching out to ${this.companyName}! We've received your request and our team will be in touch with you soon.

Your Request Details:
- Name: ${lead.name}
- Phone: ${this.formatPhoneNumber(lead.mobile)}
${lead.email ? `- Email: ${lead.email}` : ''}
${lead.address ? `- Address: ${lead.address}` : ''}
${
  lead.preferred_date && lead.preferred_time
    ? `- Preferred Date/Time: ${this.formatDateTime(lead.preferred_date, lead.preferred_time)}`
    : ''
}
${lead.details ? `- Additional Details: ${lead.details}` : ''}
- Reference ID: #${leadId}

What happens next?
• Our team will review your request within 24 hours
• We'll contact you via phone or email to discuss your project
• We'll schedule a convenient time for a consultation if needed

Need immediate assistance?
Call us directly at: (555) 123-4567
Email us at: ${this.replyToEmail}
Business Hours: Monday - Friday, 8:00 AM - 6:00 PM MT
${lead.whatsapp_consent ? 'You can also reach us on WhatsApp at the same number!' : ''}

We appreciate your business and look forward to working with you!

Best regards,
The ${this.companyName} Team

---
${this.companyName} | Professional Construction Services
This email was sent in response to your inquiry on our website.
    `.trim();
  }

  private generateBookingConfirmationHtml(data: BookingConfirmationData): string {
    const { booking, lead } = data;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Booking Confirmation - ${this.companyName}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px;
            }
            .header { 
              background: #28a745; 
              color: white; 
              padding: 20px; 
              text-align: center; 
              border-radius: 5px 5px 0 0;
            }
            .content { 
              background: #f9f9f9; 
              padding: 30px; 
              border-radius: 0 0 5px 5px;
            }
            .booking-details { 
              background: #fff; 
              padding: 20px; 
              border-left: 4px solid #28a745; 
              margin: 20px 0;
              text-align: center;
            }
            .important-info {
              background: #fff3cd;
              border: 1px solid #ffeaa7;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer { 
              text-align: center; 
              margin-top: 30px; 
              font-size: 14px; 
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 Booking Confirmed!</h1>
            <p>${this.companyName}</p>
          </div>
          
          <div class="content">
            <h2>Hi ${lead?.name || 'Valued Customer'},</h2>
            
            <p>Great news! Your appointment has been successfully scheduled with ${this.companyName}.</p>
            
            <div class="booking-details">
              <h3>📅 Your Appointment Details</h3>
              <p><strong>Date:</strong> ${this.formatDateTime(booking.slot_date)}</p>
              <p><strong>Time:</strong> ${booking.slot_time}</p>
              <p><strong>Status:</strong> ${booking.status.toUpperCase()}</p>
              <p><strong>Booking ID:</strong> #${booking.id}</p>
            </div>
            
            <div class="important-info">
              <h3>⚠️ Important Information:</h3>
              <ul>
                <li>Please be available 15 minutes before your scheduled time</li>
                <li>Our team will call you to confirm 24 hours in advance</li>
                <li>If you need to reschedule, please contact us at least 24 hours ahead</li>
                <li>Please have your reference ID ready: #${booking.id}</li>
              </ul>
            </div>
            
            <p><strong>Contact Information:</strong></p>
            <p>Phone: <strong>(555) 123-4567</strong></p>
            <p>Email: <strong>${this.replyToEmail}</strong></p>
            
            <p>We look forward to serving you!</p>
            
            <p>Best regards,<br>
            The ${this.companyName} Team</p>
          </div>
          
          <div class="footer">
            <p>${this.companyName} | Professional Construction Services</p>
            <p>Save this email for your records</p>
          </div>
        </body>
      </html>
    `;
  }

  async sendLeadConfirmation(data: LeadConfirmationData): Promise<boolean> {
    if (!this.isEnabled) {
      console.log('Email service is disabled - skipping lead confirmation email');
      return false;
    }

    if (!data.lead.email) {
      console.log('Skipping email confirmation - no email provided');
      return false;
    }

    // Validate email format
    if (!EMAIL_REGEX.test(data.lead.email)) {
      console.error('Invalid email format:', data.lead.email);
      return false;
    }

    try {
      const emailData: EmailData = {
        to: data.lead.email,
        subject: `Thank you for contacting ${this.companyName} - We'll be in touch soon!`,
        html: this.generateLeadConfirmationHtml(data),
        text: this.generateLeadConfirmationText(data),
        from: this.fromEmail,
        replyTo: this.replyToEmail,
      };

      const result = await this.resend!.emails.send(emailData as any);

      console.log('Lead confirmation email sent:', result.data?.id);
      return true;
    } catch (error) {
      console.error('Failed to send lead confirmation email:', error);
      return false;
    }
  }

  async sendBookingConfirmation(data: BookingConfirmationData): Promise<boolean> {
    if (!this.isEnabled) {
      console.log('Email service is disabled - skipping booking confirmation email');
      return false;
    }

    if (!data.lead?.email) {
      console.log('Skipping booking confirmation email - no email provided');
      return false;
    }

    // Validate email format
    if (!EMAIL_REGEX.test(data.lead.email)) {
      console.error('Invalid email format:', data.lead.email);
      return false;
    }

    try {
      const emailData: EmailData = {
        to: data.lead.email,
        subject: `Booking Confirmation - ${this.companyName} | ${this.formatDateTime(data.booking.slot_date)}`,
        html: this.generateBookingConfirmationHtml(data),
        from: this.fromEmail,
        replyTo: this.replyToEmail,
      };

      // Add ICS calendar attachment if provided
      const attachments = [];
      if (data.icsAttachment) {
        attachments.push({
          filename: 'appointment.ics',
          content: Buffer.from(data.icsAttachment).toString('base64'),
          contentType: 'text/calendar',
        });
      }

      const result = await this.resend!.emails.send({
        ...emailData,
        attachments: attachments.length > 0 ? attachments : undefined,
      } as any);

      console.log('Booking confirmation email sent:', result.data?.id);
      return true;
    } catch (error) {
      console.error('Failed to send booking confirmation email:', error);
      return false;
    }
  }

  async sendInternalNotification(
    subject: string,
    content: string,
    recipient?: string
  ): Promise<boolean> {
    if (!this.isEnabled) {
      console.log('Email service is disabled - skipping internal notification');
      return false;
    }

    try {
      const emailData: EmailData = {
        to: recipient || this.replyToEmail,
        subject: `[${this.companyName}] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>${subject}</h2>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
              ${content}
            </div>
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
              This is an automated notification from ${this.companyName} website.
            </p>
          </div>
        `,
        text: content,
        from: this.fromEmail,
        replyTo: this.replyToEmail,
      };

      const result = await this.resend!.emails.send(emailData as any);
      console.log('Internal notification email sent:', result.data?.id);
      return true;
    } catch (error) {
      console.error('Failed to send internal notification email:', error);
      return false;
    }
  }

  async testEmail(recipientEmail: string): Promise<boolean> {
    if (!this.isEnabled) {
      console.log('Email service is disabled - cannot send test email');
      return false;
    }

    try {
      const result = await this.resend!.emails.send({
        to: recipientEmail,
        subject: `${this.companyName} - Email Service Test`,
        html: '<p>This is a test email from the Wild West Construction API.</p>',
        text: 'This is a test email from the Wild West Construction API.',
        from: this.fromEmail,
      } as any);

      console.log('Test email sent:', result.data?.id);
      return true;
    } catch (error) {
      console.error('Failed to send test email:', error);
      return false;
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();
export default emailService;
