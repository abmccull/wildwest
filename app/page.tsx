import Link from "next/link";
import { Suspense, lazy } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

// Lazy load non-critical components for better performance
const ServiceCard = lazy(() => import("@/components/ServiceCard"));

import { SERVICES, SERVICE_DISPLAY_NAMES } from "@/types/database";

// Utah cities we serve (updated for Wild West Construction's service area)
const utahCities = [
  { name: "Salt Lake City", slug: "salt-lake-city" },
  { name: "West Valley City", slug: "west-valley-city" },
  { name: "West Jordan", slug: "west-jordan" },
  { name: "Sandy", slug: "sandy" },
  { name: "Orem", slug: "orem" },
  { name: "Ogden", slug: "ogden" },
  { name: "Layton", slug: "layton" },
  { name: "Taylorsville", slug: "taylorsville" },
  { name: "Murray", slug: "murray" },
  { name: "Bountiful", slug: "bountiful" },
  { name: "Draper", slug: "draper" },
  { name: "Riverton", slug: "riverton" },
  { name: "Roy", slug: "roy" },
  { name: "Pleasant Grove", slug: "pleasant-grove" },
  { name: "Cottonwood Heights", slug: "cottonwood-heights" },
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Utah&apos;s Premier
                  <span className="block text-red-400">
                    Construction Experts
                  </span>
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Wild West Construction delivers exceptional flooring,
                  demolition, and junk removal services throughout Utah.
                  Licensed, insured, and locally owned - we&apos;re your trusted
                  construction partners.
                </p>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    href="#quote-form"
                    className="inline-block px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-200 text-center text-lg"
                  >
                    Get Free Quote
                  </Link>
                  <a
                    href="tel:+1-801-691-4065"
                    className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-colors duration-200 text-center text-lg"
                  >
                    Call (801) 691-4065
                  </a>
                  <a
                    href="https://wa.me/18016914065"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors duration-200 text-center text-lg flex items-center justify-center space-x-2"
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

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center space-x-8 mt-8 text-blue-200">
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
                    <span className="text-sm">Licensed & Insured</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-sm">5-Star Rated</span>
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm">24hr Response</span>
                  </div>
                </div>
              </div>

              {/* Hero Form */}
              <div
                id="quote-form"
                className="bg-white rounded-lg shadow-2xl p-1"
              >
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

        {/* Services Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Construction Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From flooring installation to complete demolition and junk
                removal, Wild West Construction provides comprehensive
                construction services throughout Utah.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Suspense
                fallback={
                  <div className="h-96 animate-pulse bg-gray-200 rounded-lg"></div>
                }
              >
                {SERVICES.map((service) => (
                  <ServiceCard
                    key={service}
                    title={`${SERVICE_DISPLAY_NAMES[service]} Services`}
                    description={getServiceDescription(service)}
                    features={getServiceFeatures(service)}
                    href={`/services/${service}`}
                    iconType={getServiceIconType(service)}
                  />
                ))}
              </Suspense>
            </div>
          </div>
        </section>

        {/* Cities We Serve */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Cities We Serve in Utah
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Wild West Construction proudly serves communities throughout the
                Salt Lake Valley and surrounding areas with professional
                construction services.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {utahCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-200 text-center"
                >
                  <h3 className="font-semibold text-gray-900 hover:text-blue-600">
                    {city.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">View Services</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                Don&apos;t see your city listed?{" "}
                <a
                  href="tel:+1-801-691-4065"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Call us
                </a>{" "}
                - we serve additional areas throughout Utah!
              </p>
            </div>
          </div>
        </section>

        {/* About Wild West Construction */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Why Choose Wild West Construction?
                </h2>

                <p className="text-lg text-gray-700 mb-6">
                  Since our founding, Wild West Construction has been
                  Utah&apos;s trusted partner for residential and commercial
                  construction projects. We combine old-fashioned craftsmanship
                  with modern techniques to deliver exceptional results.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              {/* Company Info with optimized background */}
              <div className="bg-gray-900 text-white rounded-lg p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 opacity-90"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold">Phone</p>
                        <a
                          href="tel:+1-801-691-4065"
                          className="text-red-400 hover:text-red-300"
                        >
                          (801) 691-4065
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold">Email</p>
                        <a
                          href="mailto:info@wildwestslc.com"
                          className="text-red-400 hover:text-red-300"
                        >
                          info@wildwestslc.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <svg
                        className="w-6 h-6 text-red-400 mt-0.5"
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
                        <p className="font-semibold">Address</p>
                        <p className="text-gray-300">
                          4097 S 420 W<br />
                          Murray, UT 84123
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <a
                        href="https://wa.me/18016914065"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.388" />
                        </svg>
                        <span className="font-semibold">Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Call to Action */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Contact Wild West Construction today for a free consultation and
              estimate. We&apos;re here to make your construction dreams a
              reality.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#quote-form"
                className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get Free Quote
              </a>
              <a
                href="tel:+1-801-691-4065"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-red-600 transition-colors duration-200"
              >
                Call (801) 691-4065
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Helper functions
function getServiceDescription(service: string): string {
  const descriptions = {
    flooring:
      "Professional flooring installation and repair services. From hardwood to tile, we handle all types of flooring projects with expert craftsmanship.",
    demolition:
      "Safe and efficient demolition services for residential and commercial projects. We handle everything from interior remodeling to complete structure removal.",
    junk_removal:
      "Reliable junk removal services for construction debris, household items, and commercial waste. Quick, efficient, and eco-friendly disposal.",
  };

  return (
    descriptions[service as keyof typeof descriptions] ||
    "Professional construction services"
  );
}

function getServiceFeatures(service: string): string[] {
  const features = {
    flooring: [
      "Hardwood installation & refinishing",
      "Tile, vinyl & laminate flooring",
      "Carpet installation & removal",
      "Subfloor repair & preparation",
      "10-year workmanship warranty",
    ],
    demolition: [
      "Interior & exterior demolition",
      "Safe asbestos & lead removal",
      "Structural demolition planning",
      "Debris hauling & disposal",
      "Environmental compliance",
    ],
    junk_removal: [
      "Construction debris removal",
      "Appliance & furniture pickup",
      "Same-day service available",
      "Eco-friendly disposal methods",
      "Commercial cleanouts",
    ],
  };

  return (
    features[service as keyof typeof features] || [
      "Professional service",
      "Licensed & insured",
      "Free estimates",
    ]
  );
}

function getServiceIconType(
  service: string,
):
  | "residential"
  | "commercial"
  | "roofing"
  | "concrete"
  | "electrical"
  | "plumbing"
  | "remodeling"
  | "custom" {
  const iconTypes = {
    flooring: "residential" as const,
    demolition: "commercial" as const,
    junk_removal: "custom" as const,
  };

  return iconTypes[service as keyof typeof iconTypes] || "custom";
}
