'use client';

import React from 'react';
import { LeadForm } from './LeadForm';

interface LeadFormSectionProps {
  cityDisplayName?: string;
  className?: string;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({
  cityDisplayName = 'Utah',
  className = '',
}) => {
  const handleLeadSubmission = async (data: any) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit lead: ${response.statusText}`);
      }

      console.log('Lead submitted successfully');
    } catch (error) {
      console.error('Error submitting lead:', error);
      throw error;
    }
  };

  return (
    <div className={className}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-4">Get a Free Estimate Today</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Ready to start your construction project in {cityDisplayName}? Contact us for a free,
          no-obligation estimate. We'll work with you to find the perfect solution for your needs
          and budget.
        </p>
      </div>
      <LeadForm onSubmit={handleLeadSubmission} className="max-w-2xl mx-auto" />
    </div>
  );
};

export default LeadFormSection;
