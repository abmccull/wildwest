import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import validator from 'validator';
import { z } from 'zod';

// Rate limiter configuration
const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 60, // per 60 seconds
});

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  code?: string;
}

// Custom error classes
export class ValidationError extends Error {
  statusCode = 400;
  code = 'VALIDATION_ERROR';

  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class RateLimitError extends Error {
  statusCode = 429;
  code = 'RATE_LIMIT_EXCEEDED';

  constructor(message: string = 'Too many requests') {
    super(message);
    this.name = 'RateLimitError';
  }
}

export class DatabaseError extends Error {
  statusCode = 500;
  code = 'DATABASE_ERROR';

  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin':
    process.env.NODE_ENV === 'production' ? 'https://wildwestconstruction.com' : '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400',
};

// Security headers
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'",
};

// Input sanitization utility
export const sanitizeInput = (input: string): string => {
  return validator.escape(validator.trim(input));
};

// Validate email
export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email) && email.length <= 255;
};

// Validate phone number
export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 15;
};

// IP address validation and extraction
export const getClientIP = (req: NextRequest): string => {
  const forwarded = req.headers.get('x-forwarded-for');
  const realIP = req.headers.get('x-real-ip');
  const cfIP = req.headers.get('cf-connecting-ip');

  if (cfIP) return cfIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(',')[0].trim();

  return req.ip || 'unknown';
};

// User agent extraction
export const getUserAgent = (req: NextRequest): string => {
  return req.headers.get('user-agent') || 'unknown';
};

// Request logging utility
export const logRequest = (req: NextRequest, response?: any, error?: any) => {
  const timestamp = new Date().toISOString();
  const ip = getClientIP(req);
  const userAgent = getUserAgent(req);
  const method = req.method;
  const url = req.url;

  const logData = {
    timestamp,
    ip,
    userAgent,
    method,
    url,
    response: response ? { status: response.status } : undefined,
    error: error ? { message: error.message, stack: error.stack } : undefined,
  };

  if (error) {
    console.error('API Error:', logData);
  } else {
    console.log('API Request:', logData);
  }
};

// Rate limiting middleware
export const withRateLimit = async (req: NextRequest): Promise<void> => {
  try {
    const ip = getClientIP(req);
    await rateLimiter.consume(ip);
  } catch (rejRes: any) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
    throw new RateLimitError(`Rate limit exceeded. Try again in ${secs} seconds.`);
  }
};

// Main API middleware wrapper
export function withApiMiddleware<T = any>(
  handler: (req: NextRequest) => Promise<NextResponse<ApiResponse<T>>>,
  options: {
    methods?: string[];
    requireAuth?: boolean;
    skipRateLimit?: boolean;
  } = {}
) {
  return async (req: NextRequest): Promise<NextResponse<ApiResponse<T>>> => {
    try {
      // Handle CORS preflight
      if (req.method === 'OPTIONS') {
        return new NextResponse(null, {
          status: 200,
          headers: corsHeaders,
        });
      }

      // Method validation
      if (options.methods && !options.methods.includes(req.method)) {
        return NextResponse.json(
          { success: false, error: 'Method not allowed' },
          {
            status: 405,
            headers: { ...corsHeaders, ...securityHeaders },
          }
        );
      }

      // Rate limiting (skip for certain endpoints if configured)
      if (!options.skipRateLimit) {
        await withRateLimit(req);
      }

      // Execute the handler
      const response = await handler(req);

      // Add headers to response
      const headers = new Headers(response.headers);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });
      Object.entries(securityHeaders).forEach(([key, value]) => {
        headers.set(key, value);
      });

      // Log successful request
      logRequest(req, response);

      return new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch (error: any) {
      // Log error
      logRequest(req, undefined, error);

      // Handle different error types
      let statusCode = 500;
      let message = 'Internal server error';

      if (error instanceof ValidationError) {
        statusCode = error.statusCode;
        message = error.message;
      } else if (error instanceof RateLimitError) {
        statusCode = error.statusCode;
        message = error.message;
      } else if (error instanceof DatabaseError) {
        statusCode = error.statusCode;
        message = 'Database operation failed';
      } else if (error.name === 'ZodError') {
        statusCode = 400;
        message = 'Invalid request data';
      }

      return NextResponse.json(
        {
          success: false,
          error: message,
          ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        },
        {
          status: statusCode,
          headers: { ...corsHeaders, ...securityHeaders },
        }
      );
    }
  };
}

// Validation schemas for common request types
export const leadValidationSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().optional().or(z.literal('')),
  mobile: z.string().min(10).max(15),
  city_id: z.number().optional(),
  address: z.string().max(500).optional(),
  service_id: z.number().optional(),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  details: z.string().max(1000).optional(),
  sms_consent: z.boolean().default(false),
  whatsapp_consent: z.boolean().default(false),
  utm_params: z.record(z.string(), z.unknown()).optional(),
  page_path: z.string().max(500).optional(),
});

export const bookingValidationSchema = z.object({
  lead_id: z.number().optional(),
  slot_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
  slot_time: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM format
  status: z.enum(['pending', 'confirmed', 'cancelled']).default('pending'),
});

export const whatsappTrackingSchema = z.object({
  utm_params: z.record(z.string(), z.unknown()).optional(),
  page_path: z.string().max(500).optional(),
  consent: z.boolean().default(true),
});

export const smsRequestSchema = z.object({
  phone_number: z.string().min(10).max(15),
  message: z.string().min(1).max(1600), // SMS character limit
  lead_id: z.number().optional(),
  utm_params: z.record(z.string(), z.unknown()).optional(),
  page_path: z.string().max(500).optional(),
  consent: z.boolean().default(true),
  message_type: z
    .enum(['quote_request', 'booking_confirmation', 'reminder', 'custom'])
    .default('custom'),
  template_data: z.record(z.string(), z.unknown()).optional(),
});

export const smsTrackingSchema = z.object({
  utm_params: z.record(z.string(), z.unknown()).optional(),
  page_path: z.string().max(500).optional(),
  consent: z.boolean().default(true),
  phone_number: z.string().min(10).max(15).optional(),
});

// Response helpers
export const successResponse = <T>(data: T, message?: string): ApiResponse<T> => ({
  success: true,
  data,
  message,
});

export const errorResponse = (error: string, statusCode?: number): ApiResponse => ({
  success: false,
  error,
});
