import React from 'react';
import Link from 'next/link';
import { CityData } from '@/lib/data-parser';

interface NearbyCitiesProps {
  currentCity: CityData;
  nearbyCities: CityData[];
  service?: string;
  variant?: 'grid' | 'list' | 'compact';
  showDistance?: boolean;
  limit?: number;
  className?: string;
}

export const NearbyCities: React.FC<NearbyCitiesProps> = ({
  currentCity,
  nearbyCities,
  service,
  variant = 'grid',
  showDistance = true,
  limit = 8,
  className = '',
}) => {
  // Calculate distance between two cities using their lat/lng
  const calculateDistance = (city1: CityData, city2: CityData): number => {
    const R = 3959; // Earth's radius in miles
    const dLat = ((city2.latitude - city1.latitude) * Math.PI) / 180;
    const dLon = ((city2.longitude - city1.longitude) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((city1.latitude * Math.PI) / 180) *
        Math.cos((city2.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Sort nearby cities by distance and limit
  const sortedCities = nearbyCities
    .map((city) => ({
      ...city,
      distance: calculateDistance(currentCity, city),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);

  const getCityLink = (city: CityData) => {
    if (service) {
      return `/${city.slug}/${service}`;
    }
    return `/${city.slug}`;
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'list':
        return 'space-y-2';
      case 'compact':
        return 'flex flex-wrap gap-2';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
    }
  };

  if (sortedCities.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-text-dark mb-2">
          {service ? `${service} Services in` : 'Service Areas Near'} {currentCity.name}
        </h3>
        <p className="text-gray-600">
          We also provide professional {service ? service.toLowerCase() : 'construction'} services
          in these nearby communities.
        </p>
      </div>

      <div className={getVariantClasses()}>
        {sortedCities.map((city) => (
          <Link
            key={city.slug}
            href={getCityLink(city)}
            className={`block group transition-all duration-200 ${
              variant === 'compact'
                ? 'bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-primary hover:bg-primary/5 text-sm'
                : variant === 'list'
                  ? 'bg-white border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-md'
                  : 'bg-white border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-lg'
            }`}
          >
            <div
              className={`flex items-center ${variant === 'compact' ? 'gap-2' : 'justify-between'}`}
            >
              <div className="flex-1 min-w-0">
                <h4
                  className={`font-semibold text-text-dark group-hover:text-primary transition-colors ${
                    variant === 'compact' ? 'text-sm' : 'text-base'
                  }`}
                >
                  {city.name}
                </h4>

                {variant !== 'compact' && (
                  <div className="mt-1 space-y-1">
                    <p className="text-sm text-gray-600 leading-tight">
                      {city.county}, {city.state}
                    </p>
                    <p className="text-xs text-gray-500">
                      Population: {city.population.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div
                className={`flex items-center gap-2 ${
                  variant === 'compact' ? 'text-xs' : 'text-sm'
                } text-gray-500`}
              >
                {showDistance && (
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    {city.distance.toFixed(1)} mi
                  </span>
                )}

                <svg
                  className={`${
                    variant === 'compact' ? 'w-3 h-3' : 'w-4 h-4'
                  } text-primary group-hover:translate-x-1 transition-transform`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>

            {variant === 'grid' && city.description && (
              <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2">
                {city.description}
              </p>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="font-semibold text-text-dark mb-1">Serving All of Salt Lake County</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Wild West Construction proudly serves homeowners throughout Salt Lake County. Don't
              see your city listed? Give us a call - we likely service your area too!
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/service-areas"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                View All Service Areas →
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/contact"
                className="text-sm text-primary hover:text-primary/80 font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
