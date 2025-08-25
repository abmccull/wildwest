'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
import { FileUpload, FileWithPreview } from './FileUpload';
import { DateTimePicker } from './DateTimePicker';

export interface LeadFormProps {
  onSubmit: (data: LeadFormData & { utmParams: Record<string, string> }) => Promise<void>;
  className?: string;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, className = '' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  // const [turnstileToken, setTurnstileToken] = useState<string>(''); // Turnstile not implemented yet

  const {
    register,
    handleSubmit,
    control,
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
      address: '',
      serviceType: undefined,
      preferredDate: '',
      preferredTime: '',
      details: '',
      files: [],
      smsConsent: false,
      whatsappConsent: false,
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

  // Update files in form data
  useEffect(() => {
    setValue('files', files, { shouldValidate: true });
  }, [files, setValue]);

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
      setFiles([]);
      // setTurnstileToken('');

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
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-dark mb-4 border-b border-gray-200 pb-2">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                helpText="We'll send SMS updates about your project"
              >
                <input
                  {...register('mobile')}
                  type="tel"
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                />
              </FormField>
            </div>

            <FormField
              label="Email Address"
              error={errors.email?.message}
              helpText="Optional - for email updates and receipts"
            >
              <input
                {...register('email')}
                type="email"
                placeholder="your.email@example.com"
                autoComplete="email"
              />
            </FormField>
          </div>

          {/* Location Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-dark mb-4 border-b border-gray-200 pb-2">
              Project Location
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <FormField
                label="Street Address"
                error={errors.address?.message}
                helpText="Optional - helps us prepare for the visit"
              >
                <input
                  {...register('address')}
                  type="text"
                  placeholder="123 Main Street"
                  autoComplete="street-address"
                />
              </FormField>
            </div>
          </div>

          {/* Service Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-dark mb-4 border-b border-gray-200 pb-2">
              Service Details
            </h3>

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

            <FormField
              label="Project Details"
              error={errors.details?.message}
              helpText="Describe your project, room dimensions, materials, timeline, etc."
            >
              <textarea
                {...register('details')}
                rows={4}
                placeholder="Tell us about your project..."
                className="resize-vertical"
              />
            </FormField>
          </div>

          {/* Scheduling */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-dark mb-4 border-b border-gray-200 pb-2">
              Preferred Schedule
            </h3>

            <Controller
              name="preferredDate"
              control={control}
              render={({ field }) => (
                <Controller
                  name="preferredTime"
                  control={control}
                  render={({ field: timeField }) => (
                    <DateTimePicker
                      dateValue={field.value}
                      timeValue={timeField.value}
                      onDateChange={field.onChange}
                      onTimeChange={timeField.onChange}
                      dateError={errors.preferredDate?.message}
                      timeError={errors.preferredTime?.message}
                    />
                  )}
                />
              )}
            />
          </div>

          {/* File Upload */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-dark mb-4 border-b border-gray-200 pb-2">
              Photos & Videos
            </h3>

            <FormField
              label=""
              error={errors.files?.message}
              helpText="Share photos or videos of your space to help us provide a more accurate estimate"
            >
              <FileUpload files={files} onFilesChange={setFiles} maxFiles={5} />
            </FormField>
          </div>

          {/* Consent Checkboxes */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-dark mb-4 border-b border-gray-200 pb-2">
              Communication Preferences
            </h3>

            <div className="space-y-4">
              <FormField label="" error={errors.smsConsent?.message}>
                <label className="flex items-start space-x-3 cursor-pointer min-h-[44px]">
                  <input
                    {...register('smsConsent')}
                    type="checkbox"
                    className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-text-dark leading-5">
                    <strong className="font-medium">SMS Updates (Required)</strong>
                    <br />I consent to receive text messages about my project status, scheduling,
                    and updates. Standard message rates may apply. Reply STOP to opt out.
                  </span>
                </label>
              </FormField>

              <FormField label="" error={errors.whatsappConsent?.message}>
                <label className="flex items-start space-x-3 cursor-pointer min-h-[44px]">
                  <input
                    {...register('whatsappConsent')}
                    type="checkbox"
                    className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                  />
                  <span className="text-sm text-text-dark leading-5">
                    <strong className="font-medium">WhatsApp Updates (Optional)</strong>
                    <br />
                    I'd like to receive project updates via WhatsApp for faster communication and
                    photo sharing.
                  </span>
                </label>
              </FormField>
            </div>
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
