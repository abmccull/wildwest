import { z } from 'zod';

// Salt Lake County Cities
export const SALT_LAKE_COUNTY_CITIES = [
  'Alta',
  'Bluffdale',
  'Cottonwood Heights',
  'Draper',
  'Herriman',
  'Holladay',
  'Midvale',
  'Murray',
  'Riverton',
  'Salt Lake City',
  'Sandy',
  'South Jordan',
  'South Salt Lake',
  'Taylorsville',
  'West Jordan',
  'West Valley City',
  'Millcreek',
  'Emigration Canyon',
  'Magna',
  'Kearns',
  'White City',
  'Copperton',
  'Unincorporated County',
] as const;

// Service Types
export const SERVICE_TYPES = ['Flooring', 'Demolition', 'Junk Removal'] as const;

// Phone number formatting
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-digit characters
  const phoneNumber = value.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX
  if (phoneNumber.length >= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  } else if (phoneNumber.length >= 3) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else {
    return phoneNumber;
  }
};

// Phone validation
export const isValidPhoneNumber = (phone: string): boolean => {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length === 10;
};

// Email validation (using built-in browser validation)
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// File validation
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'video/mp4',
  'video/mov',
  'video/avi',
  'video/quicktime',
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error:
        'File type not supported. Please upload images (JPEG, PNG, WebP) or videos (MP4, MOV, AVI).',
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'File size must be less than 10MB.',
    };
  }

  return { isValid: true };
};

// Get file size display
export const getFileSizeDisplay = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// UTM parameter extraction
export const extractUTMParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};

  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  utmKeys.forEach((key) => {
    const value = urlParams.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  return utmParams;
};

// Form validation schema using Zod
export const leadFormSchema = z.object({
  name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
  mobile: z
    .string()
    .min(1, 'Mobile number is required')
    .refine(isValidPhoneNumber, 'Please enter a valid 10-digit phone number'),
  email: z
    .string()
    .optional()
    .refine((email) => !email || isValidEmail(email), 'Please enter a valid email address'),
  city: z.enum(SALT_LAKE_COUNTY_CITIES).refine((val) => val !== undefined, {
    message: 'Please select a city',
  }),
  address: z.string().optional(),
  serviceType: z.enum(SERVICE_TYPES).refine((val) => val !== undefined, {
    message: 'Please select a service type',
  }),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
  details: z.string().optional(),
  files: z.array(z.any()).optional(),
  smsConsent: z.boolean().refine((val) => val === true, 'SMS consent is required'),
  whatsappConsent: z.boolean(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

// Date/time utilities
export const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatTimeForInput = (date: Date): string => {
  return date.toTimeString().slice(0, 5);
};

export const getTomorrowDate = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return formatDateForInput(tomorrow);
};

// Generate time slots (business hours: 8 AM - 6 PM)
export const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  for (let hour = 8; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
  }
  return slots;
};

// Format time for display (12-hour format)
export const formatTimeDisplay = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};
