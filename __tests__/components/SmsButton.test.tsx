import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SmsButton } from '@/components/sms/SmsButton';

// Mock analytics service
jest.mock('@/lib/services/analytics.service', () => ({
  analyticsService: {
    trackCustomEvent: jest.fn().mockResolvedValue(true),
  },
}));

// Mock console.error to reduce noise in tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Mock fetch
global.fetch = jest.fn();

describe('SmsButton', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
    // Clear fetch mock
    (fetch as jest.Mock).mockClear();
  });

  it('renders SMS button with default props', () => {
    render(<SmsButton />);

    const button = screen.getByRole('button', { name: /contact us via sms/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('title', 'Send us a text message');
  });

  it('shows consent modal on first click when user has not consented', () => {
    render(<SmsButton />);

    const button = screen.getByRole('button', { name: /contact us via sms/i });
    fireEvent.click(button);

    expect(screen.getByText('Send SMS Message')).toBeInTheDocument();
    expect(screen.getByText(/By continuing, you consent/i)).toBeInTheDocument();
  });

  it('shows SMS modal directly if user has already consented', () => {
    // Simulate user has already given consent
    localStorage.setItem('sms_consent', 'true');

    render(<SmsButton />);

    const button = screen.getByRole('button', { name: /contact us via sms/i });
    fireEvent.click(button);

    // Should skip consent modal and go directly to SMS modal
    expect(screen.getByText('Your Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Your Message')).toBeInTheDocument();
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<SmsButton variant="inline" showText={true} />);
    expect(screen.getByText('Text Us')).toBeInTheDocument();

    rerender(<SmsButton variant="icon" />);
    expect(screen.queryByText('Text Us')).not.toBeInTheDocument();

    rerender(<SmsButton variant="floating" />);
    expect(screen.getByText('SMS')).toBeInTheDocument();
  });

  it('handles consent acceptance correctly', async () => {
    render(<SmsButton />);

    // Click button to show consent modal
    const button = screen.getByRole('button', { name: /contact us via sms/i });
    fireEvent.click(button);

    // Accept consent
    const continueButton = screen.getByRole('button', { name: /continue/i });
    fireEvent.click(continueButton);

    // Should show SMS modal
    await waitFor(() => {
      expect(screen.getByText('Your Phone Number')).toBeInTheDocument();
    });

    // Check that consent was stored
    expect(localStorage.getItem('sms_consent')).toBe('true');
  });

  it('handles consent decline correctly', () => {
    render(<SmsButton />);

    // Click button to show consent modal
    const button = screen.getByRole('button', { name: /contact us via sms/i });
    fireEvent.click(button);

    // Decline consent
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Modal should close
    expect(screen.queryByText('Send SMS Message')).not.toBeInTheDocument();

    // Consent should not be stored
    expect(localStorage.getItem('sms_consent')).toBeNull();
  });

  it('validates phone number input', async () => {
    localStorage.setItem('sms_consent', 'true');
    render(<SmsButton />);

    // Click button to show SMS modal
    const button = screen.getByRole('button', { name: /contact us via sms/i });
    fireEvent.click(button);

    // Try to send without phone number
    const sendButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter your phone number')).toBeInTheDocument();
    });
  });

  it('validates message input', async () => {
    localStorage.setItem('sms_consent', 'true');
    render(<SmsButton />);

    // Click button to show SMS modal
    const button = screen.getByRole('button', { name: /contact us via sms/i });
    fireEvent.click(button);

    // Enter phone but clear message
    const phoneInput = screen.getByLabelText(/your phone number/i);
    const messageInput = screen.getByLabelText(/your message/i);

    fireEvent.change(phoneInput, { target: { value: '5551234567' } });
    fireEvent.change(messageInput, { target: { value: '' } });

    // Try to send
    const sendButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a message')).toBeInTheDocument();
    });
  });

  it('shows character counter', () => {
    localStorage.setItem('sms_consent', 'true');
    render(<SmsButton message="Test message" />);

    // Click button to show SMS modal
    const button = screen.getByRole('button', { name: /contact us via sms/i });
    fireEvent.click(button);

    // Should show character counter
    expect(screen.getByText(/\/1600 characters/)).toBeInTheDocument();
  });

  it('handles successful SMS send', async () => {
    localStorage.setItem('sms_consent', 'true');

    // Mock successful API response
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: true,
          messageId: 'test-message-id',
          interactionId: 123,
        }),
    });

    render(<SmsButton />);

    // Click button to show SMS modal
    const button = screen.getByRole('button', { name: /contact us via sms/i });
    fireEvent.click(button);

    // Fill in form
    const phoneInput = screen.getByLabelText(/your phone number/i);
    const messageInput = screen.getByLabelText(/your message/i);

    fireEvent.change(phoneInput, { target: { value: '5551234567' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    // Send message
    const sendButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(sendButton);

    // Should show success state
    await waitFor(() => {
      expect(screen.getByText('Message Sent!')).toBeInTheDocument();
    });
  });

  it('handles failed SMS send', async () => {
    localStorage.setItem('sms_consent', 'true');

    // Mock failed API response
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: false,
          error: 'Invalid phone number',
        }),
    });

    render(<SmsButton />);

    // Click button to show SMS modal
    const button = screen.getByRole('button', { name: /contact us via sms/i });
    fireEvent.click(button);

    // Fill in form
    const phoneInput = screen.getByLabelText(/your phone number/i);
    const messageInput = screen.getByLabelText(/your message/i);

    fireEvent.change(phoneInput, { target: { value: '123' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    // Send message
    const sendButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(sendButton);

    // Should show error message
    await waitFor(() => {
      expect(screen.getByText('Invalid phone number')).toBeInTheDocument();
    });
  });

  it('handles network errors gracefully', async () => {
    localStorage.setItem('sms_consent', 'true');

    // Mock network error
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<SmsButton />);

    // Click button to show SMS modal
    const button = screen.getByRole('button', { name: /contact us via sms/i });
    fireEvent.click(button);

    // Fill in form
    const phoneInput = screen.getByLabelText(/your phone number/i);
    const messageInput = screen.getByLabelText(/your message/i);

    fireEvent.change(phoneInput, { target: { value: '5551234567' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    // Send message
    const sendButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(sendButton);

    // Should show network error message
    await waitFor(() => {
      expect(screen.getByText('Network error. Please try again.')).toBeInTheDocument();
    });
  });
});
