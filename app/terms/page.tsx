import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Wild West Construction",
  description:
    "Terms of service for Wild West Construction. Learn about our construction service terms, conditions, warranties, and legal policies in Utah.",
  keywords:
    "terms of service, Wild West Construction, construction terms, Utah contractor, service agreement, warranty terms",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://wildwestslc.com/terms",
  },
  openGraph: {
    title: "Terms of Service | Wild West Construction",
    description:
      "Terms of service for Wild West Construction construction services in Utah.",
    url: "https://wildwestslc.com/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-blue-100">
              These terms govern your use of Wild West Construction services and
              website. Please read carefully before engaging our services.
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Effective Date:</strong> January 1, 2024
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Last Updated:</strong> January 1, 2024
                </p>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    1. Agreement to Terms
                  </h2>
                  <p className="text-gray-700 mb-4">
                    By accessing our website or engaging Wild West Construction
                    for services, you agree to be bound by these Terms of
                    Service and all applicable laws and regulations. If you do
                    not agree with any of these terms, you are prohibited from
                    using our services.
                  </p>
                  <p className="text-gray-700">
                    These terms apply to all users of our services, including
                    customers, website visitors, and any other users of our
                    services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    2. Services Provided
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Wild West Construction provides the following services:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>Flooring installation, repair, and refinishing</li>
                    <li>
                      Demolition services for residential and commercial
                      properties
                    </li>
                    <li>Junk removal and debris hauling</li>
                    <li>General construction and remodeling services</li>
                    <li>
                      Related construction consultation and project management
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    All services are subject to availability, local regulations,
                    and proper licensing requirements.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    3. Service Agreements and Estimates
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Estimates
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>
                      All estimates are provided free of charge for qualified
                      projects
                    </li>
                    <li>
                      Estimates are valid for 30 days unless otherwise specified
                    </li>
                    <li>
                      Final costs may vary based on actual project conditions
                      and scope changes
                    </li>
                    <li>
                      Additional work beyond the original scope requires written
                      approval
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Service Agreements
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                      All projects require a signed service agreement before
                      work begins
                    </li>
                    <li>
                      Payment terms and schedules will be outlined in the
                      service agreement
                    </li>
                    <li>
                      Changes to the original agreement must be approved in
                      writing
                    </li>
                    <li>
                      Customer is responsible for providing access to work areas
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    4. Payment Terms
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Payment Schedule
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>
                      Payment terms will be specified in each service agreement
                    </li>
                    <li>
                      Deposits may be required for materials or large projects
                    </li>
                    <li>
                      Final payment is due upon completion unless financing is
                      arranged
                    </li>
                    <li>We accept cash, check, and major credit cards</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Late Payments
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                      Accounts past due may be subject to a 1.5% monthly service
                      charge
                    </li>
                    <li>
                      Work may be suspended for accounts 30+ days past due
                    </li>
                    <li>
                      Collection costs and legal fees may be added to delinquent
                      accounts
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    5. Warranties and Guarantees
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Workmanship Warranty
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>
                      We provide a 1-year warranty on workmanship for most
                      services
                    </li>
                    <li>
                      Flooring installations include a 2-year workmanship
                      warranty
                    </li>
                    <li>
                      Warranty covers defects in our work, not normal wear and
                      tear
                    </li>
                    <li>
                      Customer must notify us of warranty claims within 30 days
                      of discovery
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Material Warranties
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>Materials are covered by manufacturer warranties</li>
                    <li>
                      We will assist with warranty claims but are not
                      responsible for manufacturer defects
                    </li>
                    <li>
                      Customer-supplied materials are not covered by our
                      warranty
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Warranty Exclusions
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                      Damage caused by misuse, neglect, or normal wear and tear
                    </li>
                    <li>
                      Acts of God, natural disasters, or environmental
                      conditions
                    </li>
                    <li>
                      Modifications made by others after our work is complete
                    </li>
                    <li>
                      Issues arising from customer-supplied materials or
                      specifications
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    6. Liability and Insurance
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Wild West Construction is fully licensed, bonded, and
                    insured:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>General liability insurance up to $1,000,000</li>
                    <li>
                      Workers&apos; compensation insurance for all employees
                    </li>
                    <li>Utah contractor&apos;s license in good standing</li>
                    <li>Bonded for customer protection</li>
                  </ul>
                  <p className="text-gray-700">
                    Our liability is limited to the cost of the contracted
                    services. We are not responsible for indirect,
                    consequential, or incidental damages.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    7. Customer Responsibilities
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Customers are responsible for:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                      Providing accurate information about project requirements
                    </li>
                    <li>Ensuring safe and clear access to work areas</li>
                    <li>
                      Protecting personal property not related to the project
                    </li>
                    <li>
                      Obtaining any required permits (unless specified
                      otherwise)
                    </li>
                    <li>
                      Making timely payments according to the service agreement
                    </li>
                    <li>Notifying us immediately of any concerns or issues</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    8. Cancellation and Refunds
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Customer Cancellation
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>
                      Customers may cancel with 24 hours&apos; notice before
                      work begins
                    </li>
                    <li>
                      Cancellations after work has started may incur charges for
                      completed work
                    </li>
                    <li>
                      Material deposits may be non-refundable if materials have
                      been ordered
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Company Cancellation
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                      We reserve the right to cancel projects for safety or
                      legal reasons
                    </li>
                    <li>
                      Non-payment or breach of agreement may result in project
                      cancellation
                    </li>
                    <li>
                      Full refund of unused deposits will be provided for
                      company cancellations
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    9. Force Majeure
                  </h2>
                  <p className="text-gray-700">
                    We are not liable for delays or inability to perform due to
                    circumstances beyond our reasonable control, including but
                    not limited to: acts of God, natural disasters, government
                    regulations, labor strikes, material shortages, or public
                    health emergencies.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    10. Intellectual Property
                  </h2>
                  <p className="text-gray-700 mb-4">
                    All content on our website, including text, graphics, logos,
                    and images, is the property of Wild West Construction and is
                    protected by copyright and trademark laws.
                  </p>
                  <p className="text-gray-700">
                    Customers grant us permission to photograph completed work
                    for marketing purposes unless specifically requested
                    otherwise in writing.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    11. Dispute Resolution
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Informal Resolution
                  </h3>
                  <p className="text-gray-700 mb-4">
                    We encourage customers to contact us directly to resolve any
                    issues or disputes before pursuing formal legal action.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Governing Law
                  </h3>
                  <p className="text-gray-700 mb-4">
                    These terms are governed by Utah state law. Any legal
                    proceedings must be conducted in Utah courts.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Severability
                  </h3>
                  <p className="text-gray-700">
                    If any provision of these terms is found to be
                    unenforceable, the remaining provisions will remain in full
                    force and effect.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    12. Changes to Terms
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We reserve the right to modify these terms at any time.
                    Updated terms will be posted on our website with the
                    revision date.
                  </p>
                  <p className="text-gray-700">
                    Continued use of our services after changes constitutes
                    acceptance of the new terms. For existing contracts,
                    original terms remain in effect unless both parties agree to
                    changes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    13. Contact Information
                  </h2>
                  <p className="text-gray-700 mb-4">
                    For questions about these terms or our services, contact us:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <strong>Wild West Construction</strong>
                      </p>
                      <p>4097 S 420 W, Murray, UT 84123</p>
                      <p>
                        Phone:{" "}
                        <a
                          href="tel:+1-801-691-4065"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          (801) 691-4065
                        </a>
                      </p>
                      <p>
                        Email:{" "}
                        <a
                          href="mailto:info@wildwestslc.com"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          info@wildwestslc.com
                        </a>
                      </p>
                      <p>
                        Business Hours: Monday-Friday 7:00 AM - 6:00 PM,
                        Saturday 8:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Now that you understand our terms, let&apos;s discuss how we can
              help with your construction needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/contact"
                className="btn-primary inline-block text-center"
              >
                Get Free Estimate
              </a>
              <a
                href="tel:+1-801-691-4065"
                className="btn-outline inline-block text-center"
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
