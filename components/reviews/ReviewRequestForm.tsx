/**
 * Review Request Form Component
 * Allows customers to submit reviews with proper validation and local SEO integration
 */

'use client';

import React, { useState } from 'react';

interface ReviewRequestFormProps {
  city?: string;
  service?: string;
  onSubmit?: (data: ReviewFormData) => void;
  className?: string;
}

export interface ReviewFormData {
  customerName: string;
  email: string;
  phone?: string;
  neighborhood: string;
  service: string;
  projectValue?: number;
  rating: number;
  reviewTitle: string;
  reviewText: string;
  completionDate: string;
  wouldRecommend: boolean;
  consentToDisplay: boolean;
  consentToContact: boolean;
}

const SERVICES = [
  'Flooring Installation',
  'Hardwood Installation',
  'Laminate Installation',
  'Vinyl Plank Installation',
  'Tile Installation',
  'Carpet Installation',
  'Floor Refinishing',
  'Interior Demolition',
  'Kitchen Demolition',
  'Bathroom Demolition',
  'Concrete Removal',
  'Junk Removal',
  'Construction Debris Removal',
  'Furniture Removal',
  'Appliance Removal',
  'Basement Cleanout',
  'Home Addition',
  'Basement Finishing',
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'General Construction',
];

export function ReviewRequestForm({
  city = '',
  service = '',
  onSubmit,
  className = '',
}: ReviewRequestFormProps) {
  const [formData, setFormData] = useState<ReviewFormData>({
    customerName: '',
    email: '',
    phone: '',
    neighborhood: '',
    service: service,
    projectValue: undefined,
    rating: 5,
    reviewTitle: '',
    reviewText: '',
    completionDate: '',
    wouldRecommend: true,
    consentToDisplay: false,
    consentToContact: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ReviewFormData, string>> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = 'Neighborhood is required';
    }

    if (!formData.service.trim()) {
      newErrors.service = 'Service is required';
    }

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5 stars';
    }

    if (!formData.reviewTitle.trim()) {
      newErrors.reviewTitle = 'Review title is required';
    }

    if (!formData.reviewText.trim()) {
      newErrors.reviewText = 'Review text is required';
    } else if (formData.reviewText.length < 50) {
      newErrors.reviewText = 'Review must be at least 50 characters long';
    }

    if (!formData.completionDate) {
      newErrors.completionDate = 'Completion date is required';
    }

    if (!formData.consentToDisplay) {
      newErrors.consentToDisplay = 'You must consent to display your review';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit to API endpoint
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          city,
          submittedAt: new Date().toISOString(),
          ipAddress: '', // Will be filled by server
          userAgent: navigator.userAgent,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          customerName: '',
          email: '',
          phone: '',
          neighborhood: '',
          service: service,
          projectValue: undefined,
          rating: 5,
          reviewTitle: '',
          reviewText: '',
          completionDate: '',
          wouldRecommend: true,
          consentToDisplay: false,
          consentToContact: false,
        });
        onSubmit?.(formData);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ReviewFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Star rating input component
  const StarRatingInput = () => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Rating <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleInputChange('rating', star)}
            className={`w-8 h-8 ${
              star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } hover:text-yellow-400 transition-colors`}
          >
            <svg viewBox="0 0 20 20" className="w-full h-full">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          ({formData.rating} star{formData.rating !== 1 ? 's' : ''})
        </span>
      </div>
      {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
    </div>
  );

  if (submitStatus === 'success') {
    return (
      <div
        className={`bg-green-50 border border-green-200 rounded-lg p-8 text-center ${className}`}
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You for Your Review!</h3>
        <p className="text-green-700 mb-4">
          Your review has been submitted successfully. We appreciate your feedback and will review
          it for publication on our website.
        </p>
        <button onClick={() => setSubmitStatus('idle')} className="btn-primary">
          Submit Another Review
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Share Your Experience {city && `in ${city}`}
        </h2>
        <p className="text-gray-600">
          Help other customers by sharing your experience with Wild West Construction. Your feedback
          helps us improve our services.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                errors.customerName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.customerName && (
              <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="(801) 555-0123"
            />
          </div>

          {/* Neighborhood */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Neighborhood <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.neighborhood}
              onChange={(e) => handleInputChange('neighborhood', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                errors.neighborhood ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Sugar House, The Avenues"
            />
            {errors.neighborhood && (
              <p className="text-red-500 text-sm mt-1">{errors.neighborhood}</p>
            )}
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Received <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.service}
              onChange={(e) => handleInputChange('service', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                errors.service ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a service</option>
              {SERVICES.map((svc) => (
                <option key={svc} value={svc}>
                  {svc}
                </option>
              ))}
            </select>
            {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
          </div>

          {/* Project Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Value (Optional)
            </label>
            <input
              type="number"
              value={formData.projectValue || ''}
              onChange={(e) =>
                handleInputChange(
                  'projectValue',
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="25000"
              min="0"
              step="100"
            />
          </div>
        </div>

        {/* Rating */}
        <StarRatingInput />

        {/* Completion Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Completion Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.completionDate}
            onChange={(e) => handleInputChange('completionDate', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.completionDate ? 'border-red-500' : 'border-gray-300'
            }`}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.completionDate && (
            <p className="text-red-500 text-sm mt-1">{errors.completionDate}</p>
          )}
        </div>

        {/* Review Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Review Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.reviewTitle}
            onChange={(e) => handleInputChange('reviewTitle', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.reviewTitle ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Excellent flooring installation service"
            maxLength={100}
          />
          {errors.reviewTitle && <p className="text-red-500 text-sm mt-1">{errors.reviewTitle}</p>}
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.reviewText}
            onChange={(e) => handleInputChange('reviewText', e.target.value)}
            rows={5}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
              errors.reviewText ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell us about your experience with Wild West Construction. What did you like about our service? How was the quality of work?"
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.reviewText && <p className="text-red-500 text-sm">{errors.reviewText}</p>}
            <p className="text-gray-500 text-sm">
              {formData.reviewText.length}/1000 characters (minimum 50)
            </p>
          </div>
        </div>

        {/* Would Recommend */}
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.wouldRecommend}
              onChange={(e) => handleInputChange('wouldRecommend', e.target.checked)}
              className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-sm text-gray-700">
              I would recommend Wild West Construction to friends and family
            </span>
          </label>
        </div>

        {/* Consent Checkboxes */}
        <div className="space-y-3 border-t pt-4">
          <div>
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.consentToDisplay}
                onChange={(e) => handleInputChange('consentToDisplay', e.target.checked)}
                className="w-5 h-5 mt-0.5 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">
                <span className="text-red-500">*</span> I consent to display my review on the Wild
                West Construction website and marketing materials. I understand that my first name
                and last initial may be shown publicly.
              </span>
            </label>
            {errors.consentToDisplay && (
              <p className="text-red-500 text-sm ml-8">{errors.consentToDisplay}</p>
            )}
          </div>

          <div>
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.consentToContact}
                onChange={(e) => handleInputChange('consentToContact', e.target.checked)}
                className="w-5 h-5 mt-0.5 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">
                I consent to be contacted by Wild West Construction for follow-up or testimonial
                opportunities.
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v12m6-6H6"
                  />
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit Review</span>
            )}
          </button>

          {submitStatus === 'error' && (
            <div className="flex items-center text-red-600 text-sm">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              There was an error submitting your review. Please try again.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReviewRequestForm;
