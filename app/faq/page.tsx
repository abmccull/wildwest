import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";

// FAQ data
const faqs = [
  {
    id: 1,
    question: "What areas do you serve in Utah?",
    answer:
      "We proudly serve the Salt Lake Valley and surrounding areas, including Salt Lake City, West Valley City, West Jordan, Sandy, Orem, Murray, Taylorsville, Ogden, Layton, Bountiful, Draper, Riverton, Roy, Pleasant Grove, and Cottonwood Heights. If you're outside these areas, give us a call - we may still be able to help!",
  },
  {
    id: 2,
    question: "Do you provide free estimates?",
    answer:
      "Yes! We provide free, detailed estimates for all our services. Our team will assess your project, discuss your needs, and provide a comprehensive quote with no obligations. Estimates are typically provided within 24-48 hours of your initial contact.",
  },
  {
    id: 3,
    question: "Are you licensed and insured?",
    answer:
      "Absolutely. Wild West Construction is fully licensed, bonded, and insured. We carry general liability insurance up to $1,000,000 and workers' compensation insurance for all our employees. Our Utah contractor's license is always in good standing, and we're bonded for your protection.",
  },
  {
    id: 4,
    question: "What types of flooring do you install?",
    answer:
      "We install all types of flooring including hardwood, laminate, vinyl plank, tile, carpet, and luxury vinyl tile (LVT). We also provide flooring repair, refinishing, and subfloor preparation. Our team has experience with both residential and commercial flooring projects.",
  },
  {
    id: 5,
    question: "How long does a typical flooring project take?",
    answer:
      "Project timelines vary depending on size and complexity. A typical residential room (200-300 sq ft) usually takes 1-2 days. Larger projects or those requiring subfloor work may take 3-5 days. We'll provide a detailed timeline with your estimate and keep you informed throughout the process.",
  },
  {
    id: 6,
    question: "What demolition services do you offer?",
    answer:
      "We handle interior and exterior demolition for residential and commercial properties. This includes room demolition, wall removal, kitchen and bathroom tear-outs, deck removal, shed demolition, and complete structure demolition. We also handle safe removal of hazardous materials when properly certified.",
  },
  {
    id: 7,
    question: "Do you handle junk removal for construction debris?",
    answer:
      "Yes, we provide comprehensive junk removal services including construction debris, old appliances, furniture, yard waste, and general household items. We focus on eco-friendly disposal methods and recycle materials whenever possible. Same-day service is often available.",
  },
  {
    id: 8,
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, checks, and all major credit cards (Visa, MasterCard, American Express, Discover). For larger projects, we can discuss payment plans or financing options. Payment terms are outlined in your service agreement, and we never require full payment upfront.",
  },
  {
    id: 9,
    question: "Do you offer warranties on your work?",
    answer:
      "Yes, we stand behind our work with comprehensive warranties. Most services include a 1-year workmanship warranty, while flooring installations come with a 2-year workmanship warranty. Materials are covered by manufacturer warranties, and we'll assist with any warranty claims.",
  },
  {
    id: 10,
    question: "Can you work around my schedule?",
    answer:
      "We understand that home improvement projects can be disruptive. We offer flexible scheduling including evening and weekend work when possible. We'll work with you to minimize disruption to your daily routine and complete projects efficiently.",
  },
  {
    id: 12,
    question: "What happens if there are unexpected issues during the project?",
    answer:
      "If we discover unexpected issues (like structural problems or plumbing issues), we'll stop work and discuss options with you immediately. We'll provide detailed explanations and cost estimates for any additional work needed. No additional work is performed without your written approval.",
  },
  {
    id: 13,
    question: "How do you handle cleanup after projects?",
    answer:
      "Complete cleanup is included in all our projects. We protect your existing surfaces during work and thoroughly clean the area when we're finished. This includes removing all debris, vacuuming, and leaving your space ready to use. We take pride in leaving your home cleaner than we found it.",
  },
  {
    id: 14,
    question: "Can you help with design and material selection?",
    answer:
      "While we're primarily contractors, our team has extensive experience with different materials and can provide recommendations based on your budget, lifestyle, and preferences. We can also refer you to trusted designers and help coordinate with them to bring your vision to life.",
  },
  {
    id: 15,
    question:
      "What makes Wild West Construction different from other contractors?",
    answer:
      "We combine old-fashioned craftsmanship with modern techniques and customer service. We're locally owned and operated, which means we're invested in our community. Our team is reliable, communicative, and focused on exceeding expectations. We also offer 24/7 emergency services and stand behind our work with comprehensive warranties.",
  },
];

// This would normally be in the parent component, but Next.js requires metadata export at page level
export const metadata: Metadata = {
  title: "Frequently Asked Questions | Wild West Construction",
  description:
    "Get answers to common questions about Wild West Construction's flooring, demolition, and junk removal services in Utah. Licensed and insured contractors.",
  keywords:
    "FAQ, Wild West Construction, Utah contractor questions, flooring FAQ, demolition questions, construction services Utah",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://wildwestslc.com/faq",
  },
  openGraph: {
    title: "FAQ | Wild West Construction",
    description:
      "Answers to common questions about our construction services in Utah.",
    url: "https://wildwestslc.com/faq",
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-blue-100">
              Find answers to common questions about our construction services.
              Can&apos;t find what you&apos;re looking for? Give us a call!
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        {/* Still Have Questions Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our friendly team is here to help! Contact us for personalized
              answers about your specific project needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Call Us
                </h3>
                <p className="text-gray-600 mb-3">
                  Speak directly with our team for immediate answers.
                </p>
                <a
                  href="tel:+1-801-691-4065"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  (801) 691-4065
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Email Us
                </h3>
                <p className="text-gray-600 mb-3">
                  Send us your questions and we&apos;ll respond quickly.
                </p>
                <a
                  href="mailto:info@wildwestslc.com"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  info@wildwestslc.com
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Get Quote
                </h3>
                <p className="text-gray-600 mb-3">
                  Request a free estimate for your project.
                </p>
                <a
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Free Estimate
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/contact"
                className="btn-primary inline-block text-center"
              >
                Get Free Estimate
              </a>
              <a
                href="tel:+1-801-691-4065"
                className="btn-outline inline-block text-center"
              >
                Call (801) 691-4065
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Structured Data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
