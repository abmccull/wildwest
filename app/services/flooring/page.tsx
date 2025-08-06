import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Professional Flooring Services in Utah | Wild West Construction",
  description:
    "Expert flooring installation, repair, and refinishing services throughout Utah. Hardwood, tile, vinyl, laminate, and carpet installation. Licensed & insured contractors.",
  openGraph: {
    title: "Professional Flooring Services in Utah | Wild West Construction",
    description:
      "Expert flooring installation, repair, and refinishing services throughout Utah. Hardwood, tile, vinyl, laminate, and carpet installation. Licensed & insured contractors.",
    url: "https://wildwestslc.com/services/flooring",
    siteName: "Wild West Construction",
    images: [
      {
        url: "https://wildwestslc.com/images/flooring-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Professional flooring installation by Wild West Construction",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Flooring Services in Utah | Wild West Construction",
    description:
      "Expert flooring installation, repair, and refinishing services throughout Utah. Hardwood, tile, vinyl, laminate, and carpet installation. Licensed & insured contractors.",
    images: ["https://wildwestslc.com/images/flooring-hero.jpg"],
  },
  alternates: {
    canonical: "https://wildwestslc.com/services/flooring",
  },
};

export default function FlooringServices() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-700 via-green-600 to-green-500 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Professional
                  <span className="block text-yellow-400">
                    Flooring Services
                  </span>
                  <span className="block text-3xl md:text-4xl font-semibold text-green-100 mt-2">
                    Throughout Utah
                  </span>
                </h1>
                <p className="text-xl text-green-100 mb-8 leading-relaxed">
                  Transform your home or business with expert flooring
                  installation, repair, and refinishing. From hardwood elegance
                  to durable tile solutions, we deliver quality craftsmanship
                  that lasts.
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
                    className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-green-600 transition-colors duration-200 text-center text-lg"
                  >
                    Call (801) 691-4065
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center space-x-8 mt-8 text-green-200">
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
                    <span className="text-sm">10-Year Warranty</span>
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm">
                      Professional hardwood flooring installation showcase
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
                Expert Flooring Solutions for Utah Homes & Businesses
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-400 mx-auto mb-8"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At Wild West Construction, we understand that flooring is more
                than just a surface—it&apos;s the foundation of your
                space&apos;s style, comfort, and functionality. With over a
                decade of experience serving Utah&apos;s residential and
                commercial properties, we&apos;ve built our reputation on
                delivering exceptional flooring solutions that combine beauty,
                durability, and value.
              </p>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our team of certified flooring specialists brings expertise
                across all major flooring types, from classic hardwood and
                elegant tile to modern vinyl and cozy carpet. We work with
                premium materials from trusted manufacturers and employ
                industry-leading installation techniques to ensure your floors
                not only look stunning but stand the test of time.
              </p>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Whether you&apos;re renovating a single room, updating an entire
                home, or outfitting a commercial space, we provide personalized
                service from initial consultation through final walkthrough. Our
                commitment to quality craftsmanship and customer satisfaction
                has made us Utah&apos;s trusted choice for flooring solutions.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Every project begins with understanding your unique needs, style
                preferences, and budget. We&apos;ll guide you through material
                selection, provide transparent pricing, and execute flawless
                installation with minimal disruption to your daily routine.
                Plus, all our work is backed by comprehensive warranties and our
                24-hour response commitment for any concerns.
              </p>
            </div>
          </div>
        </section>

        {/* Types of Services */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Flooring Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From installation to restoration, we handle every aspect of your
                flooring project with precision and care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Hardwood Services */}
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
                  Hardwood Flooring
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Solid hardwood installation</li>
                  <li>• Engineered wood flooring</li>
                  <li>• Floor refinishing & restoration</li>
                  <li>• Custom staining & finishing</li>
                  <li>• Repair & plank replacement</li>
                </ul>
              </div>

              {/* Tile Services */}
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
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Tile & Stone
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Ceramic & porcelain tile</li>
                  <li>• Natural stone installation</li>
                  <li>• Mosaic & decorative tiles</li>
                  <li>• Bathroom & kitchen tiling</li>
                  <li>• Grout cleaning & repair</li>
                </ul>
              </div>

              {/* Vinyl Services */}
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
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Vinyl & Laminate
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Luxury vinyl plank (LVP)</li>
                  <li>• Laminate flooring installation</li>
                  <li>• Sheet vinyl flooring</li>
                  <li>• Water-resistant options</li>
                  <li>• Commercial-grade materials</li>
                </ul>
              </div>

              {/* Carpet Services */}
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
                      d="M3 21h18M5 21V7a2 2 0 012-2h10a2 2 0 012 2v14M9 10h6M9 14h6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Carpet Installation
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Residential carpet installation</li>
                  <li>• Commercial carpeting</li>
                  <li>• Carpet removal & disposal</li>
                  <li>• Padding & underlayment</li>
                  <li>• Custom carpet fitting</li>
                </ul>
              </div>

              {/* Subfloor Services */}
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Subfloor & Preparation
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Subfloor repair & replacement</li>
                  <li>• Floor leveling services</li>
                  <li>• Moisture barrier installation</li>
                  <li>• Underlayment systems</li>
                  <li>• Structural assessments</li>
                </ul>
              </div>

              {/* Specialty Services */}
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
                  Specialty Services
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Custom pattern installations</li>
                  <li>• Transition strip installation</li>
                  <li>• Floor heating system prep</li>
                  <li>• Commercial flooring solutions</li>
                  <li>• Emergency floor repairs</li>
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
                Our Proven Flooring Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From initial consultation to final walkthrough, we ensure every
                step meets our exacting standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Free Consultation
                </h3>
                <p className="text-gray-700">
                  In-home assessment of your space, needs discussion, material
                  selection guidance, and detailed measurement.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Custom Estimate
                </h3>
                <p className="text-gray-700">
                  Detailed written quote with material costs, labor breakdown,
                  timeline, and warranty information.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Preparation & Installation
                </h3>
                <p className="text-gray-700">
                  Professional site preparation, subfloor assessment, and expert
                  installation using premium materials.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Final Inspection
                </h3>
                <p className="text-gray-700">
                  Thorough quality check, cleanup, walkthrough with you, and
                  warranty documentation delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Why Choose Wild West Construction for Your Flooring?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the difference that expertise, quality materials, and
                exceptional service make.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Benefit 1 */}
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
                <h3 className="text-xl font-bold mb-3">Quality Guarantee</h3>
                <p className="text-gray-300">
                  10-year workmanship warranty on all installations. We stand
                  behind our work with comprehensive coverage.
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
                <h3 className="text-xl font-bold mb-3">Competitive Pricing</h3>
                <p className="text-gray-300">
                  Fair, transparent pricing with no hidden fees. We offer
                  financing options to fit your budget.
                </p>
              </div>

              {/* Benefit 3 */}
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
                <h3 className="text-xl font-bold mb-3">Timely Completion</h3>
                <p className="text-gray-300">
                  Projects completed on schedule with minimal disruption to your
                  daily routine. Reliable timelines you can count on.
                </p>
              </div>

              {/* Benefit 4 */}
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Licensed & Insured</h3>
                <p className="text-gray-300">
                  Fully licensed contractors with comprehensive insurance
                  coverage for your peace of mind.
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
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Premium Materials</h3>
                <p className="text-gray-300">
                  We source only the highest quality materials from trusted
                  manufacturers with proven durability records.
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
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
                <p className="text-gray-300">
                  Round-the-clock customer support for any questions or concerns
                  after your installation is complete.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing/CTA Section */}
        <section className="py-16 bg-gray-50" id="pricing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Transparent, Competitive Pricing
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get your free, detailed estimate today. No hidden fees, no
                surprises—just honest pricing for quality work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Basic Package */}
              <div className="bg-white rounded-lg shadow-construction p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Basic Installation
                </h3>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  Starting at
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-6">
                  $3.50/sq ft
                </div>
                <ul className="text-left text-gray-700 space-y-3 mb-8">
                  <li>✓ Standard material selection</li>
                  <li>✓ Professional installation</li>
                  <li>✓ Basic subfloor preparation</li>
                  <li>✓ 2-year workmanship warranty</li>
                  <li>✓ Post-installation cleanup</li>
                </ul>
                <Link href="#quote-form" className="btn-primary w-full">
                  Get Free Quote
                </Link>
              </div>

              {/* Premium Package */}
              <div className="bg-white rounded-lg shadow-construction p-8 text-center ring-2 ring-red-600 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Premium Installation
                </h3>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  Starting at
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-6">
                  $5.75/sq ft
                </div>
                <ul className="text-left text-gray-700 space-y-3 mb-8">
                  <li>✓ Premium material selection</li>
                  <li>✓ Expert craftsman installation</li>
                  <li>✓ Complete subfloor assessment</li>
                  <li>✓ 5-year workmanship warranty</li>
                  <li>✓ Furniture moving included</li>
                  <li>✓ Moisture barrier installation</li>
                </ul>
                <Link href="#quote-form" className="btn-primary w-full">
                  Get Free Quote
                </Link>
              </div>

              {/* Luxury Package */}
              <div className="bg-white rounded-lg shadow-construction p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Luxury Installation
                </h3>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  Starting at
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-6">
                  $8.25/sq ft
                </div>
                <ul className="text-left text-gray-700 space-y-3 mb-8">
                  <li>✓ Designer material selection</li>
                  <li>✓ Master craftsman installation</li>
                  <li>✓ Full structural assessment</li>
                  <li>✓ 10-year workmanship warranty</li>
                  <li>✓ White-glove service</li>
                  <li>✓ Custom finishing options</li>
                  <li>✓ Priority scheduling</li>
                </ul>
                <Link href="#quote-form" className="btn-primary w-full">
                  Get Free Quote
                </Link>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">
                Special Offer: Free Estimates & Design Consultation
              </h3>
              <p className="text-yellow-700">
                Schedule your free in-home consultation this month and receive a
                complimentary design consultation worth $200. Call now or fill
                out our form to get started!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white" id="faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Flooring Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our flooring services.
              </p>
            </div>

            <div className="space-y-8">
              {/* FAQ Item 1 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How long does typical flooring installation take?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Installation timeframes vary by project size and flooring
                  type. A typical 1,000 sq ft room takes 2-3 days for hardwood,
                  1-2 days for vinyl or laminate, and 1 day for carpet. Tile
                  projects may take 3-5 days including cure time. We provide
                  detailed timelines during your consultation and stick to our
                  commitments.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What&apos;s the best flooring option for high-traffic areas?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  For high-traffic areas, we recommend luxury vinyl plank (LVP),
                  porcelain tile, or engineered hardwood with a durable finish.
                  These options offer excellent durability, easy maintenance,
                  and long-term value. We&apos;ll assess your specific needs and
                  lifestyle to recommend the perfect solution during your
                  consultation.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Do you handle subfloor repairs and preparation?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Absolutely! Proper subfloor preparation is crucial for a
                  successful installation. We assess your existing subfloor,
                  address any issues like squeaks, uneven areas, or moisture
                  problems, and ensure a perfectly prepared surface. This
                  includes leveling, reinforcement, and moisture barrier
                  installation when needed.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What warranty do you provide on your flooring work?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We offer comprehensive warranties ranging from 2-10 years
                  depending on the service level selected. Our Premium and
                  Luxury packages include extended warranties covering both
                  materials and workmanship. Additionally, most flooring
                  manufacturers provide separate material warranties ranging
                  from 15-50 years.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Can you install flooring over existing floors?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  In many cases, yes! Vinyl, laminate, and some engineered
                  hardwoods can be installed over existing flooring if it&apos;s
                  in good condition and properly prepared. This can save time
                  and money. However, we&apos;ll evaluate your specific
                  situation during the consultation to determine the best
                  approach for optimal results.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How do I maintain my new floors after installation?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We provide detailed care instructions for every flooring type
                  we install. Generally, regular vacuuming/sweeping, prompt
                  spill cleanup, and periodic professional cleaning keep floors
                  looking great. For hardwood, avoid excess moisture and use
                  manufacturer-approved cleaners. We offer ongoing maintenance
                  services and are always available for questions.
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
                Our Flooring Project Gallery
              </h2>
              <p className="text-xl text-gray-600">
                See the quality and craftsmanship that sets Wild West
                Construction apart.
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
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm">Project Gallery Image {item}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {item === 1 && "Luxury Hardwood Installation"}
                      {item === 2 && "Modern Tile Kitchen Floor"}
                      {item === 3 && "LVP Living Room Transformation"}
                      {item === 4 && "Commercial Carpet Installation"}
                      {item === 5 && "Custom Stone Entryway"}
                      {item === 6 && "Bathroom Tile Renovation"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Professional installation showcasing our attention to
                      detail and quality craftsmanship.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Ready to see your project featured in our gallery?
              </p>
              <Link href="#quote-form" className="btn-primary">
                Start Your Project Today
              </Link>
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section
          className="py-16 bg-gradient-to-br from-green-600 to-green-700 text-white"
          id="quote-form"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* CTA Content */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your Floors?
                </h2>
                <p className="text-xl text-green-100 mb-8 leading-relaxed">
                  Get your free, no-obligation estimate today. Our flooring
                  experts will assess your space, discuss your vision, and
                  provide transparent pricing for your project.
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
                    <span>Free In-Home Consultation</span>
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
                    <span>Detailed Written Estimate</span>
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
                    <span>24-Hour Response Time</span>
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
                    <span>No Pressure, No Obligation</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="tel:+1-801-691-4065"
                    className="px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center text-lg"
                  >
                    Call (801) 691-4065
                  </a>
                  <a
                    href="https://wa.me/18016914065"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-green-800 text-white font-bold rounded-lg hover:bg-green-900 transition-colors duration-200 text-center text-lg flex items-center justify-center space-x-2"
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
                  <LeadForm variant="default" showProjectDetails={true} />
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
            name: "Wild West Construction - Flooring Services",
            description:
              "Professional flooring installation, repair, and refinishing services throughout Utah. Hardwood, tile, vinyl, laminate, and carpet installation by licensed contractors.",
            url: "https://wildwestslc.com/services/flooring",
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
              name: "Flooring Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Hardwood Flooring Installation",
                    description:
                      "Professional hardwood floor installation, refinishing, and repair services.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Tile & Stone Installation",
                    description:
                      "Expert ceramic, porcelain, and natural stone tile installation services.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Vinyl & Laminate Flooring",
                    description:
                      "Professional luxury vinyl plank and laminate flooring installation.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Carpet Installation",
                    description:
                      "Residential and commercial carpet installation and removal services.",
                  },
                },
              ],
            },
            openingHours: "Mo-Fr 07:00-18:00, Sa 08:00-16:00",
            priceRange: "$$",
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
