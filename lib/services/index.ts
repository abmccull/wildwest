// Export all services for easy importing
export { slackService, default as SlackService } from './slack.service';
export { emailService, default as EmailService } from './email.service';
export { analyticsService, default as AnalyticsService } from './analytics.service';
export { storageService, default as StorageService } from './storage.service';
export { twilioService, default as TwilioService } from './twilio.service';

// Re-export types
export type { SlackNotificationData } from './slack.service';
export type { EmailData, LeadConfirmationData, BookingConfirmationData } from './email.service';
export type {
  LeadAnalyticsData,
  BookingAnalyticsData,
  WhatsAppAnalyticsData,
  SmsAnalyticsData,
} from './analytics.service';
export type { FileUploadOptions, FileUploadResult, SignedUrlOptions } from './storage.service';
export type { SendSmsOptions, SmsResponse, SmsDeliveryStatus } from './twilio.service';
