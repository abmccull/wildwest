'use client';

import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile: {
      render: (element: string | HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
  }
}

interface TurnstileOptions {
  sitekey: string;
  callback?: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  'timeout-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  size?: 'normal' | 'compact';
  retry?: 'auto' | 'never';
  'retry-interval'?: number;
  'refresh-expired'?: 'auto' | 'manual' | 'never';
}

interface TurnstileWidgetProps {
  siteKey?: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  onTimeout?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  className?: string;
  id?: string;
}

const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
const DEFAULT_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'; // Demo key

export const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({
  siteKey = DEFAULT_SITE_KEY,
  onVerify,
  onError,
  onExpire,
  onTimeout,
  theme = 'auto',
  size = 'normal',
  className = '',
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load Turnstile script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.turnstile) {
      const script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT_URL;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        setIsLoaded(true);
      };

      script.onerror = () => {
        setError('Failed to load Turnstile script');
        console.error('Failed to load Turnstile script');
      };

      document.head.appendChild(script);
    } else if (window.turnstile) {
      setIsLoaded(true);
    }
  }, []);

  // Render widget when script is loaded
  useEffect(() => {
    if (isLoaded && containerRef.current && !widgetId && window.turnstile) {
      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            setIsVerified(true);
            setError(null);
            onVerify(token);
          },
          'error-callback': () => {
            setError('Verification failed');
            setIsVerified(false);
            onError?.();
          },
          'expired-callback': () => {
            setError('Verification expired');
            setIsVerified(false);
            onExpire?.();
          },
          'timeout-callback': () => {
            setError('Verification timed out');
            setIsVerified(false);
            onTimeout?.();
          },
          theme,
          size,
          retry: 'auto',
          'retry-interval': 8000,
          'refresh-expired': 'auto',
        });

        setWidgetId(id);
      } catch (err) {
        console.error('Error rendering Turnstile widget:', err);
        setError('Failed to render verification widget');
      }
    }
  }, [isLoaded, siteKey, onVerify, onError, onExpire, onTimeout, theme, size]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch (err) {
          console.error('Error removing Turnstile widget:', err);
        }
      }
    };
  }, [widgetId]);

  const reset = () => {
    if (widgetId && window.turnstile) {
      try {
        window.turnstile.reset(widgetId);
        setIsVerified(false);
        setError(null);
      } catch (err) {
        console.error('Error resetting Turnstile widget:', err);
      }
    }
  };

  const getResponse = (): string | null => {
    if (widgetId && window.turnstile) {
      try {
        return window.turnstile.getResponse(widgetId);
      } catch (err) {
        console.error('Error getting Turnstile response:', err);
      }
    }
    return null;
  };

  // Expose methods via ref if needed
  // Note: To use useImperativeHandle, the component needs to be wrapped with forwardRef
  // Currently these methods are not exposed via ref

  if (!siteKey) {
    return (
      <div className={`p-4 bg-yellow-50 border border-yellow-200 rounded-lg ${className}`}>
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <span className="text-sm text-yellow-700">Turnstile verification not configured</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm text-red-700">{error}</span>
          </div>
          <button
            onClick={reset}
            className="text-sm text-red-600 hover:text-red-800 focus:outline-none focus:underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`p-4 bg-gray-50 border border-gray-200 rounded-lg ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span className="text-sm text-gray-600">Loading verification...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`turnstile-container ${className}`}>
      <div ref={containerRef} id={id} className="flex justify-center" />

      {isVerified && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-green-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Verification successful</span>
        </div>
      )}
    </div>
  );
};

export default TurnstileWidget;
