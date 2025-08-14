import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  getPageBySlug,
  incrementPageViews,
  generateDatabasePageMetadata,
  CITY_DISPLAY_NAMES,
} from "@/lib/seo";
import {
  SERVICE_DISPLAY_NAMES,
  ServiceType,
  PageContent,
  Page,
} from "@/types/database";
import { createServerClient } from "@/lib/supabase-server";

interface DynamicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all pages in the database
export async function generateStaticParams() {
  try {
    const supabase = await createServerClient();

    const { data: pages, error } = await supabase
      .from("pages")
      .select("slug")
      .eq("published", true);

    if (error) {
      console.error("Error fetching pages for static generation:", error);
      return [];
    }

    return (pages || []).map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

// Generate metadata for SEO with canonical conflict resolution
export async function generateMetadata({
  params,
}: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;

  // Get page data from database
  const pageData = await getPageBySlug(slug);

  if (!pageData) {
    return {
      title: "Page Not Found | Wild West Construction",
      description: "The requested page was not found.",
      alternates: {
        canonical: `https://wildwestslc.com/404`,
      },
    };
  }

  // Use enhanced metadata generation with conflict resolution
  return generateDatabasePageMetadata(slug, pageData);
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { slug } = await params;

  // Fetch page data from database
  const pageData = await getPageBySlug(slug);

  // If page not found, try to redirect to nested URL structure
  if (!pageData) {
    const redirectUrl = attemptCityServiceRedirect(slug);
    if (redirectUrl) {
      redirect(redirectUrl);
    }
    notFound();
  }

  // Track page view
  await incrementPageViews(pageData.id);

  const serviceName = SERVICE_DISPLAY_NAMES[pageData.service];
  const content: PageContent = (pageData.content as PageContent) || {};

  // Default FAQ data based on page content
  const defaultFAQs = [
    {
      question: `What does Wild West Construction's ${serviceName.toLowerCase()} service include in ${pageData.city}?`,
      answer: `Our ${serviceName.toLowerCase()} service in ${pageData.city} includes professional consultation, detailed planning, quality materials, expert installation, and comprehensive cleanup. We ensure every project meets the highest standards and exceeds your expectations.`,
    },
    {
      question: `How long does a typical ${serviceName.toLowerCase()} project take in ${pageData.city}?`,
      answer: `Project timelines vary depending on scope and complexity. Most ${serviceName.toLowerCase()} projects in ${pageData.city} are completed within 1-3 days. We'll provide a detailed timeline during your free consultation and keep you informed throughout the process.`,
    },
    {
      question: `Do you provide free estimates for ${serviceName.toLowerCase()} services in ${pageData.city}?`,
      answer: `Yes, we provide free, detailed estimates for all ${serviceName.toLowerCase()} projects in ${pageData.city}. Our estimates include material costs, labor, timeline, and any additional services needed. Contact us today to schedule your consultation.`,
    },
    {
      question: `Are you licensed and insured for ${serviceName.toLowerCase()} work in Utah?`,
      answer: `Absolutely. Wild West Construction is fully licensed, bonded, and insured for all ${serviceName.toLowerCase()} services throughout Utah, including ${pageData.city}. We maintain all required certifications and carry comprehensive liability insurance for your protection.`,
    },
  ];

  // Generate schema markup for SEO
  const serviceSchema = generateServiceSchema(pageData);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://wildwestslc.com" },
    {
      name: pageData.keyword,
      url: `https://wildwestslc.com/${slug}`,
    },
  ]);
  const faqSchema = generateFAQSchema(content.faq || defaultFAQs);

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              <span className="text-gray-800">{pageData.keyword}</span>
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
                  {pageData.h1}
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  {content.hero_text ||
                    `Wild West Construction provides expert ${serviceName.toLowerCase()} services in ${pageData.city} and surrounding areas. Licensed, insured, and experienced contractors you can trust.`}
                </p>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    href="#quote-form"
                    className="inline-block px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-200 text-center"
                  >
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Service Overview */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {serviceName} Services in {pageData.city}, Utah
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="mb-6">
                    {content.service_description ||
                      getDefaultServiceDescription(pageData.service, pageData.city)}
                  </p>

                  {/* Service Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    {getServiceFeatures(pageData.service).map((feature, index) => (
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

                  <p>
                    At Wild West Construction, we take pride in delivering
                    exceptional {serviceName.toLowerCase()} services throughout{" "}
                    {pageData.city} and the surrounding Utah communities. Our
                    experienced team uses quality materials and proven
                    techniques to ensure your project is completed to the
                    highest standards.
                  </p>
                </div>
              </section>

              {/* Process Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our {serviceName} Process
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getServiceProcess(pageData.service).map((step, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 ml-3">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ Section */}
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-6">
                  {(content.faq || defaultFAQs).map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg p-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Services */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  More Services in {pageData.city}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Explore all our construction services available in{" "}
                  {pageData.city}
                </p>
                <Link
                  href="/services"
                  className="inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                >
                  View All Services
                </Link>
              </div>

              {/* Contact Info */}
              <div className="bg-gray-900 text-white rounded-lg p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">
                  Contact Wild West Construction
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-red-400"
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
                      className="hover:text-red-400 transition-colors"
                    >
                      (801) 691-4065
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-red-400"
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
                      className="hover:text-red-400 transition-colors"
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
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Why Choose Us
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-green-500"
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
                    <span className="text-sm text-gray-700">
                      Licensed & Insured
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-green-500"
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
                    <span className="text-sm text-gray-700">
                      Free Estimates
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-green-500"
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
                    <span className="text-sm text-gray-700">
                      Quality Guarantee
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-green-500"
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
                    <span className="text-sm text-gray-700">
                      Local Utah Experts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your {serviceName} Project in {pageData.city}?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {content.cta_text ||
                `Contact Wild West Construction today for a free consultation and estimate. We're ready to handle your ${serviceName.toLowerCase()} project in ${pageData.city}, Utah.`}
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
                Call (801) 691-4065
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
function getDefaultServiceDescription(
  service: ServiceType,
  city: string,
): string {
  const descriptions = {
    flooring: `Wild West Construction provides comprehensive flooring services in ${city}, Utah. From hardwood and laminate to tile and carpet installation, our experienced team delivers quality results. We handle residential and commercial projects of all sizes, ensuring proper preparation, expert installation, and thorough cleanup.`,
    demolition: `Our professional demolition services in ${city} include interior and exterior demolition, debris removal, and site preparation. Whether you're renovating your home or preparing for new construction, Wild West Construction has the equipment and expertise to handle your demolition project safely and efficiently.`,
    junk_removal: `Wild West Construction offers reliable junk removal services throughout ${city}, Utah. We remove construction debris, household items, yard waste, and commercial waste quickly and efficiently. Our team handles all the heavy lifting and ensures proper disposal and recycling when possible.`,
  };

  return (
    descriptions[service] ||
    `Professional ${service} services in ${city}, Utah.`
  );
}

function getServiceFeatures(service: ServiceType): string[] {
  const features = {
    flooring: [
      "Hardwood Installation & Refinishing",
      "Laminate & Vinyl Flooring",
      "Tile & Stone Installation",
      "Carpet Installation & Removal",
      "Subfloor Preparation & Repair",
      "Professional Floor Sanding",
    ],
    demolition: [
      "Interior Wall Removal",
      "Exterior Demolition",
      "Kitchen & Bathroom Demo",
      "Concrete Removal",
      "Safe Asbestos Handling",
      "Complete Debris Cleanup",
    ],
    junk_removal: [
      "Construction Debris Removal",
      "Household Junk Removal",
      "Appliance Removal",
      "Yard Waste Cleanup",
      "Estate Cleanouts",
      "Commercial Waste Removal",
    ],
  };

  return features[service] || [];
}

function getServiceProcess(
  service: ServiceType,
): Array<{ title: string; description: string }> {
  const processes = {
    flooring: [
      {
        title: "Consultation",
        description:
          "We assess your space, discuss material options, and provide a detailed estimate for your flooring project.",
      },
      {
        title: "Preparation",
        description:
          "We prepare the subfloor, ensure proper moisture levels, and create optimal conditions for installation.",
      },
      {
        title: "Installation",
        description:
          "Our skilled craftsmen install your flooring with precision, attention to detail, and quality workmanship.",
      },
    ],
    demolition: [
      {
        title: "Planning",
        description:
          "We evaluate the structure, obtain necessary permits, and create a safe demolition plan for your project.",
      },
      {
        title: "Preparation",
        description:
          "We protect surrounding areas, disconnect utilities, and set up safety measures before demolition begins.",
      },
      {
        title: "Demolition",
        description:
          "Our team carefully demolishes the structure, removes debris, and leaves your site clean and ready.",
      },
    ],
    junk_removal: [
      {
        title: "Assessment",
        description:
          "We evaluate the items to be removed and provide you with an upfront, transparent pricing estimate.",
      },
      {
        title: "Removal",
        description:
          "Our team handles all the heavy lifting and loading, removing unwanted items from your property.",
      },
      {
        title: "Disposal",
        description:
          "We responsibly dispose of items, recycling when possible and donating usable goods to local charities.",
      },
    ],
  };

  return processes[service] || [];
}

// Custom service schema generator for dynamic pages
function generateServiceSchema(pageData: Page) {
  const serviceName = SERVICE_DISPLAY_NAMES[pageData.service];

  return {
    "@context": "https://schema.org",
    "@type": ["Service", "LocalBusiness"],
    "@id": `https://wildwestslc.com/${pageData.slug}`,
    name: pageData.meta_title,
    alternateName: `${pageData.city} ${serviceName} Services`,
    description: pageData.meta_description,
    url: `https://wildwestslc.com/${pageData.slug}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://wildwestslc.com",
      name: "Wild West Construction",
      telephone: "+1-801-691-4065",
      email: "info@wildwestslc.com",
      url: "https://wildwestslc.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4097 S 420 W",
        addressLocality: "Murray",
        addressRegion: "UT",
        postalCode: "84123",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "247",
      },
    },
    areaServed: [
      {
        "@type": "City",
        name: pageData.city,
        containedInPlace: {
          "@type": "State",
          name: "Utah",
          containedInPlace: {
            "@type": "Country",
            name: "United States",
          },
        },
      },
    ],
    serviceType: serviceName,
    offers: {
      "@type": "Offer",
      description: `Professional ${serviceName.toLowerCase()} services in ${pageData.city}`,
      priceRange: "$$",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0],
      eligibleRegion: {
        "@type": "Place",
        name: `${pageData.city}, Utah`,
      },
    },
  };
}

// Helper function to attempt redirecting flat slugs to nested structure
function attemptCityServiceRedirect(slug: string): string | null {
  // Parse pattern: city-service or city-service-keywords
  const parts = slug.split('-');
  
  if (parts.length < 2) return null;
  
  const validServices = ['flooring', 'demolition', 'junk', 'junk_removal'];
  
  // Try to find city-service pattern
  for (let i = 1; i < parts.length; i++) {
    const cityPart = parts.slice(0, i).join('-');
    const servicePart = parts[i];
    
    // Handle junk removal special case
    let normalizedService = servicePart;
    if (servicePart === 'junk' && parts[i + 1] === 'removal') {
      normalizedService = 'junk-removal';
    } else if (servicePart === 'junk_removal') {
      normalizedService = 'junk-removal';
    }
    
    // Check if this matches a valid city-service pattern that should be redirected
    // This helps with canonical URL consistency
    if (CITY_DISPLAY_NAMES[cityPart] && ['flooring', 'demolition', 'junk-removal'].includes(normalizedService)) {
      console.log(`Redirecting ${slug} to canonical location route: /locations/${cityPart}/${normalizedService}`);
      return `/locations/${cityPart}/${normalizedService}`;
    }
  }
  
  return null;
}

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;