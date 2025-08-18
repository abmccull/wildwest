'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ServiceData } from '@/lib/data-parser';

interface CategoryPageTemplateProps {
  category: string;
  services: ServiceData[];
  cities: Array<{ name: string; slug: string }>;
}

export const CategoryPageTemplate: React.FC<CategoryPageTemplateProps> = ({
  category,
  services,
  cities,
}) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);

  // Category-specific data
  const categoryData = {
    Flooring: {
      icon: '🏠',
      color: 'amber',
      avgPrice: '$3,500',
      timeline: '3-5 days',
      popularMaterials: ['Hardwood', 'Laminate', 'Vinyl Plank', 'Tile'],
    },
    Demolition: {
      icon: '🔨',
      color: 'red',
      avgPrice: '$2,000',
      timeline: '1-3 days',
      popularMaterials: ['Interior', 'Kitchen', 'Bathroom', 'Concrete'],
    },
    'Junk Removal': {
      icon: '🚛',
      color: 'green',
      avgPrice: '$350',
      timeline: 'Same day',
      popularMaterials: ['Construction Debris', 'Furniture', 'Appliances', 'Yard Waste'],
    },
  };

  const data = categoryData[category as keyof typeof categoryData] || categoryData.Flooring;

  return (
    <>
      {/* Category Hero */}
      <section className={`bg-gradient-to-br from-${data.color}-50 to-white`}>
        <div className="container pt-20 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm mb-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{category}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{data.icon}</span>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                    {category} Services
                  </h1>
                </div>

                <p className="text-xl text-gray-600 mb-6">
                  Utah's premier {category.toLowerCase()} contractors. Licensed, insured, and backed
                  by our 2-year warranty. Get expert service at competitive prices.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-sm text-gray-600">Average Cost</div>
                    <div className="text-2xl font-bold text-gray-900">{data.avgPrice}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="text-sm text-gray-600">Timeline</div>
                    <div className="text-2xl font-bold text-gray-900">{data.timeline}</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => setShowCalculator(true)} className="cta-primary">
                    Calculate Your Cost →
                  </button>
                  <Link
                    href="#services"
                    className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-center"
                  >
                    View All Services
                  </Link>
                </div>
              </div>

              {/* Hero Image/Video */}
              <div className="relative">
                <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden">
                  <Image
                    src={`/images/categories/${category.toLowerCase()}-hero.jpg`}
                    alt={`${category} services`}
                    width={600}
                    height={450}
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Play button for video testimonial */}
                <button className="absolute inset-0 flex items-center justify-center group">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-8 h-8 text-gray-900 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section id="services" className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">Popular {category} Services</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Choose from our most requested {category.toLowerCase()} services. All work is guaranteed
            and performed by licensed professionals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.slice(0, 6).map((service) => (
              <div
                key={service.slug}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all group cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                  {service.service}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Average Price:</span>
                    <span className="font-semibold">${service.averagePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Timeline:</span>
                    <span className="font-semibold">{service.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Popularity:</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-${i < Math.floor(service.popularity / 20) ? 'yellow' : 'gray'}-400`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Quote for {service.service}
                </button>
              </div>
            ))}
          </div>

          {/* Service Comparison Table */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Compare {category} Options</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Service Type</th>
                    <th className="text-center py-3 px-4">Price Range</th>
                    <th className="text-center py-3 px-4">Duration</th>
                    <th className="text-center py-3 px-4">Best For</th>
                    <th className="text-center py-3 px-4">Warranty</th>
                  </tr>
                </thead>
                <tbody>
                  {services.slice(0, 4).map((service, index) => (
                    <tr key={service.slug} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-3 px-4 font-medium">{service.service}</td>
                      <td className="py-3 px-4 text-center">
                        ${(service.averagePrice * 0.8).toLocaleString()} - $
                        {(service.averagePrice * 1.2).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">{service.duration}</td>
                      <td className="py-3 px-4 text-center">
                        {service.popularity > 80 ? 'Most Popular' : 'Budget-Friendly'}
                      </td>
                      <td className="py-3 px-4 text-center">2 Years</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our {category} Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Free Consultation',
                desc: 'Discuss your project and get expert advice',
              },
              { step: 2, title: 'Transparent Quote', desc: 'Detailed pricing with no hidden fees' },
              {
                step: 3,
                title: 'Professional Service',
                desc: 'Licensed contractors complete your project',
              },
              { step: 4, title: 'Quality Guarantee', desc: '2-year warranty on all workmanship' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City-Specific CTAs */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">{category} Services by City</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Select your city for local pricing and availability
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cities.slice(0, 18).map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}/${category.toLowerCase()}`}
                className="bg-gray-50 hover:bg-blue-50 rounded-lg p-4 text-center hover:shadow-md transition-all"
              >
                <div className="font-medium text-gray-900">{city.name}</div>
                <div className="text-sm text-blue-600 mt-1">View Services →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h3 className="text-2xl font-bold mb-4">{category} Cost Calculator</h3>
            {/* Calculator form here */}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryPageTemplate;
