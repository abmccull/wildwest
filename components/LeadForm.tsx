"use client";

import React, { useState } from "react";
import {
  trackLeadSubmission,
  trackFormInteraction,
  trackQuoteRequest,
  ServiceType,
} from "@/lib/analytics";

interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  city: string;
  projectDescription: string;
  timeframe: string;
  budget: string;
}

interface LeadFormProps {
  variant?: "default" | "compact" | "sidebar";
  showProjectDetails?: boolean;
  onSuccess?: () => void;
  className?: string;
}

const services = [
  { value: "", label: "Select a Service" },
  { value: "flooring", label: "Flooring Services" },
  { value: "demolition", label: "Demolition Services" },
  { value: "junk_removal", label: "Junk Removal" },
  { value: "other", label: "Other Services" },
];

const cities = [
  { value: "", label: "Select Your City" },
  { value: "salt-lake-city", label: "Salt Lake City" },
  { value: "west-valley-city", label: "West Valley City" },
  { value: "west-jordan", label: "West Jordan" },
  { value: "sandy", label: "Sandy" },
  { value: "orem", label: "Orem" },
  { value: "ogden", label: "Ogden" },
  { value: "layton", label: "Layton" },
  { value: "taylorsville", label: "Taylorsville" },
  { value: "murray", label: "Murray" },
  { value: "bountiful", label: "Bountiful" },
  { value: "draper", label: "Draper" },
  { value: "other", label: "Other Utah City" },
];

const timeframes = [
  { value: "", label: "Project Timeframe" },
  { value: "asap", label: "ASAP" },
  { value: "1-month", label: "Within 1 Month" },
  { value: "3-months", label: "Within 3 Months" },
  { value: "6-months", label: "Within 6 Months" },
  { value: "1-year", label: "Within 1 Year" },
  { value: "planning", label: "Just Planning" },
];

const budgets = [
  { value: "", label: "Estimated Budget" },
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 - $15,000" },
  { value: "15k-50k", label: "$15,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "100k-250k", label: "$100,000 - $250,000" },
  { value: "over-250k", label: "Over $250,000" },
  { value: "discuss", label: "Prefer to Discuss" },
];

const LeadForm: React.FC<LeadFormProps> = ({
  variant = "default",
  showProjectDetails = true,
  onSuccess,
  className = "",
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    city: "",
    projectDescription: "",
    timeframe: "",
    budget: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<LeadFormData>>({});
  const [submitMessage, setSubmitMessage] = useState("");
  const [formStarted, setFormStarted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<LeadFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.city) {
      newErrors.city = "Please select your city";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    // Track form start on first interaction
    if (!formStarted) {
      setFormStarted(true);
      trackFormInteraction("lead_form", "start");
    }

    // Track field focus
    trackFormInteraction("lead_form", "field_focus", name);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name as keyof LeadFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track form submission attempt
    trackFormInteraction("lead_form", "submit_attempt");

    if (!validateForm()) {
      // Track validation errors
      Object.keys(errors).forEach((field) => {
        trackFormInteraction("lead_form", "validation_error", field);
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "website_form",
        }),
      });

      if (response.ok) {
        // Track successful lead submission
        await trackLeadSubmission({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service as ServiceType,
          location: formData.city,
          source: "contact-form",
        });

        // Track quote request with additional details
        trackQuoteRequest({
          service: formData.service as ServiceType,
          location: formData.city,
          urgency:
            formData.timeframe === "asap"
              ? "immediate"
              : formData.timeframe === "1-month"
                ? "within_week"
                : formData.timeframe === "3-months"
                  ? "within_month"
                  : "planning_ahead",
          budget_range: formData.budget,
          source: "contact-form",
        });

        // Track form completion
        trackFormInteraction("lead_form", "submit_success");

        setSubmitMessage("Thank you! We'll contact you within 24 hours.");
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          city: "",
          projectDescription: "",
          timeframe: "",
          budget: "",
        });
        setFormStarted(false); // Reset form tracking state
        onSuccess?.();
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitMessage(
        "Sorry, there was an error submitting your request. Please try again or call us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCompact = variant === "compact" || variant === "sidebar";

  return (
    <div
      className={`bg-white rounded-lg shadow-construction border border-gray-200 ${className}`}
    >
      <div className={`${isCompact ? "p-4" : "p-6"}`}>
        {/* Header */}
        <div className="mb-6">
          <h3
            className={`font-bold text-green-700 ${isCompact ? "text-lg" : "text-xl"}`}
          >
            Get Your Free Quote
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Tell us about your project and we&apos;ll get back to you within 24
            hours.
          </p>
        </div>

        {/* Success/Error Message */}
        {submitMessage && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              submitMessage.includes("Thank you")
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {submitMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Information */}
          <div
            className={`grid ${isCompact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4`}
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="John Smith"
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="(480) 555-0123"
              />
              {errors.phone && (
                <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Service and City */}
          <div
            className={`grid ${isCompact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4`}
          >
            {/* Service */}
            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Service Needed *
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200 ${
                  errors.service ? "border-red-500" : "border-gray-300"
                }`}
              >
                {services.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-red-600 text-xs mt-1">{errors.service}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your City *
              </label>
              <select
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200 ${
                  errors.city ? "border-red-500" : "border-gray-300"
                }`}
              >
                {cities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
              {errors.city && (
                <p className="text-red-600 text-xs mt-1">{errors.city}</p>
              )}
            </div>
          </div>

          {/* Project Details (Optional) */}
          {showProjectDetails && (
            <>
              {/* Project Description */}
              <div>
                <label
                  htmlFor="projectDescription"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Project Description
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200"
                  placeholder="Tell us about your project, including any specific requirements or questions..."
                />
              </div>

              {/* Timeframe and Budget */}
              <div
                className={`grid ${isCompact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4`}
              >
                {/* Timeframe */}
                <div>
                  <label
                    htmlFor="timeframe"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Project Timeframe
                  </label>
                  <select
                    id="timeframe"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200"
                  >
                    {timeframes.map((timeframe) => (
                      <option key={timeframe.value} value={timeframe.value}>
                        {timeframe.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent transition-colors duration-200"
                  >
                    {budgets.map((budget) => (
                      <option key={budget.value} value={budget.value}>
                        {budget.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn-primary ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
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
                      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Submitting...</span>
                </div>
              ) : (
                "Get Free Quote"
              )}
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to be contacted about your
            project. We respect your privacy and will never share your
            information.
          </div>
        </form>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t border-gray-200">
        <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Licensed & Insured</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-mustang-yellow"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>A+ BBB Rating</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-sky-blue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>24hr Response</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
