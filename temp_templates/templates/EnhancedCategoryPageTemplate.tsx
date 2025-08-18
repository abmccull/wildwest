'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ServiceData, CityData } from '@/lib/data-parser';
import { Button, Card, Badge, TrustIndicator, ProgressiveForm, StickyMobileCTA } from '@/components/ui';

interface EnhancedCategoryPageTemplateProps {
  category: string;
  services: ServiceData[];
  cities: CityData[];
}

export const EnhancedCategoryPageTemplate: React.FC<EnhancedCategoryPageTemplateProps> = ({
  category,
  services,
  cities,
}) => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [comparisonView, setComparisonView] = useState(false);

  // Category configurations
  const categoryConfig = {
    Flooring: {
      icon: '🏠',
      primaryColor: 'amber',
      avgPrice: 3500,
      priceRange: { min: 2000, max: 8000 },
      timeline: '3-5 days',
      materials: [
        { name: 'Hardwood', multiplier: 1.5, popular: true },
        { name: 'Laminate', multiplier: 0.8, popular: true },
        { name: 'Vinyl Plank', multiplier: 0.9, popular: true },
        { name: 'Tile', multiplier: 1.3, popular: false },
        { name: 'Carpet', multiplier: 0.7, popular: false },
      ],
      benefits: [
        'Increase home value by 3-5%',
        'Lifetime warranty options',
        'Eco-friendly materials available',
        'Same-day consultation',
      ],
      process: [
        { step: 'Consultation', time: 'Day 1', description: 'Free in-home measurement and material selection' },
        { step: 'Preparation', time: 'Day 2', description: 'Remove old flooring and prepare subfloor' },
        { step: 'Installation', time: 'Day 3-4', description: 'Professional installation by certified technicians' },
        { step: 'Finishing', time: 'Day 5', description: 'Final touches, cleanup, and walkthrough' },
      ],
    },
    Demolition: {
      icon: '🔨',
      primaryColor: 'red',
      avgPrice: 2000,
      priceRange: { min: 500, max: 5000 },
      timeline: '1-3 days',
      materials: [
        { name: 'Interior Walls', multiplier: 0.8, popular: true },
        { name: 'Kitchen', multiplier: 1.2, popular: true },
        { name: 'Bathroom', multiplier: 1.0, popular: true },
        { name: 'Concrete', multiplier: 1.5, popular: false },
        { name: 'Full Structure', multiplier: 2.0, popular: false },
      ],
      benefits: [
        'Licensed & insured crew',
        'Complete debris removal',
        'Permit assistance included',
        'Emergency service available',
      ],
      process: [
        { step: 'Assessment', time: 'Day 1', description: 'Site inspection and safety planning' },
        { step: 'Preparation', time: 'Day 1', description: 'Secure permits and protect surrounding areas' },
        { step: 'Demolition', time: 'Day 2', description: 'Systematic demolition following safety protocols' },
        { step: 'Cleanup', time: 'Day 3', description: 'Complete debris removal and site cleaning' },
      ],
    },
    'Junk Removal': {
      icon: '🚛',
      primaryColor: 'green',
      avgPrice: 350,
      priceRange: { min: 150, max: 800 },
      timeline: 'Same day',
      materials: [
        { name: 'Single Item', multiplier: 0.5, popular: false },
        { name: 'Room Cleanout', multiplier: 1.0, popular: true },
        { name: 'Garage/Basement', multiplier: 1.2, popular: true },
        { name: 'Estate Cleanout', multiplier: 1.5, popular: false },
        { name: 'Construction Debris', multiplier: 1.3, popular: true },
      ],
      benefits: [
        'Same-day pickup available',
        'Eco-friendly disposal',
        'No hidden fees',
        'Senior discounts available',
      ],
      process: [
        { step: 'Quote', time: '15 min', description: 'Free quote over phone or on-site' },
        { step: 'Schedule', time: 'Same day', description: 'Book convenient pickup time' },
        { step: 'Removal', time: '1-2 hours', description: 'Full-service loading and hauling' },
        { step: 'Cleanup', time: '15 min', description: 'Sweep and clean the area' },
      ],
    },
  };

  const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.Flooring;

  // Calculate price based on selections
  useEffect(() => {
    const sizeMultipliers = { small: 0.7, medium: 1.0, large: 1.5, xlarge: 2.0 };
    const materialMultiplier = config.materials.find(m => m.name === selectedMaterial)?.multiplier || 1;
    const basePrice = config.avgPrice;
    const calculated = basePrice * sizeMultipliers[selectedSize as keyof typeof sizeMultipliers] * materialMultiplier;
    setEstimatedPrice(Math.round(calculated));
  }, [selectedSize, selectedMaterial, config]);

  // Top services for comparison
  const topServices = services
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 4);

  return (
    <>
      {/* Sticky Mobile CTA */}
      <StickyMobileCTA primaryPhone="18016914065" />

      {/* Category Hero with Authority Building */}
      <section className="bg-gradient-to-br from-brand-primary via-brand-info to-brand-primary text-white">
        <div className="container pt-20 pb-16">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm mb-6 text-white/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span>/</span>
            <span className="text-white font-medium">{category}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{config.icon}</span>
                <Badge variant="trust" className="text-white border-white/30">
                  Utah's #1 {category} Service
                </Badge>
              </div>

              <h1 className="text-4xl-responsive md:text-5xl-responsive font-bold mb-4">
                Professional {category} Services
              </h1>

              <p className="text-xl-responsive opacity-90 mb-6">
                Expert {category.toLowerCase()} contractors with {services.length}+ service options. 
                Licensed, insured, and guaranteed satisfaction.
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {config.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-cta mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Hero CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setShowCalculator(true)}
                  variant="urgent"
                  size="lg"
                  animate
                  icon={<span>💰</span>}
                >
                  Calculate Your Cost
                </Button>
                <Button
                  href="#services"
                  variant="secondary"
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                >
                  View All {category} Services
                </Button>
              </div>
            </div>

            {/* Stats and Trust Section */}
            <div className="space-y-6">
              {/* Price Range Card */}
              <Card variant="elevated" className="bg-white/10 backdrop-blur-md border border-white/20 text-white">
                <h3 className="text-xl font-semibold mb-4">Typical Investment Range</h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold">${config.priceRange.min.toLocaleString()}</span>
                  <span className="text-2xl">→</span>
                  <span className="text-3xl font-bold">${config.priceRange.max.toLocaleString()}</span>
                </div>
                <div className="bg-white/20 rounded-full h-3 relative overflow-hidden">
                  <div 
                    className="absolute left-0 h-full bg-gradient-to-r from-cta to-cta-hover rounded-full"
                    style={{ width: '65%' }}
                  />
                  <div 
                    className="absolute h-full w-1 bg-white"
                    style={{ left: '65%' }}
                  />
                </div>
                <p className="text-sm mt-3 opacity-90">
                  Average project: ${config.avgPrice.toLocaleString()}
                </p>
              </Card>

              {/* Trust Indicators */}
              <Card variant="elevated" className="bg-white">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 border-r">
                    <div className="text-3xl font-bold text-brand-primary">500+</div>
                    <div className="text-sm text-gray-600">{category} Projects</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-3xl font-bold text-rating">4.9★</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="text-center p-4 border-r border-t">
                    <div className="text-3xl font-bold text-cta">{config.timeline}</div>
                    <div className="text-sm text-gray-600">Typical Timeline</div>
                  </div>
                  <div className="text-center p-4 border-t">
                    <div className="text-3xl font-bold text-trust">2yr</div>
                    <div className="text-sm text-gray-600">Warranty</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Comparison Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl-responsive font-bold mb-4">
              Compare {category} Options
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
              Find the perfect {category.toLowerCase()} solution for your needs and budget
            </p>
            
            {/* View Toggle */}
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setComparisonView(false)}
                className={`px-6 py-2 rounded-md transition-all ${
                  !comparisonView ? 'bg-white shadow-sm font-medium' : ''
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setComparisonView(true)}
                className={`px-6 py-2 rounded-md transition-all ${
                  comparisonView ? 'bg-white shadow-sm font-medium' : ''
                }`}
              >
                Comparison Table
              </button>
            </div>
          </div>

          {!comparisonView ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 9).map((service, idx) => (
                <Card
                  key={idx}
                  variant="bordered"
                  hover
                  className="group cursor-pointer relative overflow-hidden"
                >
                  {(service as any).popular && (
                    <div className="absolute top-0 right-0 bg-rating text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                      POPULAR
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-brand-primary transition-colors">
                    {service.service}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Average Cost:</span>
                      <span className="font-bold text-lg">${service.averagePrice?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Timeline:</span>
                      <span className="font-medium">{service.duration || config.timeline}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Warranty:</span>
                      <span className="font-medium text-trust">2 Years</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="primary"
                    fullWidth
                    size="sm"
                    animate
                  >
                    Get {service.service} Quote →
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            /* Comparison Table View */
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Service Type</th>
                    <th className="text-center p-4 font-semibold">Price Range</th>
                    <th className="text-center p-4 font-semibold">Timeline</th>
                    <th className="text-center p-4 font-semibold">Best For</th>
                    <th className="text-center p-4 font-semibold">Popularity</th>
                    <th className="text-center p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {topServices.map((service, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{service.service}</div>
                          <div className="text-sm text-gray-600 max-w-xs">{service.description}</div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="font-bold">
                          ${(service.averagePrice * 0.8).toLocaleString()} - 
                          ${(service.averagePrice * 1.2).toLocaleString()}
                        </div>
                      </td>
                      <td className="p-4 text-center">{service.duration || config.timeline}</td>
                      <td className="p-4 text-center">
                        {service.popularity > 80 ? (
                          <Badge variant="success">Most Popular</Badge>
                        ) : service.averagePrice < config.avgPrice ? (
                          <Badge variant="info">Budget-Friendly</Badge>
                        ) : (
                          <Badge variant="warning">Premium</Badge>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-${i < Math.floor((service.popularity || 50) / 20) ? 'rating' : 'gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <Button variant="outline" size="sm">
                          Get Quote
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="text-center mt-8">
            <Button href={`/${category.toLowerCase()}/all`} variant="outline" size="lg">
              View All {services.length} {category} Services →
            </Button>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl-responsive font-bold text-center mb-12">
              Our {category} Process
            </h2>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block" />
              
              {/* Process Steps */}
              <div className="space-y-8">
                {config.process.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-6">
                    {/* Step Number */}
                    <div className="flex-shrink-0 w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-xl relative z-10">
                      {idx + 1}
                    </div>
                    
                    {/* Step Content */}
                    <Card className="flex-1" variant="elevated">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{step.step}</h3>
                        <Badge variant="info">{step.time}</Badge>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                onClick={() => setShowCalculator(true)}
                variant="primary"
                size="lg"
                animate
              >
                Start Your {category} Project →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Materials & Options */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl-responsive font-bold text-center mb-12">
            {category} Materials & Options
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {config.materials.map((material) => (
              <Card
                key={material.name}
                variant={material.popular ? 'gradient' : 'bordered'}
                hover
                className="text-center cursor-pointer"
                onClick={() => setSelectedMaterial(material.name)}
              >
                {material.popular && (
                  <Badge variant="warning" size="sm" className="mb-2">
                    Popular Choice
                  </Badge>
                )}
                <h3 className="font-semibold mb-2">{material.name}</h3>
                <div className="text-2xl font-bold text-brand-primary mb-1">
                  ${Math.round(config.avgPrice * material.multiplier).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Average cost</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* City-Specific CTAs */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl-responsive font-bold text-center mb-4">
            {category} Services by Location
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Get local pricing and availability for {category.toLowerCase()} services in your area
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cities.slice(0, 24).map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}/${category.toLowerCase()}`}
                className="bg-white hover:bg-brand-primary hover:text-white rounded-lg p-4 text-center shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="font-medium">{city.name}</div>
                <div className="text-sm mt-1 text-brand-info group-hover:text-white/80">
                  Get Quote →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card variant="elevated" className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{category} Cost Calculator</h3>
              <button
                onClick={() => setShowCalculator(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Project Size */}
              <div>
                <label className="block text-sm font-medium mb-3">Project Size</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'small', label: 'Small', desc: '<500 sq ft' },
                    { value: 'medium', label: 'Medium', desc: '500-1000 sq ft' },
                    { value: 'large', label: 'Large', desc: '1000-2000 sq ft' },
                    { value: 'xlarge', label: 'X-Large', desc: '>2000 sq ft' },
                  ].map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setSelectedSize(size.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedSize === size.value
                          ? 'border-cta bg-cta/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{size.label}</div>
                      <div className="text-xs text-gray-600">{size.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">Material/Type</label>
                <div className="space-y-2">
                  {config.materials.map((material) => (
                    <label
                      key={material.name}
                      className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedMaterial === material.name
                          ? 'border-cta bg-cta/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="material"
                          value={material.name}
                          checked={selectedMaterial === material.name}
                          onChange={(e) => setSelectedMaterial(e.target.value)}
                          className="text-cta focus:ring-cta"
                        />
                        <span className="font-medium">{material.name}</span>
                        {material.popular && (
                          <Badge variant="warning" size="sm">Popular</Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">
                        {material.multiplier > 1 ? '+' : ''}{Math.round((material.multiplier - 1) * 100)}%
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Estimated Price */}
              <Card variant="gradient" className="text-center">
                <div className="text-sm text-gray-600 mb-2">Estimated Project Cost</div>
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  ${estimatedPrice.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Save up to $500 when you book today!
                </div>
              </Card>

              {/* Contact Form */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cta focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cta focus:border-transparent"
                />
                <Button variant="primary" fullWidth size="lg" animate>
                  Get My Exact Quote →
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default EnhancedCategoryPageTemplate;