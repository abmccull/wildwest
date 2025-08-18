import React from 'react';

interface NAPBlockProps {
  variant?: 'default' | 'compact' | 'card';
  showHours?: boolean;
  showSchema?: boolean;
  city?: string;
  service?: string;
  className?: string;
}

interface BusinessInfo {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    full: string;
  };
  phone: {
    display: string;
    tel: string;
  };
  email: string;
  hours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  website: string;
  serviceAreas: string[];
}

const businessInfo: BusinessInfo = {
  name: 'Wild West Construction',
  address: {
    street: '123 Construction Blvd',
    city: 'Salt Lake City',
    state: 'UT',
    zipCode: '84101',
    full: '123 Construction Blvd, Salt Lake City, UT 84101',
  },
  phone: {
    display: '(801) 555-0123',
    tel: '+18015550123',
  },
  email: 'info@wildwestconstruction.com',
  hours: {
    monday: '7:00 AM - 6:00 PM',
    tuesday: '7:00 AM - 6:00 PM',
    wednesday: '7:00 AM - 6:00 PM',
    thursday: '7:00 AM - 6:00 PM',
    friday: '7:00 AM - 6:00 PM',
    saturday: '8:00 AM - 4:00 PM',
    sunday: 'Closed',
  },
  website: 'https://wildwestconstruction.com',
  serviceAreas: [
    'Salt Lake City, UT',
    'West Valley City, UT',
    'Sandy, UT',
    'Draper, UT',
    'Murray, UT',
    'Taylorsville, UT',
    'South Jordan, UT',
    'West Jordan, UT',
    'Riverton, UT',
    'Midvale, UT',
    'Cottonwood Heights, UT',
    'Herriman, UT',
    'Holladay, UT',
    'Millcreek, UT',
    'South Salt Lake, UT',
  ],
};

export const NAPBlock: React.FC<NAPBlockProps> = ({
  variant = 'default',
  showHours = true,
  showSchema = true,
  city,
  service,
  className = '',
}) => {
  const generateStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: businessInfo.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: businessInfo.address.street,
        addressLocality: businessInfo.address.city,
        addressRegion: businessInfo.address.state,
        postalCode: businessInfo.address.zipCode,
        addressCountry: 'US',
      },
      telephone: businessInfo.phone.tel,
      email: businessInfo.email,
      url: businessInfo.website,
      areaServed: businessInfo.serviceAreas.map((area) => ({
        '@type': 'City',
        name: area,
      })),
      openingHours: ['Mo-Fr 07:00-18:00', 'Sa 08:00-16:00'],
      priceRange: '$$',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
      },
    };

    if (service) {
      return {
        ...baseData,
        '@type': 'HomeAndConstructionBusiness',
        serviceType: service,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${service} Services`,
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: service,
                areaServed: city ? city : businessInfo.serviceAreas,
              },
            },
          ],
        },
      };
    }

    return baseData;
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'text-sm';
      case 'card':
        return 'bg-white p-6 rounded-lg shadow-md border border-gray-200';
      default:
        return '';
    }
  };

  const ContactItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    href?: string;
  }> = ({ icon, label, value, href }) => (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div className="min-w-0 flex-1">
        <p
          className={`font-medium text-text-dark ${
            variant === 'compact' ? 'text-sm' : 'text-base'
          }`}
        >
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className={`text-primary hover:text-primary/80 transition-colors ${
              variant === 'compact' ? 'text-sm' : ''
            }`}
          >
            {value}
          </a>
        ) : (
          <p className={`text-gray-600 ${variant === 'compact' ? 'text-sm' : ''}`}>{value}</p>
        )}
      </div>
    </div>
  );

  const HoursItem: React.FC<{ day: string; hours: string }> = ({ day, hours }) => (
    <div className="flex justify-between items-center">
      <span className={`font-medium text-text-dark ${variant === 'compact' ? 'text-sm' : ''}`}>
        {day}
      </span>
      <span
        className={`text-gray-600 ${
          hours === 'Closed' ? 'text-red-600' : ''
        } ${variant === 'compact' ? 'text-sm' : ''}`}
      >
        {hours}
      </span>
    </div>
  );

  return (
    <>
      {showSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData()),
          }}
        />
      )}

      <div
        className={`${getVariantClasses()} ${className}`}
        itemScope
        itemType="https://schema.org/LocalBusiness"
      >
        {/* Business Name */}
        <div className="mb-6">
          <h3
            className={`font-bold text-text-dark ${variant === 'compact' ? 'text-lg' : 'text-2xl'}`}
            itemProp="name"
          >
            {businessInfo.name}
          </h3>
          {(city || service) && (
            <p className={`text-gray-600 mt-1 ${variant === 'compact' ? 'text-sm' : ''}`}>
              {service && `Professional ${service} Services`}
              {city && service && ' in '}
              {city && city}
            </p>
          )}
        </div>

        {/* Contact Information */}
        <div className="space-y-4 mb-6">
          <ContactItem
            icon={
              <svg
                className="w-5 h-5 text-primary"
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
            }
            label="Address"
            value={
              <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">{businessInfo.address.street}</span>
                <br />
                <span itemProp="addressLocality">{businessInfo.address.city}</span>,{' '}
                <span itemProp="addressRegion">{businessInfo.address.state}</span>{' '}
                <span itemProp="postalCode">{businessInfo.address.zipCode}</span>
              </span>
            }
            href={`https://maps.google.com/?q=${encodeURIComponent(businessInfo.address.full)}`}
          />

          <ContactItem
            icon={
              <svg
                className="w-5 h-5 text-primary"
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
            }
            label="Phone"
            value={<span itemProp="telephone">{businessInfo.phone.display}</span>}
            href={`tel:${businessInfo.phone.tel}`}
          />

          <ContactItem
            icon={
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
            label="Email"
            value={<span itemProp="email">{businessInfo.email}</span>}
            href={`mailto:${businessInfo.email}`}
          />
        </div>

        {/* Business Hours */}
        {showHours && (
          <div className="mb-6">
            <h4
              className={`font-semibold text-text-dark mb-3 ${
                variant === 'compact' ? 'text-base' : 'text-lg'
              }`}
            >
              Business Hours
            </h4>
            <div className="space-y-2" itemProp="openingHours">
              <HoursItem day="Monday" hours={businessInfo.hours.monday} />
              <HoursItem day="Tuesday" hours={businessInfo.hours.tuesday} />
              <HoursItem day="Wednesday" hours={businessInfo.hours.wednesday} />
              <HoursItem day="Thursday" hours={businessInfo.hours.thursday} />
              <HoursItem day="Friday" hours={businessInfo.hours.friday} />
              <HoursItem day="Saturday" hours={businessInfo.hours.saturday} />
              <HoursItem day="Sunday" hours={businessInfo.hours.sunday} />
            </div>
          </div>
        )}

        {/* Service Areas */}
        <div className="mb-6">
          <h4
            className={`font-semibold text-text-dark mb-3 ${
              variant === 'compact' ? 'text-base' : 'text-lg'
            }`}
          >
            Service Areas
          </h4>
          <div className={`text-gray-600 ${variant === 'compact' ? 'text-sm' : ''}`}>
            <p className="mb-2">We proudly serve all of Salt Lake County, including:</p>
            <div className="flex flex-wrap gap-2">
              {businessInfo.serviceAreas.slice(0, 8).map((area, index) => (
                <span
                  key={area}
                  className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  itemProp="areaServed"
                >
                  {area}
                  {index < 7 && index < businessInfo.serviceAreas.length - 1 && ''}
                </span>
              ))}
              {businessInfo.serviceAreas.length > 8 && (
                <span className="text-xs text-gray-500">
                  +{businessInfo.serviceAreas.length - 8} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="pt-4 border-t border-gray-200">
          <div className={`flex flex-col ${variant === 'compact' ? 'gap-2' : 'sm:flex-row gap-3'}`}>
            <a
              href={`tel:${businessInfo.phone.tel}`}
              className={`btn-primary text-center ${variant === 'compact' ? 'py-2 text-sm' : ''}`}
            >
              <svg
                className="w-4 h-4 inline-block mr-2"
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
              Call Now
            </a>
            <a
              href="/contact"
              className={`btn-secondary text-center ${variant === 'compact' ? 'py-2 text-sm' : ''}`}
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
