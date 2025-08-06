"use client";

import React, { useState } from "react";
import Link from "next/link";

interface NavigationItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
}

const navigation: NavigationItem[] = [
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
    dropdownItems: [
      {
        label: "Flooring Services",
        href: "/services/flooring",
        description: "Professional flooring installation and repair",
      },
      {
        label: "Demolition Services",
        href: "/services/demolition",
        description: "Safe and efficient demolition services",
      },
      {
        label: "Junk Removal",
        href: "/services/junk_removal",
        description: "Reliable junk and debris removal",
      },
    ],
  },
  {
    label: "Locations",
    href: "/locations",
    hasDropdown: true,
    dropdownItems: [
      { label: "Salt Lake City", href: "/locations/salt-lake-city" },
      { label: "West Valley City", href: "/locations/west-valley-city" },
      { label: "West Jordan", href: "/locations/west-jordan" },
      { label: "Sandy", href: "/locations/sandy" },
      { label: "Orem", href: "/locations/orem" },
      { label: "Murray", href: "/locations/murray" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Quote", href: "/quote" },
  { label: "Contact", href: "/contact" },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="bg-white shadow-construction sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center space-x-3"
              onClick={closeMenus}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-desert-red to-mustang-yellow rounded-lg flex items-center justify-center shadow-western">
                <span className="text-white font-bold text-lg md:text-xl">
                  W
                </span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl md:text-2xl font-bold text-blue-900">
                  Wild West Construction
                </h1>
                <p className="text-sm text-gray-600 -mt-1">
                  Utah&apos;s Premier Builder
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <div key={item.label} className="relative group">
                <button
                  className="flex items-center space-x-1 text-blue-900 hover:text-red-600 font-medium transition-colors duration-200"
                  onClick={() =>
                    item.hasDropdown
                      ? toggleDropdown(item.label)
                      : (window.location.href = item.href)
                  }
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <svg
                      className={`w-4 h-4 transform transition-transform duration-200 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </button>

                {/* Desktop Dropdown */}
                {item.hasDropdown &&
                  item.dropdownItems &&
                  openDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-construction border border-gray-100 py-2 z-50">
                      {item.dropdownItems.map((dropdownItem) => (
                        <a
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                          onClick={closeMenus}
                        >
                          <div className="text-blue-900 font-medium">
                            {dropdownItem.label}
                          </div>
                          {dropdownItem.description && (
                            <div className="text-sm text-gray-600 mt-1">
                              {dropdownItem.description}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/quote" className="btn-primary" onClick={closeMenus}>
              Get Free Quote
            </a>
            <a
              href="tel:+1-801-691-4065"
              data-source="header"
              className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
            >
              (801) 691-4065
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-900 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-600 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {navigation.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() =>
                      item.hasDropdown
                        ? toggleDropdown(item.label)
                        : (window.location.href = item.href)
                    }
                    className="w-full flex items-center justify-between text-left px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:text-red-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Mobile Dropdown */}
                  {item.hasDropdown &&
                    item.dropdownItems &&
                    openDropdown === item.label && (
                      <div className="ml-4 space-y-1">
                        {item.dropdownItems.map((dropdownItem) => (
                          <a
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-colors duration-200"
                            onClick={closeMenus}
                          >
                            {dropdownItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                <a
                  href="/quote"
                  className="block w-full text-center btn-primary"
                  onClick={closeMenus}
                >
                  Get Free Quote
                </a>
                <a
                  href="tel:+1-801-691-4065"
                  data-source="mobile-menu"
                  className="block text-center text-red-600 font-semibold py-2"
                  onClick={closeMenus}
                >
                  Call: (801) 691-4065
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
