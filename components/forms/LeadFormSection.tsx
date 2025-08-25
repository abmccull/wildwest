'use client';

import React from 'react';
import { LeadForm } from './LeadForm';

interface LeadFormSectionProps {
  cityDisplayName?: string;
  className?: string;
  serviceData?: any;
  enhancedContent?: any;
  ctaText?: string;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({
  cityDisplayName = 'Utah',
  className = '',
  serviceData,
  enhancedContent,
  ctaText,
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
      {/* Service Info Grid - only show if enhanced content exists */}
      {enhancedContent && (
        <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {enhancedContent.priceRange}
            </div>
            <div className="text-sm text-gray-600">Typical Investment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {enhancedContent.timeline}
            </div>
            <div className="text-sm text-gray-600">Project Timeline</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {enhancedContent.warranty}
            </div>
            <div className="text-sm text-gray-600">Warranty Coverage</div>
          </div>
        </div>
      )}
      
      {/* CTA Text */}
      <div className="text-center mb-8">
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          {ctaText ||
            (serviceData
              ? `Contact us today for your free ${serviceData.keyword?.toLowerCase()} estimate in ${cityDisplayName}. We'll provide a detailed quote and answer any questions you have about your project.`
              : `Ready to start your construction project in ${cityDisplayName}? Contact Wild West Construction at (801) 691-4065 or email info@wildwestslc.com for a free estimate!`)}
        </p>
      </div>
      
      <LeadForm onSubmit={handleLeadSubmission} className="max-w-2xl mx-auto" />
    </div>
  );
};

export default LeadFormSection;
