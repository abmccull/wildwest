'use client';

import React, { useState, useEffect } from 'react';
import { analyticsService } from '@/lib/services';

interface TimeSlot {
  time: string;
  available: boolean;
  buffer?: string; // Travel buffer information
}

interface BookingWidgetProps {
  variant?: 'inline' | 'floating' | 'modal';
  eventType?: 'estimate' | 'measurement' | 'site_visit' | 'junk_pickup';
  className?: string;
  onBookingComplete?: (booking: any) => void;
}

const EVENT_TYPES = {
  estimate: { label: 'Free Estimate', duration: 60, color: 'blue' },
  measurement: { label: 'Property Measurement', duration: 30, color: 'green' },
  site_visit: { label: 'Site Visit', duration: 120, color: 'purple' },
  junk_pickup: { label: 'Junk Pickup Window', duration: 120, color: 'orange' },
};

const BUSINESS_HOURS = {
  start: 8, // 8 AM
  end: 18, // 6 PM
  days: [1, 2, 3, 4, 5, 6], // Monday to Saturday (0 = Sunday)
};

const TRAVEL_BUFFER = 30; // 30 minutes between appointments

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  variant = 'inline',
  eventType = 'estimate',
  className = '',
  onBookingComplete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'date' | 'time' | 'details' | 'confirm'>('date');

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const eventConfig = EVENT_TYPES[eventType];

  // Generate available dates (next 30 days, excluding Sundays)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip Sundays (day 0)
      if (BUSINESS_HOURS.days.includes(date.getDay())) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          }),
          disabled: false,
        });
      }
    }

    return dates;
  };

  // Generate time slots for a date
  const generateTimeSlots = (date: string): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const selectedDateObj = new Date(date + 'T00:00:00');

    // Generate slots from business hours
    for (let hour = BUSINESS_HOURS.start; hour < BUSINESS_HOURS.end; hour++) {
      // Generate 30-minute slots
      for (let minute = 0; minute < 60; minute += 30) {
        const timeSlot = new Date(selectedDateObj);
        timeSlot.setHours(hour, minute, 0, 0);

        // Check if slot fits within business hours (considering duration)
        const endTime = new Date(timeSlot);
        endTime.setMinutes(endTime.getMinutes() + eventConfig.duration);

        if (endTime.getHours() <= BUSINESS_HOURS.end) {
          slots.push({
            time: timeSlot.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            }),
            available: true, // Will be checked against API
            buffer: minute === 0 ? undefined : `+${TRAVEL_BUFFER}min buffer`,
          });
        }
      }
    }

    return slots;
  };

  // Fetch availability from API
  const fetchAvailability = async (date: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/booking/availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          eventType,
          duration: eventConfig.duration,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch availability');
      }

      const data = await response.json();

      // Update slots with availability data
      const generatedSlots = generateTimeSlots(date);
      const updatedSlots = generatedSlots.map((slot) => ({
        ...slot,
        available: data.availableSlots?.includes(slot.time) ?? true,
      }));

      setAvailableSlots(updatedSlots);

      // Track availability check
      analyticsService
        .trackCustomEvent('booking_availability_checked', {
          date,
          event_type: eventType,
          available_slots: updatedSlots.filter((s) => s.available).length,
        })
        .catch(console.error);
    } catch (error) {
      console.error('Error fetching availability:', error);
      // Fallback to generated slots
      setAvailableSlots(generateTimeSlots(date));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
    fetchAvailability(date);
    setStep('time');
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('details');
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookingData = {
        ...formData,
        date: selectedDate,
        time: selectedTime,
        eventType,
        duration: eventConfig.duration,
      };

      // Track booking attempt
      analyticsService
        .trackCustomEvent('booking_attempted', {
          event_type: eventType,
          date: selectedDate,
          time: selectedTime,
        })
        .catch(console.error);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const result = await response.json();

      // Track successful booking
      analyticsService
        .trackCustomEvent('booking_completed', {
          event_type: eventType,
          booking_id: result.data?.id,
          date: selectedDate,
          time: selectedTime,
        })
        .catch(console.error);

      setStep('confirm');
      onBookingComplete?.(result.data);
    } catch (error) {
      console.error('Booking error:', error);
      alert(
        'Sorry, there was an error creating your booking. Please try again or contact us directly.'
      );

      // Track booking error
      analyticsService
        .trackCustomEvent('booking_error', {
          event_type: eventType,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
        .catch(console.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetBooking = () => {
    setStep('date');
    setSelectedDate('');
    setSelectedTime('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
    });
    setIsOpen(false);
  };

  const availableDates = getAvailableDates();

  const renderWidget = () => (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Schedule Your {eventConfig.label}</h3>
        <p className="text-gray-600">
          Book a convenient time for your {eventConfig.label.toLowerCase()}. Duration:{' '}
          {eventConfig.duration} minutes
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span className={step === 'date' ? 'text-primary font-medium' : ''}>Date</span>
          <span className={step === 'time' ? 'text-primary font-medium' : ''}>Time</span>
          <span className={step === 'details' ? 'text-primary font-medium' : ''}>Details</span>
          <span className={step === 'confirm' ? 'text-primary font-medium' : ''}>Confirm</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{
              width:
                step === 'date'
                  ? '25%'
                  : step === 'time'
                    ? '50%'
                    : step === 'details'
                      ? '75%'
                      : '100%',
            }}
          />
        </div>
      </div>

      {/* Date Selection */}
      {step === 'date' && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Select a Date</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableDates.map((date) => (
              <button
                key={date.value}
                onClick={() => handleDateSelect(date.value)}
                disabled={date.disabled}
                className="p-3 text-sm border border-gray-300 rounded-lg hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
              >
                {date.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Time Selection */}
      {step === 'time' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">
              Select a Time for {new Date(selectedDate).toLocaleDateString()}
            </h4>
            <button
              onClick={() => setStep('date')}
              className="text-sm text-primary hover:text-primary/80 focus:outline-none"
            >
              Change Date
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-2 text-gray-600">Checking availability...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                  className={`p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                    slot.available
                      ? 'border-gray-300 hover:border-primary hover:bg-primary/5'
                      : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                  title={slot.buffer}
                >
                  {slot.time}
                  {slot.buffer && <div className="text-xs text-gray-500 mt-1">{slot.buffer}</div>}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Details Form */}
      {step === 'details' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Your Details</h4>
            <button
              onClick={() => setStep('time')}
              className="text-sm text-primary hover:text-primary/80 focus:outline-none"
            >
              Change Time
            </button>
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>{eventConfig.label}</strong> on {new Date(selectedDate).toLocaleDateString()}{' '}
              at {selectedTime}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Street address, city, zip code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-vertical"
                placeholder="Tell us about your project or any special requirements..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      )}

      {/* Confirmation */}
      {step === 'confirm' && (
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
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
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h4>
            <p className="text-gray-600 mb-4">
              Your {eventConfig.label.toLowerCase()} has been scheduled for{' '}
              {new Date(selectedDate).toLocaleDateString()} at {selectedTime}.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              You'll receive a confirmation email and calendar invite shortly. We'll also send you a
              reminder 24 hours before your appointment.
            </p>
          </div>

          <div className="space-y-2">
            <button
              onClick={resetBooking}
              className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              Book Another Appointment
            </button>

            <p className="text-xs text-gray-500">Need to reschedule? Call us at (555) 123-4567</p>
          </div>
        </div>
      )}
    </div>
  );

  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-4 left-4 z-40 ${className}`}>
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(true);
              analyticsService
                .trackCustomEvent('booking_widget_opened', { variant })
                .catch(console.error);
            }}
            className="bg-primary text-white px-4 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 hover:scale-105"
          >
            📅 Book Appointment
          </button>
        )}

        {isOpen && (
          <div className="w-80 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Quick Booking</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                ✕
              </button>
            </div>
            {renderWidget()}
          </div>
        )}
      </div>
    );
  }

  return <div className={`w-full max-w-2xl ${className}`}>{renderWidget()}</div>;
};

export default BookingWidget;
