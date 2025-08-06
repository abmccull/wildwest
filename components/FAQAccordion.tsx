"use client";

import { useState } from "react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div 
          key={faq.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
        >
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
            onClick={() => toggleFAQ(faq.id)}
            aria-expanded={openFAQ === faq.id}
          >
            <h3 className="text-lg font-semibold text-gray-900 pr-4">
              {faq.question}
            </h3>
            <div className="flex-shrink-0">
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                  openFAQ === faq.id ? "rotate-180" : ""
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
            </div>
          </button>
          
          {openFAQ === faq.id && (
            <div className="px-6 pb-4">
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}