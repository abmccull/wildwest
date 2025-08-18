'use client';

import React, { useState } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQSectionProps {
  faqs?: FAQ[];
  title?: string;
  subtitle?: string;
  variant?: 'accordion' | 'grid' | 'list';
  searchable?: boolean;
  categorized?: boolean;
  defaultOpen?: string[]; // Array of FAQ IDs to open by default
  className?: string;
}

// Default FAQs for construction services
const defaultFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How do I get a quote for my project?',
    answer:
      "Getting a quote is easy! You can fill out our online form, call us directly, or text us. We'll schedule a free consultation to assess your project and provide a detailed estimate within 24 hours.",
    category: 'Getting Started',
  },
  {
    id: '2',
    question: 'Are you licensed and insured?',
    answer:
      "Yes, Wild West Construction is fully licensed, bonded, and insured. We carry comprehensive liability insurance and workers' compensation coverage for your protection and peace of mind.",
    category: 'Company Information',
  },
  {
    id: '3',
    question: 'What areas do you serve?',
    answer:
      'We proudly serve all of Salt Lake County, including Salt Lake City, West Valley City, Sandy, Draper, Murray, and surrounding communities. Contact us to confirm service in your specific area.',
    category: 'Service Areas',
  },
  {
    id: '4',
    question: 'How long does a typical project take?',
    answer:
      "Project timelines vary depending on the scope and complexity. Simple jobs like junk removal can be completed same-day, while flooring installation typically takes 2-7 days. We'll provide a detailed timeline with your quote.",
    category: 'Project Timeline',
  },
  {
    id: '5',
    question: 'Do you offer warranties on your work?',
    answer:
      'Absolutely! We stand behind our work with comprehensive warranties. Labor warranties range from 1-5 years depending on the service, and we honor all manufacturer warranties on materials.',
    category: 'Warranties',
  },
  {
    id: '6',
    question: 'What payment methods do you accept?',
    answer:
      'We accept cash, check, and all major credit cards. For larger projects, we offer flexible payment schedules with progress payments tied to project milestones.',
    category: 'Payment',
  },
  {
    id: '7',
    question: 'Do I need to be home during the work?',
    answer:
      "While it's not always required, we recommend being available for the initial walkthrough and final inspection. For ongoing work, you can arrange access that works best for your schedule.",
    category: 'Project Logistics',
  },
  {
    id: '8',
    question: 'What should I do to prepare for the project?',
    answer:
      "We'll provide a detailed preparation checklist with your project schedule. Generally, this includes clearing the work area, protecting valuables, and ensuring access to water and electricity.",
    category: 'Preparation',
  },
];

// Generate FAQ schema for SEO
export const generateFAQSchema = (faqs: FAQ[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs = defaultFAQs,
  title = 'Frequently Asked Questions',
  subtitle = 'Get answers to common questions about our services and process.',
  variant = 'accordion',
  searchable = false,
  categorized = false,
  defaultOpen = [],
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  // Filter FAQs based on search and category
  let filteredFAQs = faqs;

  if (searchTerm) {
    filteredFAQs = filteredFAQs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (categorized && selectedCategory !== 'all') {
    filteredFAQs = filteredFAQs.filter((faq) => faq.category === selectedCategory);
  }

  // Get unique categories
  const categories = Array.from(new Set(faqs.map((faq) => faq.category).filter(Boolean)));

  const renderAccordion = () => (
    <div className="space-y-4">
      {filteredFAQs.map((faq) => (
        <div key={faq.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <button
            onClick={() => toggleItem(faq.id)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            aria-expanded={openItems.has(faq.id)}
          >
            <h3 className="text-lg font-semibold text-text-dark pr-4">{faq.question}</h3>
            <svg
              className={`w-5 h-5 text-primary transition-transform flex-shrink-0 ${
                openItems.has(faq.id) ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openItems.has(faq.id) && (
            <div className="px-6 pb-6">
              <div className="pt-2 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                {faq.category && (
                  <span className="inline-block mt-3 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                    {faq.category}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredFAQs.map((faq) => (
        <div key={faq.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-text-dark mb-3">{faq.question}</h3>
          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          {faq.category && (
            <span className="inline-block mt-3 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
              {faq.category}
            </span>
          )}
        </div>
      ))}
    </div>
  );

  const renderList = () => (
    <div className="space-y-6">
      {filteredFAQs.map((faq) => (
        <div key={faq.id} className="pb-6 border-b border-gray-200 last:border-b-0">
          <h3 className="text-lg font-semibold text-text-dark mb-2">{faq.question}</h3>
          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          {faq.category && (
            <span className="inline-block mt-2 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
              {faq.category}
            </span>
          )}
        </div>
      ))}
    </div>
  );

  if (filteredFAQs.length === 0) {
    return (
      <div className={className}>
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-500">No FAQs match your search criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-text-dark mb-2">{title}</h2>
        {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
      </div>

      {/* Search and Filters */}
      {(searchable || categorized) && (
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          {searchable && (
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          )}

          {categorized && categories.length > 0 && (
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* FAQ Content */}
      {variant === 'accordion' && renderAccordion()}
      {variant === 'grid' && renderGrid()}
      {variant === 'list' && renderList()}

      {/* Call to Action */}
      <div className="mt-12 text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-text-dark mb-2">Still Have Questions?</h3>
        <p className="text-gray-600 mb-4">
          Our team is here to help! Contact us for personalized answers about your project.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="tel:+1234567890" className="btn-primary">
            Call Us Now
          </a>
          <a href="/contact" className="btn-secondary">
            Send Message
          </a>
        </div>
      </div>
    </div>
  );
};
