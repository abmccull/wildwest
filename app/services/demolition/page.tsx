import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Professional Demolition Services in Utah | Wild West Construction",
  description:
    "Expert demolition services throughout Utah. Interior & exterior demolition, structural teardown, debris removal. Licensed & insured contractors with 24-hour emergency service.",
  openGraph: {
    title: "Professional Demolition Services in Utah | Wild West Construction",
    description:
      "Expert demolition services throughout Utah. Interior & exterior demolition, structural teardown, debris removal. Licensed & insured contractors with 24-hour emergency service.",
    url: "https://wildwestslc.com/services/demolition",
    siteName: "Wild West Construction",
    images: [
      {
        url: "https://wildwestslc.com/images/demolition-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Professional demolition services by Wild West Construction",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Demolition Services in Utah | Wild West Construction",
    description:
      "Expert demolition services throughout Utah. Interior & exterior demolition, structural teardown, debris removal. Licensed & insured contractors with 24-hour emergency service.",
    images: ["https://wildwestslc.com/images/demolition-hero.jpg"],
  },
  alternates: {
    canonical: "https://wildwestslc.com/services/demolition",
  },
};

export default function DemolitionServices() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Professional
                  <span className="block text-yellow-400">
                    Demolition Services
                  </span>
                  <span className="block text-3xl md:text-4xl font-semibold text-red-100 mt-2">
                    Throughout Utah
                  </span>
                </h1>
                <p className="text-xl text-red-100 mb-8 leading-relaxed">
                  Safe, efficient, and precise demolition services for
                  residential and commercial projects. From interior remodeling
                  to complete structure removal, we handle every demolition job
                  with expertise.
                </p>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    href="#quote-form"
                    className="inline-block px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200 text-center text-lg"
                  >
                    Get Free Estimate
                  </Link>
                  <a
                    href="tel:+1-801-691-4065"
                    className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-red-600 transition-colors duration-200 text-center text-lg"
                  >
                    Call (801) 691-4065
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center space-x-8 mt-8 text-red-200">
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
                    <span className="text-sm">24/7 Emergency Service</span>
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
                      Professional demolition project showcase
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
                Expert Demolition Solutions for Utah Properties
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-400 mx-auto mb-8"></div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At Wild West Construction, we understand that demolition is
                often the first step toward creating something better. Whether
                you&apos;re renovating a single room, tearing down walls for an
                open floor plan, or need complete structural removal, our
                experienced demolition team provides safe, efficient, and
                precise services that set the foundation for your vision.
              </p>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                With over a decade of experience serving Utah&apos;s residential
                and commercial properties, we&apos;ve mastered the art of
                controlled demolition. Our certified demolition specialists use
                industry-leading equipment and proven techniques to ensure every
                project is completed safely, on time, and within budget—while
                minimizing disruption to surrounding areas.
              </p>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                From selective interior demolition that preserves structural
                integrity to complete building teardown with environmental
                considerations, we handle projects of all sizes. Our
                comprehensive approach includes proper permits, utility
                shutoffs, hazardous material assessment, and complete debris
                removal—giving you peace of mind throughout the entire process.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Every demolition project begins with a thorough site assessment
                and detailed planning. We coordinate with architects,
                contractors, and local authorities to ensure compliance with all
                regulations. Our commitment to safety, precision, and
                environmental responsibility has made us Utah&apos;s trusted
                choice for demolition services.
              </p>
            </div>
          </div>
        </section>

        {/* Types of Services */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Comprehensive Demolition Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From precise interior work to complete structural removal, we
                handle every type of demolition project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Interior Demolition */}
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
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Interior Demolition
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Wall & partition removal</li>
                  <li>• Kitchen & bathroom teardown</li>
                  <li>• Flooring & ceiling removal</li>
                  <li>• Cabinet & fixture removal</li>
                  <li>• Selective demolition work</li>
                </ul>
              </div>

              {/* Structural Demolition */}
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Structural Demolition
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Complete building teardown</li>
                  <li>• Foundation removal</li>
                  <li>• Load-bearing wall removal</li>
                  <li>• Structural modifications</li>
                  <li>• Site preparation services</li>
                </ul>
              </div>

              {/* Commercial Demolition */}
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Commercial Demolition
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Retail space teardown</li>
                  <li>• Office building demolition</li>
                  <li>• Warehouse removal</li>
                  <li>• Industrial facility demo</li>
                  <li>• Multi-unit properties</li>
                </ul>
              </div>

              {/* Specialty Services */}
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
                  Specialty Services
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Pool & spa removal</li>
                  <li>• Concrete demolition</li>
                  <li>• Asbestos abatement prep</li>
                  <li>• Emergency demolition</li>
                  <li>• Fire damage cleanup</li>
                </ul>
              </div>

              {/* Debris Management */}
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Debris Management
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Complete debris removal</li>
                  <li>• Recycling & disposal</li>
                  <li>• Material salvage services</li>
                  <li>• Site cleanup</li>
                  <li>• Environmental compliance</li>
                </ul>
              </div>

              {/* Planning & Permits */}
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
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Planning & Permits
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Permit acquisition</li>
                  <li>• Structural assessments</li>
                  <li>• Utility disconnection</li>
                  <li>• Safety planning</li>
                  <li>• Project coordination</li>
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
                Our Safe Demolition Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every demolition project follows our proven safety protocols and
                systematic approach.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Site Assessment
                </h3>
                <p className="text-gray-700">
                  Comprehensive evaluation of structure, utilities, hazardous
                  materials, and surrounding areas.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Planning & Permits
                </h3>
                <p className="text-gray-700">
                  Detailed demolition plan, permit acquisition, utility
                  shutoffs, and safety protocol development.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Safe Demolition
                </h3>
                <p className="text-gray-700">
                  Professional demolition using proper equipment, safety
                  measures, and environmental protection.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Cleanup & Disposal
                </h3>
                <p className="text-gray-700">
                  Complete debris removal, recycling where possible, and final
                  site preparation for next phase.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Why Choose Wild West Construction for Demolition?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Safety, precision, and reliability you can trust for any
                demolition project.
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
                <h3 className="text-xl font-bold mb-3">Safety First</h3>
                <p className="text-gray-300">
                  Comprehensive safety protocols, certified equipment operators,
                  and full insurance coverage for your protection.
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
                <h3 className="text-xl font-bold mb-3">Transparent Pricing</h3>
                <p className="text-gray-300">
                  Fixed-price contracts with no hidden fees. Includes permits,
                  disposal, and cleanup in every quote.
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
                <h3 className="text-xl font-bold mb-3">Fast Completion</h3>
                <p className="text-gray-300">
                  Efficient demolition services with minimal disruption. Most
                  residential projects completed in 1-3 days.
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
                <h3 className="text-xl font-bold mb-3">Fully Licensed</h3>
                <p className="text-gray-300">
                  Licensed contractors with specialized demolition
                  certifications and comprehensive liability insurance.
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Eco-Friendly</h3>
                <p className="text-gray-300">
                  Sustainable practices with material recycling and responsible
                  disposal. We minimize environmental impact.
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
                <h3 className="text-xl font-bold mb-3">24/7 Emergency</h3>
                <p className="text-gray-300">
                  Emergency demolition services available around the clock for
                  urgent situations and disaster response.
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
                Ready to Start Your Demolition Project?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get your free estimate today. All services include permits,
                safety equipment, and complete cleanup.
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get Your Free Demolition Estimate Today
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Our demolition experts will assess your project, handle all permits, and provide transparent pricing with no hidden fees. 
                We specialize in safe, efficient demolition with complete debris removal and site cleanup.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="#quote-form" 
                  className="inline-block px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-200 text-center text-lg"
                >
                  Get Free Estimate
                </Link>
                <a
                  href="tel:+1-801-691-4065"
                  className="px-8 py-4 border-2 border-red-600 text-red-600 font-bold rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200 text-center text-lg"
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
                Demolition Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our demolition services.
              </p>
            </div>

            <div className="space-y-8">
              {/* FAQ Item 1 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Do I need permits for demolition work?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Most demolition projects require permits from local
                  authorities. We handle all permit applications and coordinate
                  with building departments to ensure compliance. Permit
                  requirements vary by location and project scope, but we guide
                  you through the entire process and include permit costs in our
                  quotes.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How do you handle hazardous materials like asbestos?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We conduct thorough hazardous material assessments before any
                  demolition begins. If asbestos, lead, or other hazardous
                  materials are present, we coordinate with certified abatement
                  specialists to safely remove these materials before
                  demolition. Safety is our top priority, and we follow all EPA
                  and OSHA regulations.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What happens to the debris after demolition?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We handle complete debris removal and disposal as part of our
                  service. We prioritize recycling and responsible disposal
                  methods, salvaging materials when possible. All debris is
                  transported to appropriate facilities, and we provide
                  documentation of proper disposal for your records.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How long does a typical demolition project take?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Project timelines vary based on size and complexity. Interior
                  room demolition typically takes 1-2 days, while complete house
                  demolition may take 3-7 days. Commercial projects range from
                  several days to weeks. We provide detailed timelines during
                  planning and work efficiently to minimize disruption.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Can you perform selective demolition without damaging
                  surrounding areas?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Absolutely! We specialize in precision demolition that
                  preserves structural integrity and protects surrounding areas.
                  Using specialized tools and techniques, we can remove specific
                  walls, sections, or features while leaving the rest of the
                  structure intact. This is ideal for renovations and remodeling
                  projects.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Do you provide emergency demolition services?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes, we offer 24/7 emergency demolition services for urgent
                  situations such as fire damage, storm damage, or structural
                  failures. Our emergency response team can quickly assess
                  dangerous situations and perform immediate stabilization and
                  demolition work to ensure safety and prevent further damage.
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
                Our Demolition Project Gallery
              </h2>
              <p className="text-xl text-gray-600">
                See the precision and safety standards that define our
                demolition work.
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
                      <p className="text-sm">Demolition Gallery Image {item}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {item === 1 && "Interior Kitchen Demolition"}
                      {item === 2 && "Commercial Building Teardown"}
                      {item === 3 && "Selective Wall Removal"}
                      {item === 4 && "Emergency Damage Cleanup"}
                      {item === 5 && "Foundation Removal Project"}
                      {item === 6 && "Warehouse Demolition"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Professional demolition showcasing our commitment to
                      safety and precision.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Ready to see your demolition project completed safely and
                efficiently?
              </p>
              <Link href="#quote-form" className="btn-primary">
                Start Your Project Today
              </Link>
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section
          className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white"
          id="quote-form"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* CTA Content */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Start Your Demolition Project?
                </h2>
                <p className="text-xl text-red-100 mb-8 leading-relaxed">
                  Get your free, comprehensive estimate today. Our demolition
                  experts will assess your project, handle all permits, and
                  provide transparent pricing with no hidden fees.
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
                    <span>Free Site Assessment</span>
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
                    <span>Permit Handling Included</span>
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
                    <span>24-Hour Emergency Service</span>
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
                    <span>Complete Debris Removal</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="tel:+1-801-691-4065"
                    className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center text-lg"
                  >
                    Call (801) 691-4065
                  </a>
                  <a
                    href="https://wa.me/18016914065"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-red-800 text-white font-bold rounded-lg hover:bg-red-900 transition-colors duration-200 text-center text-lg flex items-center justify-center space-x-2"
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
            name: "Wild West Construction - Demolition Services",
            description:
              "Professional demolition services throughout Utah. Interior & exterior demolition, structural teardown, debris removal by licensed contractors with 24-hour emergency service.",
            url: "https://wildwestslc.com/services/demolition",
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
              name: "Demolition Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Interior Demolition",
                    description:
                      "Professional interior demolition including wall removal, kitchen & bathroom teardown.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Structural Demolition",
                    description:
                      "Complete building teardown and structural removal services.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Commercial Demolition",
                    description:
                      "Professional commercial and industrial demolition services.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Emergency Demolition",
                    description:
                      "24/7 emergency demolition services for urgent situations.",
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
