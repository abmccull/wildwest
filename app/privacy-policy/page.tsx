import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Wild West Construction",
  description:
    "Wild West Construction's privacy policy explains how we collect, use, and protect your personal information. GDPR and CCPA compliant privacy practices.",
  keywords:
    "privacy policy, Wild West Construction, GDPR, CCPA, data protection, Utah construction",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://wildwestslc.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Wild West Construction",
    description:
      "Wild West Construction's privacy policy explains how we collect, use, and protect your personal information.",
    url: "https://wildwestslc.com/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-blue-100">
              Your privacy is important to us. This policy explains how Wild
              West Construction collects, uses, and protects your personal
              information.
            </p>
          </div>
        </section>

        {/* Privacy Policy Content */}
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
                    1. Information We Collect
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Personal Information
                  </h3>
                  <p className="text-gray-700 mb-4">
                    When you contact us or request services, we may collect:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                    <li>
                      Name and contact information (phone, email, address)
                    </li>
                    <li>Project details and service requirements</li>
                    <li>Communication preferences</li>
                    <li>Payment and billing information</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Automatically Collected Information
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>IP address and device information</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on our website</li>
                    <li>Referral sources and search terms</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    2. How We Use Your Information
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We use your information to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                      Provide construction services and respond to inquiries
                    </li>
                    <li>
                      Schedule appointments and communicate about projects
                    </li>
                    <li>Process payments and maintain business records</li>
                    <li>Improve our services and website experience</li>
                    <li>
                      Send service updates and promotional communications (with
                      consent)
                    </li>
                    <li>
                      Comply with legal obligations and protect our business
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    3. Information Sharing
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We do not sell or rent your personal information. We may
                    share information with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>
                      <strong>Service Providers:</strong> Third-party
                      contractors and suppliers who assist with projects
                    </li>
                    <li>
                      <strong>Business Partners:</strong> Trusted partners who
                      help us provide services
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> When required by law
                      or to protect our rights
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> In connection with a
                      merger, acquisition, or sale
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    4. Data Security
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We implement appropriate security measures to protect your
                    information:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers and regular security updates</li>
                    <li>Access controls and employee training</li>
                    <li>Regular security audits and monitoring</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    5. Cookies and Tracking
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Our website uses cookies and similar technologies to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze website traffic and usage patterns</li>
                    <li>Provide personalized content and advertising</li>
                    <li>Improve website functionality and user experience</li>
                  </ul>
                  <p className="text-gray-700">
                    You can control cookies through your browser settings,
                    though some features may not work properly if disabled.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    6. Your Rights
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    General Rights
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>Access, update, or delete your personal information</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Request data portability</li>
                    <li>Lodge complaints with supervisory authorities</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    California Residents (CCPA)
                  </h3>
                  <p className="text-gray-700 mb-2">
                    California residents have additional rights:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>
                      Right to know what personal information is collected
                    </li>
                    <li>Right to delete personal information</li>
                    <li>Right to opt-out of sale of personal information</li>
                    <li>
                      Right to non-discrimination for exercising privacy rights
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    European Residents (GDPR)
                  </h3>
                  <p className="text-gray-700 mb-2">
                    EU residents have additional rights:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Right to rectification and erasure</li>
                    <li>Right to restrict processing</li>
                    <li>Right to object to processing</li>
                    <li>Right to data portability</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    7. Data Retention
                  </h2>
                  <p className="text-gray-700">
                    We retain personal information for as long as necessary to
                    provide services, comply with legal obligations, resolve
                    disputes, and enforce our agreements. Specific retention
                    periods vary based on the type of information and applicable
                    laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    8. Children&apos;s Privacy
                  </h2>
                  <p className="text-gray-700">
                    Our services are not directed to children under 18. We do
                    not knowingly collect personal information from children
                    under 18. If we become aware of such collection, we will
                    delete the information promptly.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    9. Third-Party Links
                  </h2>
                  <p className="text-gray-700">
                    Our website may contain links to third-party websites. We
                    are not responsible for the privacy practices of these
                    sites. We encourage you to review their privacy policies
                    before providing any information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    10. Changes to This Policy
                  </h2>
                  <p className="text-gray-700">
                    We may update this privacy policy periodically. We will
                    notify you of significant changes by posting the new policy
                    on our website and updating the &quot;Last Updated&quot;
                    date. Continued use of our services constitutes acceptance
                    of any changes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    11. Contact Us
                  </h2>
                  <p className="text-gray-700 mb-4">
                    If you have questions about this privacy policy or want to
                    exercise your rights, contact us:
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
                          href="mailto:privacy@wildwestslc.com"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          privacy@wildwestslc.com
                        </a>
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
              Questions About Our Privacy Practices?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We&apos;re committed to protecting your privacy and answering any
              questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/contact"
                className="btn-primary inline-block text-center"
              >
                Contact Us
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
