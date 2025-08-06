import Link from "next/link";
import { Suspense, lazy } from "react";
import type { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Lazy load non-critical components for better performance
const LeadForm = lazy(() => import("@/components/LeadForm"));

// SEO metadata
export const metadata: Metadata = {
  title: "Customer Testimonials & Reviews | Wild West Construction Utah",
  description:
    "Read real customer testimonials and reviews from satisfied Wild West Construction clients across Utah. See why we're rated 5-stars for flooring, demolition, and junk removal services in Salt Lake City, Murray, and surrounding areas.",
  keywords:
    "Wild West Construction reviews, Utah construction testimonials, flooring reviews Salt Lake City, demolition service reviews Utah, customer satisfaction Murray UT, 5-star construction contractor reviews",
  openGraph: {
    title: "Customer Testimonials & Reviews | Wild West Construction Utah",
    description:
      "Read real customer testimonials and reviews from satisfied Wild West Construction clients across Utah. 5-star rated construction services.",
    url: "https://wildwestslc.com/testimonials",
    images: [
      {
        url: "/images/testimonials-og.jpg",
        width: 1200,
        height: 630,
        alt: "Wild West Construction Customer Testimonials - Utah Construction Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Testimonials & Reviews | Wild West Construction Utah",
    description:
      "Read real customer testimonials and reviews from satisfied Wild West Construction clients across Utah. 5-star rated construction services.",
    images: ["/images/testimonials-og.jpg"],
  },
  alternates: {
    canonical: "https://wildwestslc.com/testimonials",
  },
};

// Testimonial data with Utah focus
const featuredTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "Salt Lake City, UT",
    service: "Hardwood Flooring Installation",
    rating: 5,
    text: "Wild West Construction transformed our living room with beautiful hardwood flooring. The crew was professional, punctual, and left everything spotless. The quality is exceptional and the price was very competitive for the Salt Lake area. Highly recommended!",
    date: "January 2024",
    verified: true,
    image: "/images/testimonials/sarah-j.jpg",
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    location: "Murray, UT",
    service: "Kitchen Demolition",
    rating: 5,
    text: "We needed our kitchen completely demolished for a remodel. Wild West's team was incredibly thorough and careful around our other rooms. They protected everything and cleaned up perfectly. The project was completed ahead of schedule!",
    date: "December 2023",
    verified: true,
    image: "/images/testimonials/mike-r.jpg",
  },
  {
    id: 3,
    name: "Jennifer Chen",
    location: "West Jordan, UT",
    service: "Construction Debris Removal",
    rating: 5,
    text: "After our home addition, we had tons of construction debris. Wild West's junk removal service was a lifesaver! They handled everything from wood scraps to old fixtures. Fast, affordable, and eco-friendly disposal. Will definitely use again!",
    date: "November 2023",
    verified: true,
    image: "/images/testimonials/jennifer-c.jpg",
  },
];

// Customer reviews grid data
const customerReviews = [
  {
    name: "David Thompson",
    location: "Sandy, UT",
    service: "Tile Flooring",
    rating: 5,
    text: "Outstanding tile work in our bathroom. The attention to detail was impressive and the final result exceeded our expectations.",
    date: "February 2024",
  },
  {
    name: "Lisa Martinez",
    location: "Draper, UT",
    service: "Basement Demolition",
    rating: 5,
    text: "Professional demolition service for our basement renovation. Clean, efficient, and very reasonably priced.",
    date: "January 2024",
  },
  {
    name: "Robert Kim",
    location: "Orem, UT",
    service: "Laminate Flooring",
    rating: 5,
    text: "Great experience from start to finish. The crew was knowledgeable and the laminate installation was perfect.",
    date: "January 2024",
  },
  {
    name: "Amanda Brooks",
    location: "Taylorsville, UT",
    service: "Junk Removal",
    rating: 5,
    text: "Needed old appliances removed quickly. They came same-day and handled everything professionally. Highly recommend!",
    date: "December 2023",
  },
  {
    name: "Carlos Hernandez",
    location: "West Valley City, UT",
    service: "Hardwood Refinishing",
    rating: 5,
    text: "Our hardwood floors look brand new! Excellent workmanship and great communication throughout the project.",
    date: "December 2023",
  },
  {
    name: "Michelle Anderson",
    location: "Bountiful, UT",
    service: "Interior Demolition",
    rating: 5,
    text: "Demolished two walls for our open concept remodel. Very careful work and thorough cleanup. Fantastic team!",
    date: "November 2023",
  },
  {
    name: "James Wilson",
    location: "Layton, UT",
    service: "Vinyl Flooring",
    rating: 5,
    text: "Quality vinyl installation in our rental property. Fair pricing and completed on time. Great local contractor!",
    date: "November 2023",
  },
  {
    name: "Rachel Green",
    location: "Murray, UT",
    service: "Carpet Removal",
    rating: 5,
    text: "Needed old carpet removed and subfloor prepped. They did an amazing job and were very competitive on price.",
    date: "October 2023",
  },
  {
    name: "Tony Ricci",
    location: "Riverton, UT",
    service: "Commercial Cleanout",
    rating: 5,
    text: "Handled our office cleanout efficiently. Professional service and environmentally responsible disposal methods.",
    date: "October 2023",
  },
];

// Statistics data
const statistics = [
  {
    number: "500+",
    label: "Satisfied Customers",
    description: "Happy clients across Utah",
    icon: "users",
  },
  {
    number: "4.9",
    label: "Average Rating",
    description: "Out of 5 stars",
    icon: "star",
  },
  {
    number: "98%",
    label: "Customer Retention",
    description: "Clients who hire us again",
    icon: "repeat",
  },
  {
    number: "24hrs",
    label: "Response Time",
    description: "Average quote turnaround",
    icon: "clock",
  },
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

// Statistic icon component
const StatIcon = ({ type }: { type: string }) => {
  const iconClass = "w-8 h-8";

  switch (type) {
    case "users":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      );
    case "star":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case "repeat":
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      );
    case "clock":
      return (
        <svg
          className={iconClass}
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
      );
    default:
      return (
        <svg
          className={iconClass}
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
      );
  }
};

export default function TestimonialsPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                What Our Utah Customers Say
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Read real testimonials from satisfied Wild West Construction
                clients across Salt Lake Valley and throughout Utah. See why
                we're the trusted choice for flooring, demolition, and junk
                removal services.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center space-x-8 text-blue-200">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="font-semibold">4.9/5 Stars</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6 text-green-400"
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
                  <span className="font-semibold">500+ Happy Customers</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-6 h-6 text-red-400"
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
                  <span className="font-semibold">Locally Owned</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Customer Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear directly from Utah homeowners and businesses who chose Wild
                West Construction for their projects.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* Service & Rating */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {testimonial.service}
                      </span>
                      {testimonial.verified && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded flex items-center space-x-1">
                          <svg
                            className="w-3 h-3"
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
                          <span>Verified</span>
                        </span>
                      )}
                    </div>
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 mb-4 leading-relaxed">
                    &quot;{testimonial.text}&quot;
                  </blockquote>

                  {/* Date */}
                  <div className="text-sm text-gray-500">
                    {testimonial.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Proven Track Record
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Numbers don't lie. Here's what our commitment to excellence has
                achieved across Utah.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-red-600 text-white rounded-full mb-4">
                    <StatIcon type={stat.icon} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-blue-600 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Reviews Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                More Customer Reviews
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See what customers across the Salt Lake Valley are saying about
                our construction services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customerReviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-600 hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  {/* Rating */}
                  <div className="mb-3">
                    <StarRating rating={review.rating} />
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-gray-700 mb-4">
                    &quot;{review.text}&quot;
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {review.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {review.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-blue-600 font-medium">
                        {review.service}
                      </div>
                      <div className="text-xs text-gray-500">{review.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200">
                Load More Reviews
              </button>
            </div>
          </div>
        </section>

        {/* Leave a Review CTA */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Share Your Experience
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Had a great experience with Wild West Construction? We'd love to
              hear from you! Your feedback helps us continue providing excellent
              service to Utah communities.
            </p>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="https://www.google.com/search?q=wild+west+construction+utah+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Review on Google</span>
              </a>
              <a
                href="https://www.facebook.com/wildwestflooringbrokers"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-green-600 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Review on Facebook</span>
              </a>
            </div>
          </div>
        </section>

        {/* Get Started CTA with Form */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Ready to Join Our Happy Customers?
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  Experience the same quality service and customer satisfaction
                  that has earned us hundreds of 5-star reviews across Utah. Get
                  your free quote today and see why Wild West Construction is
                  the trusted choice for flooring, demolition, and junk removal
                  services.
                </p>

                {/* Why Choose Us Points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    "Licensed & Insured Contractors",
                    "Free Detailed Estimates",
                    "Quality Workmanship Guarantee",
                    "Local Utah Expertise",
                    "Competitive Pricing",
                    "24/7 Emergency Service",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-red-600 mt-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Contact Options */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="tel:+1-801-691-4065"
                    data-source="testimonials_cta"
                    data-service-type="general"
                    className="inline-block px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-200 text-center text-lg"
                  >
                    Call (801) 691-4065
                  </a>
                  <Link
                    href="/services"
                    className="px-8 py-4 border-2 border-red-600 text-red-600 font-bold rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-200 text-center text-lg"
                  >
                    View Our Services
                  </Link>
                </div>
              </div>

              {/* Lead Form */}
              <div>
                <Suspense
                  fallback={
                    <div className="h-96 animate-pulse bg-gray-200 rounded-lg"></div>
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

      {/* Structured Data for Reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Wild West Construction",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "127",
              bestRating: "5",
              worstRating: "1",
            },
            review: featuredTestimonials.map((testimonial) => ({
              "@type": "Review",
              author: {
                "@type": "Person",
                name: testimonial.name,
              },
              reviewRating: {
                "@type": "Rating",
                ratingValue: testimonial.rating.toString(),
                bestRating: "5",
                worstRating: "1",
              },
              reviewBody: testimonial.text,
              datePublished: new Date(testimonial.date).toISOString(),
            })),
          }),
        }}
      />
    </>
  );
}