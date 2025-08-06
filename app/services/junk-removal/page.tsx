import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Professional Junk Removal Services in Utah | Wild West Construction",
  description:
    "Fast, reliable junk removal throughout Utah. Construction debris, household items, commercial waste. Eco-friendly disposal by licensed contractors. Same-day service available.",
  openGraph: {
    title:
      "Professional Junk Removal Services in Utah | Wild West Construction",
    description:
      "Fast, reliable junk removal throughout Utah. Construction debris, household items, commercial waste. Eco-friendly disposal by licensed contractors. Same-day service available.",
    url: "https://wildwestslc.com/services/junk-removal",
    siteName: "Wild West Construction",
    images: [
      {
        url: "https://wildwestslc.com/images/junk-removal-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Professional junk removal services by Wild West Construction",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Professional Junk Removal Services in Utah | Wild West Construction",
    description:
      "Fast, reliable junk removal throughout Utah. Construction debris, household items, commercial waste. Eco-friendly disposal by licensed contractors. Same-day service available.",
    images: ["https://wildwestslc.com/images/junk-removal-hero.jpg"],
  },
  alternates: {
    canonical: "https://wildwestslc.com/services/junk-removal",
  },
};

export default function JunkRemovalServices() {
  return (
    <>
      <Header />

      <main>
        {/* Breadcrumb Navigation */}
        <nav className="bg-gray-50 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="text-blue-600 hover:text-red-600 transition-colors"
              >
                Home
              </Link>
              <span className="text-gray-500">/</span>
              <Link
                href="/services"
                className="text-blue-600 hover:text-red-600 transition-colors"
              >
                Services
              </Link>
              <span className="text-gray-500">/</span>
              <span className="text-gray-800">Junk Removal Services</span>
            </div>
          </div>
        </nav>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Professional
                  <span className="block text-yellow-400">Junk Removal</span>
                  <span className="block text-3xl md:text-4xl font-semibold text-blue-100 mt-2">
                    Throughout Utah
                  </span>
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Fast, reliable junk removal services for construction debris,
                  household items, and commercial waste. We handle the heavy
                  lifting so you don&apos;t have to—with eco-friendly disposal
                  practices.
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm">Same-Day Service</span>
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <p className="text-sm">
                      Professional junk removal service showcase
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Reliable Junk Removal Solutions for Utah Properties
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-yellow-400 mx-auto mb-8"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At Wild West Construction, we understand that clearing unwanted
                items can be overwhelming and time-consuming. Whether
                you&apos;re dealing with construction debris, household clutter,
                office cleanouts, or estate clearing, our professional junk
                removal team provides fast, efficient, and eco-friendly
                solutions throughout Utah.
              </p>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                With years of experience serving residential and commercial
                clients across the Salt Lake Valley and surrounding areas,
                we&apos;ve built our reputation on reliable service, fair
                pricing, and responsible disposal practices. Our trained
                professionals handle all the heavy lifting, loading, and
                disposal, so you can focus on what matters most to you.
              </p>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                From single-item pickup to complete property cleanouts, we
                accept almost everything. Our commitment to environmental
                responsibility means we donate reusable items to local
                charities, recycle materials whenever possible, and ensure
                proper disposal of items that can&apos;t be
                repurposed—minimizing the impact on Utah&apos;s landfills.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Every junk removal job starts with a free, no-obligation
                estimate. We arrive on time, work efficiently, and clean up the
                area before we leave. Our transparent pricing means no
                surprises, and our same-day service availability ensures you can
                reclaim your space when it&apos;s convenient for you.
              </p>
            </div>
          </div>
        </section>

        {/* Types of Services */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Junk Removal Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We handle everything from single items to complete property
                cleanouts with fast, reliable service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Construction Debris */}
              <div className="bg-white rounded-lg shadow-construction p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Construction Debris
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Drywall & lumber scraps</li>
                  <li>• Flooring materials</li>
                  <li>• Roofing debris</li>
                  <li>• Concrete & masonry</li>
                  <li>• Renovation waste</li>
                </ul>
              </div>

              {/* Household Items */}
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
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Household Items
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Furniture & mattresses</li>
                  <li>• Appliances (all sizes)</li>
                  <li>• Electronics & TVs</li>
                  <li>• Clothing & textiles</li>
                  <li>• General household clutter</li>
                </ul>
              </div>

              {/* Yard Waste */}
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Yard & Garden Waste
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Tree branches & logs</li>
                  <li>• Brush & vegetation</li>
                  <li>• Leaves & grass clippings</li>
                  <li>• Garden equipment</li>
                  <li>• Landscaping materials</li>
                </ul>
              </div>

              {/* Commercial Cleanouts */}
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Commercial Cleanouts
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Office furniture & equipment</li>
                  <li>• Retail store cleanouts</li>
                  <li>• Warehouse clearing</li>
                  <li>• Restaurant equipment</li>
                  <li>• Industrial waste removal</li>
                </ul>
              </div>

              {/* Estate Cleanouts */}
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Estate Cleanouts
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Complete home cleanouts</li>
                  <li>• Sensitive item handling</li>
                  <li>• Donation coordination</li>
                  <li>• Document disposal</li>
                  <li>• Respectful service</li>
                </ul>
              </div>

              {/* Specialty Items */}
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
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Specialty Items
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Hot tubs & pools</li>
                  <li>• Exercise equipment</li>
                  <li>• Pianos & organs</li>
                  <li>• Safes & heavy items</li>
                  <li>• Unusual or bulky items</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-white" id="process">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Simple Junk Removal Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From booking to cleanup, we make junk removal easy and
                stress-free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Book Your Service
                </h3>
                <p className="text-gray-700">
                  Call us or book online. We offer same-day and next-day
                  appointments based on availability.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Free Estimate
                </h3>
                <p className="text-gray-700">
                  We arrive on-site and provide upfront, transparent pricing
                  before any work begins.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  We Do the Work
                </h3>
                <p className="text-gray-700">
                  Our team handles all lifting, loading, and removal. You just
                  point, and we&apos;ll take it away.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Clean Sweep
                </h3>
                <p className="text-gray-700">
                  We clean up the area and dispose of everything responsibly
                  through recycling and donation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Why Choose Wild West Construction for Junk Removal?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Fast, reliable, and eco-friendly junk removal services you can
                trust.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Benefit 1 */}
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Same-Day Service</h3>
                <p className="text-gray-300">
                  Need it gone today? We offer same-day pickup service based on
                  availability for urgent needs.
                </p>
              </div>

              {/* Benefit 2 */}
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">No Hidden Fees</h3>
                <p className="text-gray-300">
                  Transparent, upfront pricing with no surprise charges. Labor,
                  disposal, and cleanup all included.
                </p>
              </div>

              {/* Benefit 3 */}
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Eco-Friendly</h3>
                <p className="text-gray-300">
                  We donate, recycle, and properly dispose of items to minimize
                  environmental impact and help communities.
                </p>
              </div>

              {/* Benefit 4 */}
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Fully Insured</h3>
                <p className="text-gray-300">
                  Licensed and insured team with comprehensive liability
                  coverage for your complete protection.
                </p>
              </div>

              {/* Benefit 5 */}
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Professional Team</h3>
                <p className="text-gray-300">
                  Trained, uniformed professionals who treat your property with
                  respect and care.
                </p>
              </div>

              {/* Benefit 6 */}
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
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-3m3 3l3-3"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Heavy Item Specialists
                </h3>
                <p className="text-gray-300">
                  No item too big or heavy. We handle appliances, furniture, and
                  specialty items others won&apos;t touch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50" id="pricing">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ready to Clear Out Your Space?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                No hidden fees, no surprises. Get your free estimate and experience
                stress-free junk removal today.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get Your Free Junk Removal Estimate Today
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                We handle everything from pickup to disposal, so you can enjoy your clean space. 
                Our team provides fast, reliable service with eco-friendly disposal practices and same-day availability.
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

        {/* FAQ Section */}
        <section className="py-16 bg-white" id="faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Junk Removal Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our junk removal services.
              </p>
            </div>

            <div className="space-y-8">
              {/* FAQ Item 1 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What items can you remove?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We accept almost everything including furniture, appliances,
                  electronics, construction debris, yard waste, and general
                  household items. We cannot remove hazardous materials like
                  paint, chemicals, asbestos, or medical waste. If you&apos;re
                  unsure about an item, just call us and we&apos;ll let you
                  know.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How do you price your services?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our pricing is based on the volume of items (how much space
                  they take in our truck) rather than weight or time. We provide
                  upfront, transparent pricing before we start any work. There
                  are no hidden fees—our price includes labor, disposal, and
                  cleanup.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Do you donate or recycle items?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Absolutely! We&apos;re committed to environmental
                  responsibility. Reusable items go to local charities, metals
                  and electronics are recycled, and we properly dispose of items
                  that can&apos;t be repurposed. We&apos;ll even provide
                  donation receipts when possible.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How quickly can you come out?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We offer same-day service when available, and most
                  appointments can be scheduled within 24-48 hours. For urgent
                  needs, call us directly and we&apos;ll do our best to
                  accommodate your timeline. We also offer scheduled
                  appointments for your convenience.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Do I need to be present during the removal?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  While it&apos;s helpful if someone is present to point out
                  items and answer questions, it&apos;s not always necessary.
                  For scheduled appointments where items are clearly marked or
                  listed, we can work with you to arrange removal even when
                  you&apos;re not there.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What about very heavy or unusual items?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We specialize in heavy and unusual items that other companies
                  won&apos;t handle—pianos, hot tubs, safes, exercise equipment,
                  and more. Our team has the equipment and expertise to safely
                  remove almost anything. Just let us know what you have when
                  booking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Placeholder Section */}
        <section className="py-16 bg-gray-50" id="gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Junk Removal Project Gallery
              </h2>
              <p className="text-xl text-gray-600">
                See the efficiency and care we bring to every junk removal
                project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-lg shadow-construction overflow-hidden"
                >
                  <div className="bg-gray-300 h-64 flex items-center justify-center">
                    <div className="text-gray-600 text-center">
                      <svg
                        className="w-12 h-12 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <p className="text-sm">
                        Junk Removal Gallery Image {item}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {item === 1 && "Home Cleanout Project"}
                      {item === 2 && "Construction Debris Removal"}
                      {item === 3 && "Office Equipment Disposal"}
                      {item === 4 && "Estate Cleanout Service"}
                      {item === 5 && "Appliance Removal"}
                      {item === 6 && "Furniture Pickup Service"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Professional junk removal showcasing our efficient and
                      eco-friendly service.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Ready to reclaim your space with professional junk removal?
              </p>
              <Link href="#quote-form" className="btn-primary">
                Schedule Your Pickup Today
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Explore Our Other Expert Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete your project with our comprehensive construction and maintenance services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Demolition Services */}
              <div className="bg-white rounded-lg shadow-construction border border-gray-200 hover:shadow-xl hover:border-red-600/20 transition-all duration-300 group overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-red-100 text-red-700 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-red-700 group-hover:text-red-600 transition-colors duration-300">
                        Professional Demolition Services
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Safe and efficient demolition for interior remodeling, structural teardown, and complete building removal.
                  </p>
                  
                  <div className="mb-6">
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2 text-sm">
                        <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Interior & exterior demolition</span>
                      </li>
                      <li className="flex items-start space-x-2 text-sm">
                        <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Selective wall & structure removal</span>
                      </li>
                      <li className="flex items-start space-x-2 text-sm">
                        <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Complete debris removal</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <Link
                      href="/services/demolition"
                      className="block w-full text-center font-semibold py-3 px-4 rounded-lg bg-white border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 transform group-hover:scale-105"
                    >
                      View Demolition Services
                    </Link>
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-red-700 via-red-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>

              {/* Flooring Services */}
              <div className="bg-white rounded-lg shadow-construction border border-gray-200 hover:shadow-xl hover:border-green-600/20 transition-all duration-300 group overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-green-100 text-green-700 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-green-700 group-hover:text-green-600 transition-colors duration-300">
                        Professional Flooring Services
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Expert installation, repair, and refinishing of hardwood, vinyl, laminate, and LVP flooring throughout Utah.
                  </p>
                  
                  <div className="mb-6">
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2 text-sm">
                        <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Hardwood installation & refinishing</span>
                      </li>
                      <li className="flex items-start space-x-2 text-sm">
                        <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Luxury vinyl plank (LVP)</span>
                      </li>
                      <li className="flex items-start space-x-2 text-sm">
                        <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Laminate & engineered flooring</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <Link
                      href="/services/flooring"
                      className="block w-full text-center font-semibold py-3 px-4 rounded-lg bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 transform group-hover:scale-105"
                    >
                      View Flooring Services
                    </Link>
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-green-700 via-green-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
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
                  Ready to Clear Out Your Space?
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Get your free estimate today and experience stress-free junk
                  removal. We handle everything from pickup to disposal, so you
                  can enjoy your clean space.
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
                    <span>Free On-Site Estimates</span>
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
                    <span>Same-Day Service Available</span>
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
                    <span>Eco-Friendly Disposal</span>
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
                    <span>No Hidden Fees</span>
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
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://wildwestslc.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://wildwestslc.com/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Junk Removal Services",
                "item": "https://wildwestslc.com/services/junk-removal"
              }
            ]
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Wild West Construction - Junk Removal Services",
            description:
              "Fast, reliable junk removal services throughout Utah. Construction debris, household items, commercial waste removal with eco-friendly disposal by licensed contractors.",
            url: "https://wildwestslc.com/services/junk-removal",
            telephone: "+1-801-691-4065",
            email: "info@wildwestslc.com",
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
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Junk Removal Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Construction Debris Removal",
                    description:
                      "Professional removal of construction debris, drywall, lumber, and renovation waste.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Household Junk Removal",
                    description:
                      "Furniture, appliances, electronics, and general household item removal services.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Commercial Cleanouts",
                    description:
                      "Office, retail, and commercial property cleanout and junk removal services.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Estate Cleanouts",
                    description:
                      "Sensitive and respectful estate and property cleanout services.",
                  },
                },
              ],
            },
            openingHours: "Mo-Fr 07:00-18:00, Sa 08:00-16:00",
            priceRange: "$",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "127",
            },
          }),
        }}
      />
    </>
  );
}
