import React from "react";
import Image from "next/image";

interface FooterLink {
  label: string;
  href: string;
}

const services: FooterLink[] = [
  { label: "Flooring Services", href: "/services/flooring" },
  { label: "Demolition Services", href: "/services/demolition" },
  { label: "Junk Removal", href: "/services/junk-removal" },
];

const locations: FooterLink[] = [
  { label: "Salt Lake City", href: "/locations/salt-lake-city" },
  { label: "West Valley City", href: "/locations/west-valley-city" },
  { label: "West Jordan", href: "/locations/west-jordan" },
  { label: "Sandy", href: "/locations/sandy" },
  { label: "Orem", href: "/locations/orem" },
  { label: "Murray", href: "/locations/murray" },
];

const company: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Careers", href: "/careers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

const legal: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="footer-grid grid gap-8">
          {/* Company Information */}
          <div className="footer-col-wide">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.webp"
                  alt="Wild West Construction Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Wild West Construction</h3>
                <p className="text-red-400 text-sm">
                  Utah&apos;s Premier Builder
                </p>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Building dreams across Utah with quality craftsmanship, reliable
              service, and unmatched expertise. Your trusted partner for
              flooring, demolition, and junk removal projects.
            </p>

            {/* Contact Information */}
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
                  data-source="footer"
                  data-service-type="general"
                  className="hover:text-red-400 transition-colors duration-200"
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
                  className="hover:text-red-400 transition-colors duration-200"
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
                  <p className="hover:text-red-400 transition-colors duration-200">
                    4097 S 420 W<br />
                    Murray, UT 84123
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6">
              <h4 className="font-semibold text-red-400 mb-2">
                Business Hours
              </h4>
              <div className="text-gray-300 text-sm space-y-1">
                <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                <p>Saturday: 8:00 AM - 4:00 PM</p>
                <p>Sunday: Emergency Calls Only</p>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-red-400 mb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-lg font-semibold text-red-400 mb-4">
              Service Areas
            </h3>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location.label}>
                  <a
                    href={location.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {location.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-lg font-semibold text-red-400 mb-4">Company</h3>
            <ul className="space-y-2 mb-6">
              {company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-semibold text-red-400 mb-2">Legal</h4>
            <ul className="space-y-1">
              {legal.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-xs"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Certifications */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-red-400 mb-2">
                Certifications
              </h4>
              <div className="text-xs text-gray-300 space-y-1">
                <p>Licensed • Bonded • Insured</p>
                <p>Utah License #123456</p>
                <p>BBB A+ Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Social Media Links */}
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-300">Follow us:</span>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/wildwestflooringbrokers/"
                  className="text-gray-300 hover:text-red-400 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/wildwestflooring/"
                  className="text-gray-300 hover:text-red-400 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.8C4.783 14.498 4.5 13.5 4.5 12.5s.283-1.998.933-2.688c.568-1.07 1.719-1.8 3.016-1.8 1.297 0 2.448.73 3.016 1.8.65.69.933 1.688.933 2.688s-.283 1.998-.933 2.688c-.568 1.07-1.719 1.8-3.016 1.8zm7.102 0c-1.297 0-2.448-.73-3.016-1.8-.65-.69-.933-1.688-.933-2.688s.283-1.998.933-2.688c.568-1.07 1.719-1.8 3.016-1.8 1.297 0 2.448.73 3.016 1.8.65.69.933 1.688.933 2.688s-.283 1.998-.933 2.688c-.568 1.07-1.719 1.8-3.016 1.8z" />
                  </svg>
                </a>

                <a
                  href="https://youtube.com/@wildwestslc"
                  className="text-gray-300 hover:text-red-400 transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-sm text-gray-300 whitespace-nowrap">
                Stay updated:
              </span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent w-40 sm:w-48"
                />
                <button className="px-4 py-2 bg-red-600 text-white font-medium text-sm rounded-r-md hover:bg-red-700 transition-colors duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-gray-300">
              © {currentYear} Wild West Construction. All rights reserved.
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <span>Proudly serving Utah since 2010</span>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                <span>24/7 Emergency Service Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
