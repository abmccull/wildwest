'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  leadFormSchema,
  LeadFormData,
  formatPhoneNumber,
  SALT_LAKE_COUNTY_CITIES,
  SERVICE_TYPES,
  extractUTMParams,
} from '@/lib/form-utils';
import { FormField } from './FormField';

export interface LeadFormProps {
  onSubmit: (data: LeadFormData & { utmParams: Record<string, string> }) => Promise<void>;
  className?: string;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, className = '' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
      city: undefined,
      serviceType: undefined,
      details: '',
    },
  });

  // Watch mobile field for formatting
  const mobileValue = watch('mobile');

  // Format phone number on change
  useEffect(() => {
    if (mobileValue) {
      const formatted = formatPhoneNumber(mobileValue);
      if (formatted !== mobileValue) {
        setValue('mobile', formatted, { shouldValidate: true });
      }
    }
  }, [mobileValue, setValue]);


  const handleFormSubmit = async (data: LeadFormData) => {
    // Turnstile verification temporarily disabled
    // if (!turnstileToken) {
    //   setSubmitError('Please complete the verification challenge before submitting.');
    //   return;
    // }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const utmParams = extractUTMParams();
      await onSubmit({ ...data, utmParams });

      setSubmitSuccess(true);
      reset();

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'An error occurred while submitting the form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div
        className={`max-w-2xl mx-auto p-6 bg-green-50 border border-green-200 rounded-lg ${className}`}
      >
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="w-12 h-12 mx-auto text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h2>
          <p className="text-green-700 mb-4">
            Your request has been submitted successfully. We'll contact you within 24 hours to
            discuss your project.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="text-green-600 hover:text-green-800 font-medium focus:outline-none focus:underline"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          {/* Status Messages */}
          <div role="status" aria-live="polite" className="sr-only">
            {isSubmitting && 'Submitting form...'}
            {submitSuccess && 'Form submitted successfully!'}
            {submitError && `Error: ${submitError}`}
          </div>

          {submitError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600" role="alert">
                {submitError}
              </p>
            </div>
          )}

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text-dark mb-4">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Full Name" error={errors.name?.message} required>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
              </FormField>

              <FormField
                label="Mobile Number"
                error={errors.mobile?.message}
                required
              >
                <input
                  {...register('mobile')}
                  type="tel"
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                />
              </FormField>
            </div>
          </div>

          {/* Service & Location */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text-dark mb-4">
              Project Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Service Type" error={errors.serviceType?.message} required>
                <select {...register('serviceType')}>
                  <option value="">Select a service</option>
                  {SERVICE_TYPES.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="City" error={errors.city?.message} required>
                <select {...register('city')}>
                  <option value="">Select your city</option>
                  {SALT_LAKE_COUNTY_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <FormField
              label="Tell us about your project (optional)"
              error={errors.details?.message}
            >
              <textarea
                {...register('details')}
                rows={3}
                placeholder="Describe what you need help with..."
                className="resize-vertical"
              />
            </FormField>

            <FormField
              label="Email (optional)"
              error={errors.email?.message}
              helpText="We'll send a copy of your quote to your email"
            >
              <input
                {...register('email')}
                type="email"
                placeholder="your.email@example.com"
                autoComplete="email"
              />
            </FormField>
          </div>



          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 min-h-[52px] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isSubmitting || !isValid
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 text-white focus:ring-primary shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Submitting...</span>
              </div>
            ) : (
              'Get Free Quote'
            )}
          </button>

          {/* Additional Information */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              🔒 Your information is secure and will never be shared with third parties.
              <br />
              📞 We'll contact you within 24 hours to discuss your project.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
