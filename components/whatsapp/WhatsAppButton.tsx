'use client';

import React, { useState, useEffect } from 'react';
import { analyticsService } from '@/lib/services/analytics.service';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  variant?: 'floating' | 'inline' | 'icon';
  showText?: boolean;
}

const DEFAULT_PHONE_NUMBER = '+1234567890'; // Replace with actual Wild West Construction WhatsApp number
const DEFAULT_MESSAGE =
  'Hi! I found your construction services online and would like to learn more about your work.';

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = DEFAULT_PHONE_NUMBER,
  message = DEFAULT_MESSAGE,
  className = '',
  variant = 'floating',
  showText = true,
}) => {
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Check if user has already given consent
  useEffect(() => {
    const hasConsent = localStorage.getItem('whatsapp_consent') === 'true';
    setHasInteracted(hasConsent);
  }, []);

  const handleWhatsAppClick = () => {
    if (!hasInteracted) {
      setShowConsentModal(true);
      return;
    }

    openWhatsApp();
  };

  const openWhatsApp = async () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^\d]/g, '')}?text=${encodedMessage}`;

    try {
      // Track click in analytics
      await analyticsService.trackCustomEvent('whatsapp_clicked', {
        phone_number: phoneNumber,
        message_length: message.length,
        variant,
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

      fetch('/api/whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          utm_params: utmParams,
          page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
          consent: true,
        }),
      }).catch(console.error);

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Error tracking WhatsApp click:', error);
      // Still open WhatsApp even if tracking fails
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleConsentAccept = () => {
    localStorage.setItem('whatsapp_consent', 'true');
    setHasInteracted(true);
    setShowConsentModal(false);
    openWhatsApp();

    // Track consent given
    analyticsService
      .trackCustomEvent('whatsapp_consent_given', {
        variant,
      })
      .catch(console.error);
  };

  const handleConsentDecline = () => {
    setShowConsentModal(false);

    // Track consent declined
    analyticsService
      .trackCustomEvent('whatsapp_consent_declined', {
        variant,
      })
      .catch(console.error);
  };

  const getButtonStyles = () => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    switch (variant) {
      case 'floating':
        return `${baseStyles} fixed bottom-20 right-4 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl focus:ring-green-500 hover:scale-105`;

      case 'inline':
        return `${baseStyles} bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg focus:ring-green-500`;

      case 'icon':
        return `${baseStyles} bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg shadow-sm hover:shadow-md focus:ring-green-500`;

      default:
        return `${baseStyles} bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg focus:ring-green-500`;
    }
  };

  const WhatsAppIcon = () => (
    <svg
      className={`${variant === 'floating' ? 'w-6 h-6' : 'w-5 h-5'}`}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12.017 0c-6.624 0-12.017 5.393-12.017 12.017 0 2.122.575 4.116 1.574 5.835l-1.681 6.148 6.313-1.656c1.66.915 3.554 1.439 5.811 1.439 6.624 0 12.017-5.393 12.017-12.017s-5.393-12.017-12.017-12.017zm5.951 17.085c-.25.699-1.244 1.289-2.038 1.456-.553.115-1.277.21-3.714-.796-2.627-1.088-4.343-3.78-4.477-3.954-.134-.174-1.088-1.456-1.088-2.775 0-1.32.699-1.97.946-2.237.247-.267.537-.334.717-.334.18 0 .361.003.518.01.166.008.389-.063.607.463.248.603.85 2.07.925 2.222.074.15.124.33.025.537-.099.207-.149.335-.297.516-.149.18-.312.402-.446.54-.149.149-.303.31-.13.606.173.297.769 1.273 1.651 2.063 1.134.996 2.089 1.304 2.386 1.45.297.149.471.124.645-.074.174-.198.743-.866.941-1.163.198-.297.396-.248.668-.149.272.099 1.725.814 2.021.962.297.149.495.223.569.347.074.124.074.719-.174 1.418z" />
    </svg>
  );

  return (
    <>
      <button
        onClick={handleWhatsAppClick}
        className={`${getButtonStyles()} ${className}`}
        aria-label="Contact us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <WhatsAppIcon />
        {showText && variant !== 'icon' && variant !== 'floating' && (
          <span className="ml-2">WhatsApp</span>
        )}
        {variant === 'floating' && (
          <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            !
          </span>
        )}
      </button>

      {/* Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <WhatsAppIcon />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect via WhatsApp</h3>

                <p className="text-gray-600 mb-4">
                  We'll redirect you to WhatsApp to continue the conversation. This will open
                  WhatsApp in a new tab with a pre-filled message.
                </p>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700 font-medium mb-1">Preview message:</p>
                  <p className="text-sm text-gray-600 italic">"{message}"</p>
                </div>

                <div className="text-xs text-gray-500 mb-6">
                  By continuing, you agree to start a conversation with Wild West Construction via
                  WhatsApp. We respect your privacy and will only use your contact information to
                  respond to your inquiry.
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleConsentAccept}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Continue to WhatsApp
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
    </>
  );
};

export default WhatsAppButton;
