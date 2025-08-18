'use client';

import React, { useState, useEffect } from 'react';
import { analyticsService } from '@/lib/services/analytics.service';

interface SmsButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  variant?: 'floating' | 'inline' | 'icon';
  showText?: boolean;
  messageType?: 'quote_request' | 'booking_confirmation' | 'reminder' | 'custom';
  templateData?: Record<string, any>;
  leadId?: number;
}

const DEFAULT_PHONE_NUMBER = '+18011234567'; // Replace with actual Wild West Construction SMS number
const DEFAULT_MESSAGE =
  'Hi! I found your construction services online and would like to get a quote. Please text me back with more information.';

export const SmsButton: React.FC<SmsButtonProps> = ({
  phoneNumber = DEFAULT_PHONE_NUMBER,
  message = DEFAULT_MESSAGE,
  className = '',
  variant = 'floating',
  showText = true,
  messageType = 'custom',
  templateData = {},
  leadId,
}) => {
  const [showSmsModal, setSmsModal] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customMessage, setCustomMessage] = useState(message);
  const [customPhone, setCustomPhone] = useState('');
  const [smsStatus, setSmsStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Check if user has already given consent
  useEffect(() => {
    const hasConsent = localStorage.getItem('sms_consent') === 'true';
    setHasInteracted(hasConsent);
  }, []);

  const handleSmsClick = () => {
    if (!hasInteracted) {
      setShowConsentModal(true);
      return;
    }

    // Track SMS button click
    trackSmsClick();

    // Show SMS modal for custom message input
    setSmsModal(true);
  };

  const trackSmsClick = async () => {
    try {
      // Track click in analytics
      await analyticsService.trackCustomEvent('sms_clicked', {
        phone_number: phoneNumber,
        message_length: customMessage.length,
        variant,
        message_type: messageType,
        has_consent: hasInteracted,
      });

      // Track via API for more detailed analytics
      const utmParams: Record<string, string> = {};
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((param) => {
          const value = urlParams.get(param);
          if (value) utmParams[param] = value;
        });
      }

      fetch('/api/sms', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          utm_params: utmParams,
          page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
          consent: true,
          phone_number: customPhone || phoneNumber,
        }),
      }).catch(console.error);
    } catch (error) {
      console.error('Error tracking SMS click:', error);
    }
  };

  const sendSms = async () => {
    if (!customPhone.trim()) {
      setErrorMessage('Please enter your phone number');
      return;
    }

    if (!customMessage.trim()) {
      setErrorMessage('Please enter a message');
      return;
    }

    setIsLoading(true);
    setSmsStatus('sending');
    setErrorMessage('');

    try {
      // Get UTM parameters
      const utmParams: Record<string, string> = {};
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((param) => {
          const value = urlParams.get(param);
          if (value) utmParams[param] = value;
        });
      }

      const response = await fetch('/api/sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: customPhone,
          message: customMessage,
          lead_id: leadId,
          utm_params: utmParams,
          page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
          consent: true,
          message_type: messageType,
          template_data: templateData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSmsStatus('sent');

        // Track successful SMS
        await analyticsService.trackCustomEvent('sms_sent_success', {
          message_type: messageType,
          message_length: customMessage.length,
          phone_number_hash: customPhone.slice(-4),
          variant,
        });

        // Close modal after short delay
        setTimeout(() => {
          setSmsModal(false);
          setSmsStatus('idle');
          setCustomMessage(message);
          setCustomPhone('');
        }, 2000);
      } else {
        setSmsStatus('error');
        setErrorMessage(result.error || 'Failed to send SMS. Please try again.');

        // Track failed SMS
        await analyticsService.trackCustomEvent('sms_sent_failed', {
          message_type: messageType,
          error_type: result.error || 'unknown',
          variant,
        });
      }
    } catch (error) {
      setSmsStatus('error');
      setErrorMessage('Network error. Please try again.');
      console.error('Error sending SMS:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConsentAccept = () => {
    localStorage.setItem('sms_consent', 'true');
    setHasInteracted(true);
    setShowConsentModal(false);
    setSmsModal(true);

    // Track consent given
    analyticsService
      .trackCustomEvent('sms_consent_given', {
        variant,
      })
      .catch(console.error);
  };

  const handleConsentDecline = () => {
    setShowConsentModal(false);

    // Track consent declined
    analyticsService
      .trackCustomEvent('sms_consent_declined', {
        variant,
      })
      .catch(console.error);
  };

  const getButtonStyles = () => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    switch (variant) {
      case 'floating':
        return `${baseStyles} fixed bottom-32 right-4 z-40 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl focus:ring-blue-500 hover:scale-105`;

      case 'inline':
        return `${baseStyles} bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg focus:ring-blue-500`;

      case 'icon':
        return `${baseStyles} bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-sm hover:shadow-md focus:ring-blue-500`;

      default:
        return `${baseStyles} bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg focus:ring-blue-500`;
    }
  };

  const SmsIcon = () => (
    <svg
      className={`${variant === 'floating' ? 'w-6 h-6' : 'w-5 h-5'}`}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
    </svg>
  );

  return (
    <>
      <button
        onClick={handleSmsClick}
        className={`${getButtonStyles()} ${className}`}
        aria-label="Contact us via SMS"
        title="Send us a text message"
      >
        <SmsIcon />
        {showText && variant !== 'icon' && variant !== 'floating' && (
          <span className="ml-2">Text Us</span>
        )}
        {variant === 'floating' && (
          <span className="absolute -top-2 -left-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            SMS
          </span>
        )}
      </button>

      {/* Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <SmsIcon />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Send SMS Message</h3>

                <p className="text-gray-600 mb-4">
                  We'll help you connect with Wild West Construction via SMS. You'll be able to
                  customize your message and provide your phone number for a response.
                </p>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700 font-medium mb-1">How it works:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Enter your phone number and message</li>
                    <li>We'll send it to Wild West Construction</li>
                    <li>They'll text you back directly</li>
                  </ul>
                </div>

                <div className="text-xs text-gray-500 mb-6">
                  By continuing, you consent to receiving SMS messages from Wild West Construction.
                  Standard message and data rates may apply. Reply STOP to opt out at any time.
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleConsentAccept}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Continue
                  </button>

                  <button
                    onClick={handleConsentDecline}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SMS Modal */}
      {showSmsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <SmsIcon />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Send SMS Message</h3>
                <p className="text-sm text-gray-600">
                  Wild West Construction will receive your message and text you back.
                </p>
              </div>
            </div>

            {smsStatus === 'sent' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h4>
                <p className="text-gray-600">Wild West Construction will text you back shortly.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={customPhone}
                    onChange={(e) => setCustomPhone(e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={4}
                    maxLength={1600}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    disabled={isLoading}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {customMessage.length}/1600 characters
                  </div>
                </div>

                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  </div>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={sendSms}
                    disabled={isLoading || smsStatus === 'sending'}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                  >
                    {smsStatus === 'sending' ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
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
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setSmsModal(false);
                      setSmsStatus('idle');
                      setErrorMessage('');
                      setCustomMessage(message);
                      setCustomPhone('');
                    }}
                    disabled={isLoading}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SmsButton;
