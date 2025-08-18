import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WhatsAppButton } from '@/components/whatsapp/WhatsAppButton';

// Mock the analytics service
jest.mock('@/lib/services/analytics.service', () => ({
  analyticsService: {
    trackEvent: jest.fn().mockResolvedValue(true),
  },
}));

// Mock window.open
const mockWindowOpen = jest.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockWindowOpen,
});

// Mock localStorage
const mockLocalStorage: { [key: string]: string } = {};
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn((key: string) => mockLocalStorage[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      mockLocalStorage[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete mockLocalStorage[key];
    }),
    clear: jest.fn(() => {
      Object.keys(mockLocalStorage).forEach((key) => delete mockLocalStorage[key]);
    }),
  },
});

// Mock fetch
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => ({ success: true }),
});

describe('WhatsAppButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.keys(mockLocalStorage).forEach((key) => delete mockLocalStorage[key]);
    mockWindowOpen.mockClear();
  });

  describe('Component Rendering', () => {
    it('renders with default props', () => {
      render(<WhatsAppButton />);
      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      expect(button).toBeInTheDocument();
    });

    it('renders with custom message and phone number', () => {
      const customPhone = '+1987654321';
      const customMessage = 'Custom test message';

      render(<WhatsAppButton phoneNumber={customPhone} message={customMessage} />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      expect(button).toBeInTheDocument();
    });

    it('renders inline variant with text', () => {
      render(<WhatsAppButton variant="inline" showText={true} />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      expect(button).toBeInTheDocument();
      expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    });

    it('renders icon variant without text', () => {
      render(<WhatsAppButton variant="icon" />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      expect(button).toBeInTheDocument();
      expect(screen.queryByText('WhatsApp')).not.toBeInTheDocument();
    });

    it('renders floating variant with notification indicator', () => {
      render(<WhatsAppButton variant="floating" />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      expect(button).toBeInTheDocument();

      // Check for notification indicator
      expect(screen.getByText('!')).toBeInTheDocument();
    });
  });

  describe('User Consent Flow', () => {
    it('shows consent modal on first click', async () => {
      render(<WhatsAppButton />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Connect via WhatsApp')).toBeInTheDocument();
        expect(screen.getByText(/we'll redirect you to whatsapp/i)).toBeInTheDocument();
      });
    });

    it('does not show consent modal if user has already consented', () => {
      // Simulate user has already given consent
      mockLocalStorage['whatsapp_consent'] = 'true';

      render(<WhatsAppButton />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      // Should not show consent modal
      expect(screen.queryByText('Connect via WhatsApp')).not.toBeInTheDocument();

      // Should directly open WhatsApp
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('https://wa.me/'),
        '_blank'
      );
    });

    it('handles consent acceptance correctly', async () => {
      render(<WhatsAppButton />);

      // Click WhatsApp button to show consent modal
      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Connect via WhatsApp')).toBeInTheDocument();
      });

      // Click accept consent
      const acceptButton = screen.getByText('Continue to WhatsApp');
      fireEvent.click(acceptButton);

      await waitFor(() => {
        // Consent should be stored
        expect(mockLocalStorage['whatsapp_consent']).toBe('true');

        // WhatsApp should open
        expect(mockWindowOpen).toHaveBeenCalledWith(
          expect.stringContaining('https://wa.me/'),
          '_blank'
        );

        // Modal should close
        expect(screen.queryByText('Connect via WhatsApp')).not.toBeInTheDocument();
      });
    });

    it('handles consent decline correctly', async () => {
      render(<WhatsAppButton />);

      // Click WhatsApp button to show consent modal
      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Connect via WhatsApp')).toBeInTheDocument();
      });

      // Click decline consent
      const declineButton = screen.getByText('Cancel');
      fireEvent.click(declineButton);

      await waitFor(() => {
        // Consent should not be stored
        expect(mockLocalStorage['whatsapp_consent']).toBeUndefined();

        // WhatsApp should not open
        expect(mockWindowOpen).not.toHaveBeenCalled();

        // Modal should close
        expect(screen.queryByText('Connect via WhatsApp')).not.toBeInTheDocument();
      });
    });
  });

  describe('WhatsApp URL Generation', () => {
    it('generates correct WhatsApp URL with default values', async () => {
      mockLocalStorage['whatsapp_consent'] = 'true';

      render(<WhatsAppButton />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          expect.stringContaining('https://wa.me/1234567890?text='),
          '_blank'
        );
      });
    });

    it('generates correct WhatsApp URL with custom values', async () => {
      mockLocalStorage['whatsapp_consent'] = 'true';

      const customPhone = '+1987654321';
      const customMessage = 'Custom test message';

      render(<WhatsAppButton phoneNumber={customPhone} message={customMessage} />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          'https://wa.me/1987654321?text=Custom%20test%20message',
          '_blank'
        );
      });
    });

    it('strips non-numeric characters from phone number', async () => {
      mockLocalStorage['whatsapp_consent'] = 'true';

      render(<WhatsAppButton phoneNumber="+1 (987) 654-3210" />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          expect.stringContaining('https://wa.me/19876543210'),
          '_blank'
        );
      });
    });
  });

  describe('Analytics Tracking', () => {
    it('tracks consent given event', async () => {
      const { analyticsService } = require('@/lib/services/analytics.service');

      render(<WhatsAppButton variant="inline" />);

      // Show consent modal
      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Connect via WhatsApp')).toBeInTheDocument();
      });

      // Accept consent
      const acceptButton = screen.getByText('Continue to WhatsApp');
      fireEvent.click(acceptButton);

      await waitFor(() => {
        expect(analyticsService.trackEvent).toHaveBeenCalledWith('whatsapp_consent_given', {
          variant: 'inline',
        });
      });
    });

    it('tracks consent declined event', async () => {
      const { analyticsService } = require('@/lib/services/analytics.service');

      render(<WhatsAppButton variant="floating" />);

      // Show consent modal
      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText('Connect via WhatsApp')).toBeInTheDocument();
      });

      // Decline consent
      const declineButton = screen.getByText('Cancel');
      fireEvent.click(declineButton);

      await waitFor(() => {
        expect(analyticsService.trackEvent).toHaveBeenCalledWith('whatsapp_consent_declined', {
          variant: 'floating',
        });
      });
    });

    it('tracks WhatsApp click event', async () => {
      const { analyticsService } = require('@/lib/services/analytics.service');
      mockLocalStorage['whatsapp_consent'] = 'true';

      render(<WhatsAppButton variant="icon" />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(analyticsService.trackEvent).toHaveBeenCalledWith(
          'whatsapp_clicked',
          expect.objectContaining({
            variant: 'icon',
            has_consent: true,
          })
        );
      });
    });

    it('makes API call to track WhatsApp usage', async () => {
      mockLocalStorage['whatsapp_consent'] = 'true';

      render(<WhatsAppButton />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/whatsapp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            utm_params: {},
            page_path: undefined,
            consent: true,
          }),
        });
      });
    });
  });

  describe('Error Handling', () => {
    it('opens WhatsApp even if analytics tracking fails', async () => {
      const { analyticsService } = require('@/lib/services/analytics.service');
      analyticsService.trackEvent.mockRejectedValue(new Error('Analytics failed'));

      mockLocalStorage['whatsapp_consent'] = 'true';

      render(<WhatsAppButton />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          expect.stringContaining('https://wa.me/'),
          '_blank'
        );
      });
    });

    it('opens WhatsApp even if API call fails', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('API failed'));
      mockLocalStorage['whatsapp_consent'] = 'true';

      render(<WhatsAppButton />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockWindowOpen).toHaveBeenCalledWith(
          expect.stringContaining('https://wa.me/'),
          '_blank'
        );
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<WhatsAppButton />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      expect(button).toHaveAttribute('aria-label', 'Contact us on WhatsApp');
      expect(button).toHaveAttribute('title', 'Chat with us on WhatsApp');
    });

    it('supports keyboard navigation', () => {
      render(<WhatsAppButton />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      button.focus();

      expect(button).toHaveFocus();
    });

    it('properly manages modal focus when consent dialog opens', async () => {
      render(<WhatsAppButton />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      fireEvent.click(button);

      await waitFor(() => {
        const modal = screen.getByText('Connect via WhatsApp');
        expect(modal).toBeInTheDocument();

        // Modal should contain focusable elements
        const acceptButton = screen.getByText('Continue to WhatsApp');
        const declineButton = screen.getByText('Cancel');

        expect(acceptButton).toBeInTheDocument();
        expect(declineButton).toBeInTheDocument();
      });
    });
  });

  describe('Component Variants', () => {
    it('applies correct CSS classes for floating variant', () => {
      render(<WhatsAppButton variant="floating" />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      expect(button).toHaveClass('fixed', 'bottom-20', 'right-4', 'z-40');
    });

    it('applies correct CSS classes for inline variant', () => {
      render(<WhatsAppButton variant="inline" />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      expect(button).toHaveClass('px-6', 'py-3', 'rounded-lg');
    });

    it('applies correct CSS classes for icon variant', () => {
      render(<WhatsAppButton variant="icon" />);

      const button = screen.getByRole('button', { name: /contact us on whatsapp/i });
      expect(button).toHaveClass('p-2', 'rounded-lg');
    });
  });
});
