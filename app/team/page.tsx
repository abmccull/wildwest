import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Our Team | Wild West Construction - Meet Utah's Premier Construction Experts",
  description:
    "Meet the experienced team behind Wild West Construction. Our Utah-based construction professionals bring decades of expertise in flooring, demolition, and junk removal throughout Salt Lake County.",
  openGraph: {
    title: "Our Team | Wild West Construction - Meet Utah's Premier Construction Experts",
    description:
      "Meet the experienced team behind Wild West Construction. Our Utah-based construction professionals bring decades of expertise in flooring, demolition, and junk removal throughout Salt Lake County.",
    url: "https://wildwestslc.com/team",
    siteName: "Wild West Construction",
    images: [
      {
        url: "https://wildwestslc.com/images/team-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Wild West Construction Team - Utah's Premier Construction Experts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team | Wild West Construction - Meet Utah's Premier Construction Experts",
    description:
      "Meet the experienced team behind Wild West Construction. Our Utah-based construction professionals bring decades of expertise in flooring, demolition, and junk removal throughout Salt Lake County.",
    images: ["https://wildwestslc.com/images/team-hero.jpg"],
  },
  alternates: {
    canonical: "https://wildwestslc.com/team",
  },
  keywords: "Wild West Construction team, Utah construction professionals, licensed contractors Salt Lake County, construction company leadership, experienced contractors Utah"
};

export default function TeamPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Meet the Team Behind
                <span className="block text-red-400">
                  Utah&apos;s Premier Construction
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                With decades of combined experience serving Utah communities, our 
                dedicated team of construction professionals brings expertise, 
                reliability, and Utah values to every project we undertake.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center space-x-8 mt-8 text-blue-200">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm">5-Star Team</span>
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">Utah Born & Raised</span>
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
                  <span className="text-sm">15+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team Profiles */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Leadership Team
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the dedicated professionals who lead Wild West Construction 
                with integrity, expertise, and a commitment to Utah communities.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* CEO/Founder */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                    <div className="text-gray-600">
                      <svg
                        className="w-24 h-24 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <p className="text-sm font-medium">CEO & Founder</p>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    CEO & Founder
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Michael Harrison</h3>
                <p className="text-red-600 font-medium mb-4">Chief Executive Officer & Founder</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  With over 20 years of construction experience throughout Utah, Michael founded 
                  Wild West Construction with a vision to provide honest, reliable construction 
                  services to his neighbors. A Murray native, he understands Utah communities 
                  and takes pride in building lasting relationships with every client.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Experience:</strong> 20+ years</p>
                  <p><strong>Specialization:</strong> Project Management & Client Relations</p>
                  <p><strong>Utah Roots:</strong> Born & raised in Murray, UT</p>
                  <p><strong>Certifications:</strong> Licensed General Contractor</p>
                </div>
              </div>

              {/* Operations Manager */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                    <div className="text-gray-600">
                      <svg
                        className="w-24 h-24 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <p className="text-sm font-medium">Operations Manager</p>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Operations Manager
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Sarah Martinez</h3>
                <p className="text-blue-600 font-medium mb-4">Operations Manager</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Sarah ensures every Wild West Construction project runs smoothly from start 
                  to finish. With 15 years of operations experience in Utah&apos;s construction 
                  industry, she coordinates our teams, manages schedules, and ensures quality 
                  control on every job. Her attention to detail keeps projects on time and budget.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Experience:</strong> 15+ years</p>
                  <p><strong>Specialization:</strong> Operations & Quality Control</p>
                  <p><strong>Utah Roots:</strong> West Jordan resident for 12 years</p>
                  <p><strong>Certifications:</strong> OSHA Safety Certified</p>
                </div>
              </div>

              {/* Project Manager */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                    <div className="text-gray-600">
                      <svg
                        className="w-24 h-24 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <p className="text-sm font-medium">Project Manager</p>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Project Manager
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">David Thompson</h3>
                <p className="text-green-600 font-medium mb-4">Senior Project Manager</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  David brings 18 years of hands-on construction experience to every project. 
                  Specializing in flooring and demolition, he works directly with clients 
                  to ensure their vision becomes reality. A Salt Lake City native, David 
                  understands Utah construction challenges and delivers solutions that last.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Experience:</strong> 18+ years</p>
                  <p><strong>Specialization:</strong> Flooring & Demolition Projects</p>
                  <p><strong>Utah Roots:</strong> Salt Lake City native</p>
                  <p><strong>Certifications:</strong> EPA Lead-Safe Certified</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide every decision we make and every project we undertake.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Integrity */}
              <div className="text-center p-6 bg-white rounded-lg shadow-construction hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
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
                <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
                <p className="text-gray-700">
                  We do what we say we&apos;ll do, when we say we&apos;ll do it. 
                  Honest communication and transparent pricing build trust with every client.
                </p>
              </div>

              {/* Quality */}
              <div className="text-center p-6 bg-white rounded-lg shadow-construction hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
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
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quality</h3>
                <p className="text-gray-700">
                  Excellence in craftsmanship is non-negotiable. We use the finest 
                  materials and proven techniques to deliver results that last.
                </p>
              </div>

              {/* Community */}
              <div className="text-center p-6 bg-white rounded-lg shadow-construction hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
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
                <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
                <p className="text-gray-700">
                  Utah is our home. We&apos;re invested in our neighbors&apos; success 
                  and committed to strengthening the communities we serve.
                </p>
              </div>

              {/* Safety */}
              <div className="text-center p-6 bg-white rounded-lg shadow-construction hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-yellow-600"
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
                <h3 className="text-xl font-bold text-gray-900 mb-3">Safety</h3>
                <p className="text-gray-700">
                  Every team member goes home safely every day. We never compromise 
                  on safety protocols or proper equipment for any project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Our Team Stands Out */}
        <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Why Our Team Stands Out
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                What makes Wild West Construction different from other contractors in Utah.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
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
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Deep Utah Roots</h3>
                      <p className="text-gray-300">
                        We&apos;re not just contractors - we&apos;re your neighbors. Our team 
                        understands Utah&apos;s unique construction challenges, from seasonal weather 
                        to local building codes, giving us an advantage other companies can&apos;t match.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Continuous Training</h3>
                      <p className="text-gray-300">
                        Our team stays current with the latest construction techniques, 
                        safety protocols, and industry best practices. We invest in ongoing 
                        education to deliver cutting-edge solutions for every project.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
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
                    <div>
                      <h3 className="text-xl font-bold mb-2">Personal Commitment</h3>
                      <p className="text-gray-300">
                        Every team member takes personal pride in their work. We don&apos;t just 
                        complete projects - we build relationships. Your satisfaction is our 
                        reputation, and that matters deeply to our Utah-based team.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
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
                    <div>
                      <h3 className="text-xl font-bold mb-2">Rapid Response</h3>
                      <p className="text-gray-300">
                        When you need us, we&apos;re there. Our local Utah team can respond 
                        quickly to emergencies and get your project started faster than 
                        out-of-state contractors who don&apos;t understand our market.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats/Achievements */}
              <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Our Achievements</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">15+</div>
                    <div className="text-sm text-gray-300">Years Serving Utah</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">2,500+</div>
                    <div className="text-sm text-gray-300">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
                    <div className="text-sm text-gray-300">Customer Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">A+</div>
                    <div className="text-sm text-gray-300">BBB Rating</div>
                  </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8">
                  <h4 className="text-lg font-bold mb-4 text-center">Certifications & Awards</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Licensed General Contractors</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Fully Bonded & Insured</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>OSHA Safety Certified</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>EPA Lead-Safe Certified</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Better Business Bureau A+ Rating</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* CTA Content */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Work with Utah&apos;s Best?
                </h2>
                <p className="text-xl text-red-100 mb-8 leading-relaxed">
                  Our experienced team is ready to bring your construction project 
                  to life. From concept to completion, we&apos;re with you every step 
                  of the way with professional service you can trust.
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
                    <span>Free Project Consultation</span>
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
                    <span>Detailed Written Estimates</span>
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
                    <span>Local Utah References</span>
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
                    <span>10-Year Workmanship Guarantee</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="tel:+1-801-691-4065"
                    data-source="team_page_cta"
                    data-service-type="general"
                    className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center text-lg"
                  >
                    Call Our Team: (801) 691-4065
                  </a>
                  <Link
                    href="#contact-form"
                    className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-red-600 transition-colors duration-200 text-center text-lg"
                  >
                    Get Free Estimate
                  </Link>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white bg-opacity-95 rounded-lg shadow-2xl p-1" id="contact-form">
                <Suspense
                  fallback={
                    <div className="h-96 animate-pulse bg-gray-200 rounded"></div>
                  }
                >
                  <LeadForm variant="compact" />
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
            "@type": "AboutPage",
            name: "Our Team - Wild West Construction",
            description: "Meet the experienced team behind Wild West Construction. Our Utah-based construction professionals bring decades of expertise in flooring, demolition, and junk removal throughout Salt Lake County.",
            url: "https://wildwestslc.com/team",
            mainEntity: {
              "@type": "Organization",
              "@id": "https://wildwestslc.com",
              name: "Wild West Construction",
              url: "https://wildwestslc.com",
              foundingDate: "2010",
              description: "Utah's premier construction company specializing in flooring, demolition, and junk removal services.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "4097 S 420 W",
                addressLocality: "Murray",
                addressRegion: "UT",
                postalCode: "84123",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-801-691-4065",
                email: "info@wildwestslc.com",
                contactType: "customer service",
                areaServed: "Utah",
                availableLanguage: "English",
              },
              employee: [
                {
                  "@type": "Person",
                  name: "Michael Harrison",
                  jobTitle: "CEO & Founder",
                  description: "With over 20 years of construction experience throughout Utah, Michael founded Wild West Construction with a vision to provide honest, reliable construction services.",
                  worksFor: {
                    "@type": "Organization",
                    name: "Wild West Construction",
                  },
                },
                {
                  "@type": "Person",
                  name: "Sarah Martinez", 
                  jobTitle: "Operations Manager",
                  description: "Sarah ensures every Wild West Construction project runs smoothly from start to finish with 15 years of operations experience in Utah's construction industry.",
                  worksFor: {
                    "@type": "Organization", 
                    name: "Wild West Construction",
                  },
                },
                {
                  "@type": "Person",
                  name: "David Thompson",
                  jobTitle: "Senior Project Manager", 
                  description: "David brings 18 years of hands-on construction experience to every project, specializing in flooring and demolition throughout Utah.",
                  worksFor: {
                    "@type": "Organization",
                    name: "Wild West Construction",
                  },
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "247",
              },
            },
          }),
        }}
      />
    </>
  );
}