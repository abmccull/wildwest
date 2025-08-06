import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "About Wild West Construction | 15+ Years of Excellence in Utah",
  description:
    "Learn about Wild West Construction, Utah's premier family-owned construction company with 15+ years of experience. Licensed & insured contractors serving all of Salt Lake County with quality craftsmanship.",
  openGraph: {
    title: "About Wild West Construction | 15+ Years of Excellence in Utah",
    description:
      "Learn about Wild West Construction, Utah's premier family-owned construction company with 15+ years of experience. Licensed & insured contractors serving all of Salt Lake County with quality craftsmanship.",
    url: "https://wildwestslc.com/about",
    siteName: "Wild West Construction",
    images: [
      {
        url: "https://wildwestslc.com/images/about-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Wild West Construction team showcasing 15+ years of experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Wild West Construction | 15+ Years of Excellence in Utah",
    description:
      "Learn about Wild West Construction, Utah's premier family-owned construction company with 15+ years of experience. Licensed & insured contractors serving all of Salt Lake County with quality craftsmanship.",
    images: ["https://wildwestslc.com/images/about-hero.jpg"],
  },
  alternates: {
    canonical: "https://wildwestslc.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  About
                  <span className="block text-yellow-400">
                    Wild West Construction
                  </span>
                  <span className="block text-3xl md:text-4xl font-semibold text-blue-100 mt-2">
                    15+ Years of Excellence in Utah
                  </span>
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  We're a family-owned construction company committed to
                  delivering exceptional quality and outstanding customer
                  service. Since our founding, we've built our reputation on
                  integrity, craftsmanship, and lasting relationships with our
                  clients throughout Salt Lake County.
                </p>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    href="#quote-form"
                    className="inline-block px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-200 text-center text-lg"
                  >
                    Get Free Estimate
                  </Link>
                  <a
                    href="tel:+1-801-691-4065"
                    className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 text-center text-lg"
                  >
                    Call (801) 691-4065
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center space-x-8 mt-8 text-blue-200">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-sm">A+ Rated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span className="text-sm">Family Owned</span>
                  </div>
                </div>
              </div>

              {/* Hero Image Placeholder */}
              <div className="bg-white bg-opacity-10 rounded-lg p-8 text-center">
                <div className="bg-gray-300 rounded-lg h-80 flex items-center justify-center mb-4">
                  <div className="text-gray-600">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <p className="text-sm">
                      Wild West Construction team photo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company History */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story: Building Excellence Since Day One
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-400 mx-auto mb-8"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Wild West Construction was founded with a simple yet powerful
                mission: to provide Utah homeowners and businesses with
                construction services that exceed expectations. What started as
                a small, family-owned business has grown into one of Salt Lake
                County's most trusted construction companies, but our commitment
                to personal service and quality craftsmanship remains unchanged.
              </p>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Over the past 15+ years, we've completed thousands of projects
                throughout Utah, from small home repairs to major commercial
                renovations. Our journey began when our founder recognized a
                gap in the market for contractors who truly prioritize customer
                satisfaction and quality workmanship over quick profits.
              </p>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Every project we undertake reflects our core values: integrity
                in all our dealings, excellence in every detail, and respect for
                our clients' homes and businesses. We've built lasting
                relationships with suppliers, subcontractors, and most
                importantly, our clients, many of whom have become repeat
                customers and enthusiastic referrals.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Today, Wild West Construction stands as a testament to what
                happens when skilled craftsmanship meets unwavering dedication
                to customer service. We're not just building structures—we're
                building trust, one project at a time.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Mission & Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide every decision we make and every
                project we complete.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Quality First */}
              <div className="bg-white rounded-lg shadow-construction p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quality First
                </h3>
                <p className="text-gray-700">
                  We never compromise on quality. Every material we use, every
                  technique we employ, and every detail we finish is held to the
                  highest standards in the industry.
                </p>
              </div>

              {/* Integrity */}
              <div className="bg-white rounded-lg shadow-construction p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Unwavering Integrity
                </h3>
                <p className="text-gray-700">
                  Honest communication, transparent pricing, and ethical
                  business practices are the foundation of our company. We do
                  what we say we'll do, when we say we'll do it.
                </p>
              </div>

              {/* Customer Focus */}
              <div className="bg-white rounded-lg shadow-construction p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Customer-Centered Service
                </h3>
                <p className="text-gray-700">
                  Your satisfaction is our success. We listen to your needs,
                  respect your home, and work tirelessly to exceed your
                  expectations on every project.
                </p>
              </div>

              {/* Innovation */}
              <div className="bg-white rounded-lg shadow-construction p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Continuous Innovation
                </h3>
                <p className="text-gray-700">
                  We stay current with industry best practices, new
                  technologies, and innovative materials to provide you with the
                  most effective solutions.
                </p>
              </div>

              {/* Safety */}
              <div className="bg-white rounded-lg shadow-construction p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Safety First
                </h3>
                <p className="text-gray-700">
                  The safety of our team, your family, and your property is
                  paramount. We maintain strict safety protocols and
                  comprehensive insurance coverage.
                </p>
              </div>

              {/* Community */}
              <div className="bg-white rounded-lg shadow-construction p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Community Commitment
                </h3>
                <p className="text-gray-700">
                  As a local, family-owned business, we're invested in our
                  community's growth and success. We support local suppliers and
                  give back whenever possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Wild West */}
        <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Why Choose Wild West Construction?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the difference that 15+ years of expertise and
                unwavering commitment to excellence makes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Experience */}
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">15+ Years of Experience</h3>
                <p className="text-gray-300">
                  Extensive experience across all types of construction projects,
                  from simple repairs to complex renovations and new
                  construction.
                </p>
              </div>

              {/* Licensed & Insured */}
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Licensed & Insured</h3>
                <p className="text-gray-300">
                  Fully licensed contractors with comprehensive general
                  liability and workers' compensation insurance for your complete
                  protection.
                </p>
              </div>

              {/* Family Owned */}
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Family-Owned Business</h3>
                <p className="text-gray-300">
                  Personal service and attention to detail that only comes from
                  a family business that takes pride in every project.
                </p>
              </div>

              {/* Local Expertise */}
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Salt Lake County Expertise</h3>
                <p className="text-gray-300">
                  Deep knowledge of local building codes, climate considerations,
                  and architectural styles specific to Utah.
                </p>
              </div>

              {/* Quality Materials */}
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Premium Quality Materials</h3>
                <p className="text-gray-300">
                  We source only the finest materials from trusted suppliers,
                  ensuring longevity and performance in Utah's unique climate.
                </p>
              </div>

              {/* Customer Satisfaction */}
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Customer Satisfaction Focus</h3>
                <p className="text-gray-300">
                  Your satisfaction is our top priority. We're not finished
                  until you're completely happy with the results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Achievements */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Track Record Speaks for Itself
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Numbers that reflect our commitment to excellence and customer
                satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Years in Business */}
              <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-100">
                <div className="text-5xl font-bold text-red-600 mb-2">15+</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Years in Business
                </h3>
                <p className="text-gray-600">
                  Serving Utah with consistent excellence since our founding
                </p>
              </div>

              {/* Projects Completed */}
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                <div className="text-5xl font-bold text-blue-600 mb-2">2,500+</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Projects Completed
                </h3>
                <p className="text-gray-600">
                  From small repairs to major renovations and new construction
                </p>
              </div>

              {/* Customer Satisfaction */}
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                <div className="text-5xl font-bold text-green-600 mb-2">98%</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Customer Satisfaction
                </h3>
                <p className="text-gray-600">
                  Clients who would recommend us to friends and family
                </p>
              </div>

              {/* Service Areas */}
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                <div className="text-5xl font-bold text-purple-600 mb-2">50+</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Cities Served
                </h3>
                <p className="text-gray-600">
                  Throughout Salt Lake County and surrounding areas
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Proudly Serving All of Salt Lake County
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We bring our expertise and commitment to excellence to
                communities throughout Utah.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-construction p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center">
                <div className="p-4 border-r border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Salt Lake City</h3>
                </div>
                <div className="p-4 border-r border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">West Valley City</h3>
                </div>
                <div className="p-4 border-r border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Murray</h3>
                </div>
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Sandy</h3>
                </div>
                <div className="p-4 border-r border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">West Jordan</h3>
                </div>
                <div className="p-4 border-r border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">South Jordan</h3>
                </div>
                <div className="p-4 border-r border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Taylorsville</h3>
                </div>
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Millcreek</h3>
                </div>
                <div className="p-4 border-r border-gray-200">
                  <h3 className="font-semibold text-gray-900">Cottonwood Heights</h3>
                </div>
                <div className="p-4 border-r border-gray-200">
                  <h3 className="font-semibold text-gray-900">Midvale</h3>
                </div>
                <div className="p-4 border-r border-gray-200">
                  <h3 className="font-semibold text-gray-900">Draper</h3>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">& More!</h3>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">
                  Not sure if we serve your area? Give us a call—we're always
                  happy to discuss your project regardless of location.
                </p>
                <a
                  href="tel:+1-801-691-4065"
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Call (801) 691-4065
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-100" id="pricing">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ready to Experience the Wild West Difference?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of satisfied customers who chose quality,
                reliability, and exceptional service. Get your free estimate
                today.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get Your Free Consultation & Estimate
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Let's discuss your project and show you why so many Utah
                homeowners and businesses trust Wild West Construction. No
                obligation, no pressure—just honest advice and competitive
                pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="#quote-form" 
                  className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center text-lg"
                >
                  Get Free Estimate
                </Link>
                <a
                  href="tel:+1-801-691-4065"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 text-center text-lg"
                >
                  Call (801) 691-4065
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section
          className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white"
          id="quote-form"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* CTA Content */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Start Your Project with Utah's Most Trusted Construction Company
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Ready to transform your space with the quality and service that
                  has made Wild West Construction Utah's premier choice for 15+
                  years? Get your free, detailed estimate today.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6 text-yellow-400"
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
                    <span>Free On-Site Consultation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6 text-yellow-400"
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
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6 text-yellow-400"
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
                    <span>15+ Years Experience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-6 h-6 text-yellow-400"
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
                    <span>Quality Guarantee</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="tel:+1-801-691-4065"
                    className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center text-lg"
                  >
                    Call (801) 691-4065
                  </a>
                  <a
                    href="https://wa.me/18016914065"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900 transition-colors duration-200 text-center text-lg flex items-center justify-center space-x-2"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.388" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Lead Form */}
              <div className="bg-white bg-opacity-95 rounded-lg shadow-2xl p-1">
                <Suspense
                  fallback={
                    <div className="h-96 animate-pulse bg-gray-200 rounded"></div>
                  }
                >
                  <LeadForm variant="default" />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Wild West Construction",
            description:
              "Utah's premier family-owned construction company with 15+ years of experience. Licensed & insured contractors serving all of Salt Lake County with quality craftsmanship and exceptional customer service.",
            url: "https://wildwestslc.com/about",
            telephone: "+1-801-691-4065",
            email: "info@wildwestslc.com",
            foundingDate: "2008",
            address: {
              "@type": "PostalAddress",
              streetAddress: "4097 S 420 W",
              addressLocality: "Murray",
              addressRegion: "UT",
              postalCode: "84123",
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "40.6398",
              longitude: "-111.8983",
            },
            serviceArea: {
              "@type": "State",
              name: "Utah",
            },
            openingHours: "Mo-Fr 07:00-18:00, Sa 08:00-16:00",
            priceRange: "$$",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "127",
            },
            slogan: "Building Excellence Since Day One",
            knowsAbout: [
              "Construction Services",
              "Home Renovation",
              "Commercial Construction",
              "Flooring Installation",
              "Demolition Services",
              "Junk Removal",
              "Utah Building Codes",
              "Salt Lake County Construction"
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Construction Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "General Construction",
                    description: "Complete construction services for residential and commercial properties."
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Flooring Services",
                    description: "Professional flooring installation, repair, and refinishing services."
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Demolition Services",
                    description: "Safe and efficient demolition services for residential and commercial properties."
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Junk Removal",
                    description: "Professional junk removal and debris disposal services."
                  }
                }
              ]
            }
          }),
        }}
      />
    </>
  );
}