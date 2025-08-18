# SMS Integration Examples

This document provides practical examples of how to integrate the SMS functionality into different parts of the Wild West Construction website.

## Floating SMS Button (Already Implemented)

The floating SMS button is automatically available on all pages through the Layout component:

```tsx
// components/layout/Layout.tsx (already implemented)
<SmsButton variant="floating" />
```

This creates a blue floating button positioned at the bottom-right of the screen.

## Contact Section Integration

Add SMS as a contact option alongside phone and WhatsApp:

```tsx
// components/contact/ContactOptions.tsx
import { SmsButton } from '@/components/sms';
import { WhatsAppButton } from '@/components/whatsapp';

export default function ContactOptions() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>

      <div className="space-y-4">
        {/* Phone Call */}
        <a
          href="tel:+18016914065"
          className="flex items-center w-full p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.155 6.155l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Call Now</div>
            <div className="text-gray-600">(801) 691-4065</div>
          </div>
        </a>

        {/* SMS */}
        <div className="flex items-center w-full p-4 bg-blue-50 rounded-lg">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">Text Message</div>
            <div className="text-gray-600">Get a quick response via SMS</div>
          </div>
          <SmsButton
            variant="inline"
            showText={false}
            message="I'm interested in your construction services. Please text me back with more information about pricing and availability."
          />
        </div>

        {/* WhatsApp */}
        <div className="flex items-center w-full p-4 bg-green-50 rounded-lg">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0c-6.624 0-12.017 5.393-12.017 12.017 0 2.122.575 4.116 1.574 5.835l-1.681 6.148 6.313-1.656c1.66.915 3.554 1.439 5.811 1.439 6.624 0 12.017-5.393 12.017-12.017s-5.393-12.017-12.017-12.017z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">WhatsApp</div>
            <div className="text-gray-600">Chat with us on WhatsApp</div>
          </div>
          <WhatsAppButton variant="inline" showText={false} />
        </div>
      </div>
    </div>
  );
}
```

## Service Page Integration

Add SMS button to service pages for quick quotes:

```tsx
// app/demolition/page.tsx (or any service page)
import { SmsButton } from '@/components/sms';

export default function DemolitionPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Demolition Services</h1>

      {/* Service content */}
      <div className="mb-8">
        <p>Professional demolition services for residential and commercial properties...</p>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Get Your Demolition Quote</h2>
        <p className="text-gray-600 mb-6">
          Ready to start your demolition project? Text us your details and we'll send you a
          personalized quote within 24 hours.
        </p>

        <div className="flex flex-wrap gap-4">
          <SmsButton
            variant="inline"
            messageType="quote_request"
            templateData={{
              service: 'Demolition Services',
              name: 'Customer', // This would be dynamic in real implementation
            }}
            message="Hi! I'm interested in getting a quote for demolition services. Please text me back with pricing information and next steps."
          />

          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors">
            Call (801) 691-4065
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Lead Form Integration

Integrate SMS into lead capture forms:

```tsx
// components/forms/LeadFormSection.tsx
import { SmsButton } from '@/components/sms';
import { useState } from 'react';

export default function LeadFormSection() {
  const [leadId, setLeadId] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleFormSubmit = async (formData: any) => {
    // Submit lead form...
    const response = await submitLead(formData);
    setLeadId(response.leadId);
    setCustomerName(formData.name);
    setSelectedService(formData.service);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Lead form */}
      <form onSubmit={handleFormSubmit}>{/* Form fields... */}</form>

      {/* Success message with SMS option */}
      {leadId && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-2">
            Thanks for your interest, {customerName}!
          </h3>
          <p className="text-green-700 mb-4">
            We've received your request for {selectedService}. For faster service, you can also text
            us directly.
          </p>

          <SmsButton
            variant="inline"
            leadId={leadId}
            messageType="quote_request"
            templateData={{
              name: customerName,
              service: selectedService,
            }}
            message={`Hi! I just submitted a lead form for ${selectedService}. Please text me back with more information about the next steps and timeline.`}
          />
        </div>
      )}
    </div>
  );
}
```

## Mobile Footer Integration

Add SMS to the mobile footer for easy access:

```tsx
// components/layout/MobileFooter.tsx
import { SmsButton } from '@/components/sms';

export default function MobileFooter() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex justify-around items-center">
        {/* Call Button */}
        <a href="tel:+18016914065" className="flex flex-col items-center p-2 text-green-600">
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.155 6.155l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="text-xs">Call</span>
        </a>

        {/* SMS Button */}
        <div className="flex flex-col items-center">
          <SmsButton variant="icon" />
          <span className="text-xs text-blue-600 mt-1">Text</span>
        </div>

        {/* WhatsApp Button */}
        <div className="flex flex-col items-center">
          <WhatsAppButton variant="icon" />
          <span className="text-xs text-green-600 mt-1">WhatsApp</span>
        </div>

        {/* Email Button */}
        <a
          href="mailto:contact@wildwestconstruction.com"
          className="flex flex-col items-center p-2 text-gray-600"
        >
          <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <span className="text-xs">Email</span>
        </a>
      </div>
    </div>
  );
}
```

## Booking Confirmation Integration

Send SMS confirmations after successful bookings:

```tsx
// app/booking/confirmation/page.tsx
import { SmsButton } from '@/components/sms';
import { useEffect, useState } from 'react';

export default function BookingConfirmation({ bookingId }: { bookingId: number }) {
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    // Fetch booking details
    fetchBooking(bookingId).then(setBooking);
  }, [bookingId]);

  if (!booking) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">
            Your appointment is scheduled for {booking.date} at {booking.time}
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">Appointment Details</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div>Date: {booking.date}</div>
            <div>Time: {booking.time}</div>
            <div>Service: {booking.service}</div>
            <div>Location: {booking.address}</div>
          </div>
        </div>

        {/* SMS Options */}
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Stay Connected</h3>
          <p className="text-gray-600 mb-4">
            We'll send you a reminder, but you can also text us with any questions:
          </p>

          <div className="flex flex-wrap gap-4">
            <SmsButton
              variant="inline"
              leadId={booking.leadId}
              messageType="booking_confirmation"
              templateData={{
                name: booking.customerName,
                date: booking.date,
                time: booking.time,
              }}
              message={`Hi! I have an appointment scheduled for ${booking.date} at ${booking.time}. I wanted to confirm this is still good and ask if there's anything I should prepare.`}
            />

            <button
              onClick={() => window.print()}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Print Confirmation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Emergency/Urgent Service Integration

For urgent services, provide immediate SMS contact:

```tsx
// components/emergency/EmergencyContact.tsx
import { SmsButton } from '@/components/sms';

export default function EmergencyContact() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-red-900">Emergency Service</h3>
          <p className="text-red-700 mb-4">
            Need immediate assistance? Call us now or send an urgent text message.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+18016914065"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.155 6.155l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Call Emergency Line
            </a>

            <SmsButton
              variant="inline"
              className="bg-orange-600 hover:bg-orange-700"
              message="URGENT: I have a construction emergency and need immediate assistance. Please call me back ASAP."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Analytics Dashboard Integration

For admin users, display SMS analytics:

```tsx
// components/admin/SmsAnalytics.tsx
import { useEffect, useState } from 'react';
import { twilioService } from '@/lib/services';

export default function SmsAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const data = await twilioService.getSmsAnalytics();
      setAnalytics(data);
      setLoading(false);
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div>Loading SMS analytics...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">SMS Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{analytics.totalMessages}</div>
          <div className="text-sm text-blue-600">Total Messages</div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{analytics.deliveredMessages}</div>
          <div className="text-sm text-green-600">Delivered</div>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">{analytics.failedMessages}</div>
          <div className="text-sm text-red-600">Failed</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-600">
            ${(analytics.totalCost / 100).toFixed(2)}
          </div>
          <div className="text-sm text-gray-600">Total Cost</div>
        </div>
      </div>

      {/* Source breakdown */}
      <div>
        <h3 className="font-semibold mb-4">Messages by Source</h3>
        <div className="space-y-2">
          {Object.entries(analytics.bySource).map(([source, count]: [string, any]) => (
            <div key={source} className="flex justify-between items-center py-2 border-b">
              <span className="capitalize">{source}</span>
              <span className="font-medium">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

These examples show how to integrate SMS functionality throughout the Wild West Construction website, providing customers with multiple touchpoints to engage via text messaging while maintaining consistent branding and user experience.
