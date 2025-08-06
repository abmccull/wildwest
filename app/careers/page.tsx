import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Careers at Wild West Construction | Join Utah's Premier Construction Team",
  description:
    "Join Wild West Construction's growing team in Utah. We offer competitive pay, comprehensive benefits, and career growth opportunities in flooring, demolition, and construction services. Apply today!",
  openGraph: {
    title: "Careers at Wild West Construction | Join Utah's Premier Construction Team",
    description:
      "Join Wild West Construction's growing team in Utah. We offer competitive pay, comprehensive benefits, and career growth opportunities in flooring, demolition, and construction services.",
    url: "https://wildwestslc.com/careers",
    siteName: "Wild West Construction",
    images: [
      {
        url: "https://wildwestslc.com/images/careers-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Wild West Construction team working on construction project",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Wild West Construction | Join Utah's Premier Construction Team",
    description:
      "Join Wild West Construction's growing team in Utah. We offer competitive pay, comprehensive benefits, and career growth opportunities in construction services.",
    images: ["https://wildwestslc.com/images/careers-hero.jpg"],
  },
  alternates: {
    canonical: "https://wildwestslc.com/careers",
  },
};

export default function CareersPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Join the
                  <span className="block text-red-400">Wild West Team</span>
                  <span className="block text-3xl md:text-4xl font-semibold text-blue-100 mt-2">
                    Build Your Career in Utah
                  </span>
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Be part of Utah's premier construction company. We're always looking for skilled, 
                  dedicated professionals to join our growing team in flooring, demolition, 
                  and construction services.
                </p>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    href="#apply"
                    className="inline-block px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-200 text-center text-lg"
                  >
                    Apply Today
                  </Link>
                  <a
                    href="tel:+1-801-691-4065"
                    data-source="careers_hero"
                    data-service-type="careers"
                    className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-colors duration-200 text-center text-lg"
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
                    <span className="text-sm">Top-Rated Employer</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-green-400"
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
                    <span className="text-sm">Growing Company</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-blue-400"
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
                    <span className="text-sm">Competitive Benefits</span>
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
                      Wild West Construction team collaboration
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Culture & Benefits */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Work at Wild West Construction?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-400 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join a company that values its employees and invests in their growth. 
                We're not just building structures—we're building careers and futures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Culture Benefit 1 */}
              <div className="bg-white rounded-lg shadow-construction p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Career Growth Opportunities
                </h3>
                <p className="text-gray-700">
                  Clear advancement paths from apprentice to crew leader to project manager. 
                  We promote from within and invest in your professional development.
                </p>
              </div>

              {/* Culture Benefit 2 */}
              <div className="bg-white rounded-lg shadow-construction p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Competitive Compensation
                </h3>
                <p className="text-gray-700">
                  Above-market wages with performance bonuses, overtime opportunities, 
                  and regular pay reviews. Your hard work pays off.
                </p>
              </div>

              {/* Culture Benefit 3 */}
              <div className="bg-white rounded-lg shadow-construction p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Comprehensive Benefits
                </h3>
                <p className="text-gray-700">
                  Health, dental, and vision insurance, 401(k) with company matching, 
                  paid time off, and tool allowances.
                </p>
              </div>

              {/* Culture Benefit 4 */}
              <div className="bg-white rounded-lg shadow-construction p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
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
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Training & Certification
                </h3>
                <p className="text-gray-700">
                  Ongoing training programs, safety certifications, and skills development. 
                  We'll help you earn industry certifications and licenses.
                </p>
              </div>

              {/* Culture Benefit 5 */}
              <div className="bg-white rounded-lg shadow-construction p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Team-First Culture
                </h3>
                <p className="text-gray-700">
                  Work alongside experienced professionals who support each other. 
                  Strong mentorship programs and collaborative work environment.
                </p>
              </div>

              {/* Culture Benefit 6 */}
              <div className="bg-white rounded-lg shadow-construction p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Work-Life Balance
                </h3>
                <p className="text-gray-700">
                  Reasonable schedules, flexible PTO, and family-friendly policies. 
                  We believe in working hard and enjoying life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Openings */}
        <section className="py-16 bg-gray-50" id="openings">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Current Job Openings
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join our growing team and build your career in Utah's construction industry.
              </p>
            </div>

            {/* Job Listings */}
            <div className="space-y-6">
              {/* Job Opening 1 */}
              <div className="bg-white rounded-lg shadow-construction p-6 border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        Flooring Installation Specialist
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Full-Time
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Experienced flooring installer needed for hardwood, LVP, and laminate projects. 
                      2+ years experience preferred.
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        Salt Lake City, UT
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        $22-28/hour
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <Link
                      href="#apply"
                      className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>

              {/* Job Opening 2 */}
              <div className="bg-white rounded-lg shadow-construction p-6 border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        Demolition Crew Member
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Full-Time
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Join our demolition team for residential and commercial projects. 
                      Safety-focused with room for advancement.
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        Murray, UT
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        $18-24/hour
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <Link
                      href="#apply"
                      className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>

              {/* Job Opening 3 */}
              <div className="bg-white rounded-lg shadow-construction p-6 border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        Project Coordinator
                      </h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Full-Time
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Organize schedules, coordinate materials, and communicate with clients. 
                      Construction background preferred.
                    </p>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        Murray, UT
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        $45-55k/year
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <Link
                      href="#apply"
                      className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>

              {/* No Current Openings State - Comment this out when there are active openings */}
              {/* <div className="bg-white rounded-lg shadow-construction p-8 text-center border border-gray-200">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0h8"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Check Back for Opportunities
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  We're always looking for talented individuals to join our team. 
                  While we don't have any specific openings right now, we'd love to hear from you!
                </p>
                <Link
                  href="#apply"
                  className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Submit Your Information
                </Link>
              </div> */}
            </div>

            {/* Always Hiring Notice */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Don't See the Perfect Position?
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                We're a growing company and always interested in connecting with skilled professionals. 
                Send us your resume and we'll reach out when new opportunities arise.
              </p>
              <Link 
                href="#apply" 
                className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Submit Your Resume
              </Link>
            </div>
          </div>
        </section>

        {/* Why Work at Wild West - Utah Focus */}
        <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Be Part of Utah's Construction Industry
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Utah's construction industry is booming, and Wild West Construction is leading the way. 
                Join us and be part of something bigger.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Industry Growth */}
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
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Growing Industry</h3>
                <p className="text-gray-300">
                  Utah's construction sector is experiencing unprecedented growth. 
                  Secure your future in a thriving industry.
                </p>
              </div>

              {/* Local Expertise */}
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
                <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
                <p className="text-gray-300">
                  Work with Utah's top construction professionals. 
                  Build expertise in local building codes and techniques.
                </p>
              </div>

              {/* Community Impact */}
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
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Community Impact</h3>
                <p className="text-gray-300">
                  Help build Utah's homes and businesses. 
                  Make a real difference in your community every day.
                </p>
              </div>

              {/* Career Stability */}
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Career Stability</h3>
                <p className="text-gray-300">
                  Enjoy job security in an essential industry. 
                  Construction skills are always in demand.
                </p>
              </div>

              {/* Competitive Market */}
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Competitive Wages</h3>
                <p className="text-gray-300">
                  Utah's construction wages are competitive with the nation. 
                  Earn well while enjoying lower cost of living.
                </p>
              </div>

              {/* Outdoor Lifestyle */}
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
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Utah Lifestyle</h3>
                <p className="text-gray-300">
                  Work in beautiful Utah with world-class outdoor recreation 
                  just minutes away from any job site.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section className="py-16 bg-white" id="apply">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ready to Apply?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join Wild West Construction and start building your future today. 
                Here's how to get started.
              </p>
            </div>

            {/* Application Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Submit Application
                </h3>
                <p className="text-gray-700">
                  Fill out our application form below or call us directly to discuss opportunities.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Initial Interview
                </h3>
                <p className="text-gray-700">
                  Phone or in-person interview to discuss your experience, goals, and fit with our team.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Start Your Career
                </h3>
                <p className="text-gray-700">
                  Complete onboarding, safety training, and begin your career with Wild West Construction.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 border border-blue-200 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Details */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Get in Touch
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-900">Phone</p>
                        <a
                          href="tel:+1-801-691-4065"
                          data-source="careers_contact"
                          data-service-type="careers"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          (801) 691-4065
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-900">Email</p>
                        <a
                          href="mailto:careers@wildwestslc.com"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          careers@wildwestslc.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <svg
                        className="w-6 h-6 text-blue-600 mt-0.5"
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
                      <div>
                        <p className="font-semibold text-gray-900">Office</p>
                        <p className="text-gray-700">
                          4097 S 420 W<br />
                          Murray, UT 84123
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <strong>Office Hours:</strong><br />
                      Monday - Friday: 7:00 AM - 6:00 PM<br />
                      Saturday: 8:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>

                {/* Quick Application */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Quick Application
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Ready to join our team? Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                  
                  <div className="space-y-4">
                    <Link
                      href="tel:+1-801-691-4065"
                      data-source="careers_apply"
                      data-service-type="careers"
                      className="w-full inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center text-lg"
                    >
                      Call to Apply: (801) 691-4065
                    </Link>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        or email your resume to{" "}
                        <a
                          href="mailto:careers@wildwestslc.com"
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          careers@wildwestslc.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* CTA Content */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Start Your Career Today
                </h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Join Utah's premier construction team and build a rewarding career 
                  with competitive pay, great benefits, and endless growth opportunities.
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
                    <span>Competitive Pay & Benefits</span>
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
                    <span>Career Advancement</span>
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
                    <span>Paid Training & Certification</span>
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
                    <span>Great Team Environment</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="tel:+1-801-691-4065"
                    data-source="careers_cta"
                    data-service-type="careers"
                    className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center text-lg"
                  >
                    Call (801) 691-4065
                  </a>
                  <a
                    href="mailto:careers@wildwestslc.com"
                    className="px-8 py-4 bg-blue-800 text-white font-bold rounded-lg hover:bg-blue-900 transition-colors duration-200 text-center text-lg"
                  >
                    Email Resume
                  </a>
                </div>
              </div>

              {/* Application Form */}
              <div className="bg-white bg-opacity-95 rounded-lg shadow-2xl p-1">
                <Suspense
                  fallback={
                    <div className="h-96 animate-pulse bg-gray-200 rounded"></div>
                  }
                >
                  <LeadForm variant="careers" />
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
            "@type": "Organization",
            name: "Wild West Construction",
            description:
              "Utah's premier construction company offering careers in flooring, demolition, and construction services. Competitive pay, benefits, and growth opportunities.",
            url: "https://wildwestslc.com/careers",
            telephone: "+1-801-691-4065",
            email: "careers@wildwestslc.com",
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
            hasJobPosting: [
              {
                "@type": "JobPosting",
                title: "Flooring Installation Specialist",
                description: "Experienced flooring installer needed for hardwood, LVP, and laminate projects. 2+ years experience preferred.",
                jobLocation: {
                  "@type": "Place",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Salt Lake City",
                    addressRegion: "UT",
                    addressCountry: "US",
                  },
                },
                hiringOrganization: {
                  "@type": "Organization",
                  name: "Wild West Construction",
                },
                employmentType: "FULL_TIME",
                baseSalary: {
                  "@type": "MonetaryAmount",
                  currency: "USD",
                  value: {
                    "@type": "QuantitativeValue",
                    minValue: 22,
                    maxValue: 28,
                    unitText: "HOUR",
                  },
                },
              },
              {
                "@type": "JobPosting",
                title: "Demolition Crew Member",
                description: "Join our demolition team for residential and commercial projects. Safety-focused with room for advancement.",
                jobLocation: {
                  "@type": "Place",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Murray",
                    addressRegion: "UT",
                    addressCountry: "US",
                  },
                },
                hiringOrganization: {
                  "@type": "Organization",
                  name: "Wild West Construction",
                },
                employmentType: "FULL_TIME",
                baseSalary: {
                  "@type": "MonetaryAmount",
                  currency: "USD",
                  value: {
                    "@type": "QuantitativeValue",
                    minValue: 18,
                    maxValue: 24,
                    unitText: "HOUR",
                  },
                },
              },
            ],
            openingHours: "Mo-Fr 07:00-18:00, Sa 08:00-16:00",
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