import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import ServiceCard from "@/components/ServiceCard";

import {
  CITY_DISPLAY_NAMES,
  generateCityHubMetadata,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  getPageBySlug,
  incrementPageViews,
  generateCityPaths,
} from "@/lib/seo";
import {
  SERVICES,
  SERVICE_DISPLAY_NAMES,
  ServiceType,
  PageContent,
} from "@/types/database";

interface CityHubPageProps {
  params: Promise<{
    city: string;
  }>;
}

// Generate static paths for all cities
export async function generateStaticParams() {
  return generateCityPaths();
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: CityHubPageProps): Promise<Metadata> {
  const { city } = await params;

  if (!CITY_DISPLAY_NAMES[city]) {
    return {
      title: "City Not Found",
      description: "The requested city page was not found.",
    };
  }

  const slug = `${city}-hub`;
  const pageData = await getPageBySlug(slug);

  return generateCityHubMetadata(city, pageData ?? undefined);
}

export default async function CityHubPage({ params }: CityHubPageProps) {
  const { city } = await params;

  // Validate city parameter
  if (!CITY_DISPLAY_NAMES[city]) {
    notFound();
  }

  const displayCity = CITY_DISPLAY_NAMES[city];

  // Fetch page data
  const pageData = await getPageBySlug(`${city}-hub`);

  // Track page view if page exists
  if (pageData) {
    await incrementPageViews(pageData.id);
  }

  // Parse page content or use defaults
  const content: PageContent = (pageData?.content as PageContent) || {};

  // Schema markup for SEO
  const localBusinessSchema = generateLocalBusinessSchema(city, SERVICES);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://wildwestslc.com" },
    { name: "Locations", url: "https://wildwestslc.com/locations" },
    {
      name: displayCity,
      url: `https://wildwestslc.com/locations/${city}`,
    },
  ]);

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="min-h-screen">
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
                href="/locations"
                className="text-blue-600 hover:text-red-600 transition-colors"
              >
                Locations
              </Link>
              <span className="text-gray-500">/</span>
              <span className="text-gray-800">{displayCity}</span>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {pageData?.h1 ||
                    `Construction Services in ${displayCity}, Utah`}
                </h1>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  {content.hero_text ||
                    `Professional construction contractors serving ${displayCity} and surrounding areas. Licensed, insured, and experienced in flooring, demolition, and junk removal services.`}
                </p>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href="#quote-form" className="btn-primary text-center">
                    Get Free Quote
                  </Link>
                  <a
                    href="tel:+1-801-691-4065"
                    className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-colors duration-200 text-center"
                  >
                    Call (801) 691-4065
                  </a>
                  <a
                    href="https://wa.me/18016914065"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 btn-whatsapp font-semibold rounded-lg text-center flex items-center justify-center space-x-2"
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

        {/* Services Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Our Services in {displayCity}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {content.service_description ||
                  `We provide comprehensive construction services throughout ${displayCity}, Utah. Click on any service below to learn more about what we offer.`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICES.map((service) => {
                const serviceName = SERVICE_DISPLAY_NAMES[service];

                return (
                  <ServiceCard
                    key={service}
                    title={`${serviceName} Services`}
                    description={getServiceDescription(service, displayCity)}
                    href={`/locations/${city}/${service}`}
                    icon={getServiceIcon(service)}
                    features={[]}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* Deep links to top keyword pages for this city */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Popular searches in {displayCity}</h2>
            <div className="flex flex-wrap gap-3">
              {[
                `hardwood flooring installation`,
                `luxury vinyl plank installation`,
                `kitchen demolition`,
                `bathroom demolition`,
                `construction debris removal`,
                `estate cleanout services`,
              ].map((kw) => (
                <Link
                  key={kw}
                  href={`/${displayCity.toLowerCase().replace(/\s+/g, "-")}-${kw.replace(/\s+/g, "-")}`}
                  className="px-3 py-2 text-sm rounded border hover:border-red-300 hover:bg-red-50"
                >
                  {kw}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* City-Specific Content */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">
                  Why Choose Wild West Construction in {displayCity}?
                </h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">
                    {content.city_description ||
                      `Wild West Construction has been proudly serving ${displayCity}, Utah, and the surrounding areas with professional construction services. Our team of experienced contractors understands the unique needs of ${displayCity} residents and businesses.`}
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    {(
                      content.features || [
                        "Licensed & Insured Contractors",
                        "Free Detailed Estimates",
                        "24/7 Emergency Service",
                        "Local {city} Expertise",
                        "Quality Workmanship Guarantee",
                        "Competitive Pricing",
                      ]
                    ).map((feature, index) => (
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
                          {feature.replace("{city}", displayCity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="text-gray-700">
                    Whether you need flooring installation, demolition services,
                    or junk removal in {displayCity}, our team has the expertise
                    and equipment to handle projects of all sizes. We take pride
                    in delivering quality workmanship on time and within budget.
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-construction p-6 mb-8">
                  <h3 className="text-xl font-bold text-blue-900 mb-4">
                    Service Area
                  </h3>
                  <p className="text-gray-600 mb-4">
                    We proudly serve {displayCity} and the surrounding
                    communities:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {getServiceAreaCities(city).map((serviceCity, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-mustang-yellow rounded-full"></div>
                        <span>{serviceCity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-900 text-white rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-mustang-yellow"
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
                      <a
                        href="tel:+1-801-691-4065"
                        className="hover:text-red-300 transition-colors"
                      >
                        (801) 691-4065
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-mustang-yellow"
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
                      <a
                        href="mailto:info@wildwestslc.com"
                        className="hover:text-red-300 transition-colors"
                      >
                        info@wildwestslc.com
                      </a>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg
                        className="w-5 h-5 text-red-400 mt-0.5"
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
                        <p>4097 S 420 W</p>
                        <p>Murray, UT 84123</p>
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
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm text-gray-200">
                        Monday - Friday: 7:00 AM - 6:00 PM
                        <br />
                        Saturday: 8:00 AM - 4:00 PM
                        <br />
                        Sunday: Emergency calls only
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Cities We Serve */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
                Nearby Cities We Serve
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Wild West Construction proudly serves {displayCity} and the surrounding communities with professional construction services.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {getServiceAreaCities(city).slice(0, 8).map((serviceCity, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-construction hover:shadow-xl transition-shadow duration-300 p-6 text-center group">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-600 transition-colors duration-300">
                    <svg className="w-6 h-6 text-red-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {serviceCity}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Professional construction services
                  </p>
                  <Link
                    href={`/locations/${getServiceAreaCitySlug(serviceCity)}`}
                    className="inline-block px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    View Services
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Don't see your city? We serve the entire Salt Lake area!
              </p>
              <a
                href="tel:+1-801-691-4065"
                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Call (801) 691-4065 for Your Area
              </a>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your {displayCity} Construction Project?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              {content.cta_text ||
                `Contact Wild West Construction today for a free consultation and estimate. We're here to make your construction dreams a reality in ${displayCity}, Utah.`}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#quote-form"
                className="px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Get Free Quote
              </a>
              <a
                href="tel:+1-801-691-4065"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-colors duration-200"
              >
                Call Now
              </a>
              <a
                href="https://wa.me/18016914065"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 btn-whatsapp font-semibold rounded-lg flex items-center justify-center space-x-2"
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
        </section>
      </main>

      <Footer />
    </>
  );
}

// Helper functions
function getServiceDescription(service: ServiceType, city: string): string {
  const descriptions = {
    flooring: `Professional flooring installation and repair services in ${city}. From hardwood to tile, we handle all types of flooring projects.`,
    demolition: `Safe and efficient demolition services in ${city}. Whether residential or commercial, we handle all demolition projects professionally.`,
    junk_removal: `Reliable junk removal services in ${city}. We remove construction debris, household items, and commercial waste quickly and efficiently.`,
  };

  return (
    descriptions[service] ||
    `Professional ${service} services in ${city}, Utah.`
  );
}

function getServiceIcon(service: ServiceType): string {
  const icons = {
    flooring: "🏠",
    demolition: "🔨",
    junk_removal: "🗑️",
  };

  return icons[service] || "🔧";
}

function getServiceAreaCities(city: string): string[] {
  // Return nearby cities based on the main city
  const serviceAreas: Record<string, string[]> = {
    "salt-lake-city": [
      "Murray",
      "West Valley City",
      "Sandy",
      "West Jordan",
      "Taylorsville",
    ],
    "west-valley-city": [
      "Salt Lake City",
      "Taylorsville",
      "West Jordan",
      "Murray",
    ],
    "west-jordan": ["West Valley City", "Sandy", "Riverton", "Taylorsville"],
    sandy: ["Draper", "Cottonwood Heights", "West Jordan", "Murray"],
    murray: ["Salt Lake City", "Taylorsville", "West Jordan", "Sandy"],
    taylorsville: [
      "West Valley City",
      "Murray",
      "West Jordan",
      "Salt Lake City",
    ],
    draper: ["Sandy", "Riverton", "Cottonwood Heights", "West Jordan"],
    riverton: ["Draper", "West Jordan", "Sandy", "Herriman"],
    bountiful: ["Salt Lake City", "Layton", "West Valley City"],
    "cottonwood-heights": ["Sandy", "Murray", "Salt Lake City", "Draper"],
    layton: ["Ogden", "Bountiful", "Roy", "Clearfield"],
    ogden: ["Layton", "Roy", "Bountiful", "Pleasant Grove"],
    orem: ["Pleasant Grove", "Provo", "American Fork", "Lehi"],
    "pleasant-grove": ["Orem", "American Fork", "Lehi", "Lindon"],
    roy: ["Ogden", "Layton", "Clearfield", "Clinton"],
  };

  return (
    serviceAreas[city] || ["Salt Lake County", "Utah County", "Davis County"]
  );
}

function getServiceAreaCitySlug(cityName: string): string {
  // Convert city display names to URL-friendly slugs
  const citySlugMap: Record<string, string> = {
    "Salt Lake City": "salt-lake-city",
    "West Valley City": "west-valley-city",
    "West Jordan": "west-jordan",
    "Sandy": "sandy",
    "Murray": "murray",
    "Taylorsville": "taylorsville",
    "Draper": "draper",
    "Riverton": "riverton",
    "Bountiful": "bountiful",
    "Cottonwood Heights": "cottonwood-heights",
    "Layton": "layton",
    "Ogden": "ogden",
    "Orem": "orem",
    "Pleasant Grove": "pleasant-grove",
    "Roy": "roy",
  };

  return citySlugMap[cityName] || cityName.toLowerCase().replace(/\s+/g, "-");
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;
