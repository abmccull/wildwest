'use client';

import React from 'react';
import { OptimizedImage, LazyLoad, SkeletonCard } from '../ui';

interface JobData {
  id: string;
  title: string;
  service: string;
  city: string;
  completedDate: string;
  imageUrl?: string;
  description: string;
  duration: string;
  clientInitials: string;
}

interface RecentJobsProps {
  jobs?: JobData[];
  city?: string;
  category?: string;
  limit?: number;
  showImages?: boolean;
  variant?: 'grid' | 'carousel' | 'list';
  className?: string;
}

// Mock data - in a real app this would come from your database
const defaultJobs: JobData[] = [
  {
    id: '1',
    title: 'Kitchen Hardwood Floor Installation',
    service: 'Hardwood Installation',
    city: 'Salt Lake City',
    completedDate: '2024-01-15',
    imageUrl: '/images/jobs/hardwood-kitchen.jpg',
    description: 'Beautiful oak hardwood installation in a modern kitchen renovation.',
    duration: '3 days',
    clientInitials: 'M.J.',
  },
  {
    id: '2',
    title: 'Basement Demolition & Cleanup',
    service: 'Interior Demolition',
    city: 'West Valley City',
    completedDate: '2024-01-12',
    imageUrl: '/images/jobs/basement-demo.jpg',
    description: 'Complete basement demolition preparing for full renovation.',
    duration: '2 days',
    clientInitials: 'R.S.',
  },
  {
    id: '3',
    title: 'Garage Cleanout Service',
    service: 'Garage Cleanout',
    city: 'Sandy',
    completedDate: '2024-01-10',
    imageUrl: '/images/jobs/garage-cleanout.jpg',
    description: 'Full garage cleanout and organization for growing family.',
    duration: '1 day',
    clientInitials: 'L.P.',
  },
  {
    id: '4',
    title: 'Luxury Vinyl Plank Installation',
    service: 'Vinyl Plank Installation',
    city: 'Draper',
    completedDate: '2024-01-08',
    imageUrl: '/images/jobs/lvp-living-room.jpg',
    description: 'Waterproof luxury vinyl plank flooring in open concept living area.',
    duration: '4 days',
    clientInitials: 'T.K.',
  },
  {
    id: '5',
    title: 'Construction Debris Removal',
    service: 'Construction Debris',
    city: 'Murray',
    completedDate: '2024-01-05',
    imageUrl: '/images/jobs/debris-removal.jpg',
    description: 'Post-renovation cleanup and debris removal service.',
    duration: 'Same day',
    clientInitials: 'A.D.',
  },
  {
    id: '6',
    title: 'Bathroom Tile Installation',
    service: 'Tile Installation',
    city: 'Cottonwood Heights',
    completedDate: '2024-01-03',
    imageUrl: '/images/jobs/bathroom-tile.jpg',
    description: 'Custom porcelain tile installation in master bathroom remodel.',
    duration: '5 days',
    clientInitials: 'C.W.',
  },
];

export const RecentJobs: React.FC<RecentJobsProps> = ({
  jobs = defaultJobs,
  city,
  category,
  limit = 6,
  showImages = true,
  variant = 'grid',
  className = '',
}) => {
  // Filter jobs based on city and category if provided
  let filteredJobs = jobs;

  if (city) {
    filteredJobs = filteredJobs.filter((job) =>
      job.city.toLowerCase().includes(city.toLowerCase())
    );
  }

  if (category) {
    filteredJobs = filteredJobs.filter((job) =>
      job.service.toLowerCase().includes(category.toLowerCase())
    );
  }

  // Limit the number of jobs displayed
  const displayJobs = filteredJobs.slice(0, limit);

  if (displayJobs.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-500">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <p className="text-lg font-medium text-gray-600 mb-2">No Recent Jobs</p>
          <p className="text-gray-500">
            {city || category
              ? 'No recent projects match your criteria.'
              : 'Check back soon for completed projects.'}
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'carousel':
        return 'flex overflow-x-auto gap-6 pb-4 scrollbar-hide';
      case 'list':
        return 'space-y-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  return (
    <LazyLoad
      className={className}
      placeholder={
        <div className={className}>
          <div className="mb-8 text-center">
            <div className="h-8 bg-gray-200 rounded w-80 mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className={getVariantClasses()}>
            {Array.from({ length: Math.min(limit, 6) }).map((_, index) => (
              <SkeletonCard key={index} className="h-80" />
            ))}
          </div>
        </div>
      }
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-text-dark mb-2">Recent Completed Projects</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          See the quality work we've completed for homeowners
          {city && ` in ${city}`}
          {category && ` for ${category.toLowerCase()} services`}.
        </p>
      </div>

      <div className={getVariantClasses()}>
        {displayJobs.map((job) => (
          <div
            key={job.id}
            className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 ${
              variant === 'carousel' ? 'min-w-[320px] flex-shrink-0' : ''
            } ${variant === 'list' ? 'flex items-center gap-4' : ''}`}
          >
            {showImages && (
              <div
                className={`relative ${variant === 'list' ? 'w-24 h-24 flex-shrink-0' : 'h-48'}`}
              >
                {job.imageUrl ? (
                  <OptimizedImage
                    src={job.imageUrl}
                    alt={`${job.title} - ${job.service} project in ${job.city}`}
                    width={variant === 'list' ? 96 : 400}
                    height={variant === 'list' ? 96 : 192}
                    fill={variant !== 'list'}
                    sizes={
                      variant === 'list'
                        ? '96px'
                        : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    }
                    className="rounded-t-lg"
                    loading="lazy"
                    placeholder="blur"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center">
                    <div className="text-center text-primary">
                      <svg
                        className="w-12 h-12 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <p className="text-xs font-medium">Completed</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className={`p-4 ${variant === 'list' ? 'flex-1' : ''}`}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-text-dark text-sm leading-tight">{job.title}</h3>
                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                  {formatDate(job.completedDate)}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg
                    className="w-4 h-4 text-primary flex-shrink-0"
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
                  <span>{job.city}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-primary font-medium">{job.service}</span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Completed in {job.duration}</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Client {job.clientInitials}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-600 mb-4">
          Ready to start your project? Get a free quote today.
        </p>
        <button className="btn-primary">Get Free Quote</button>
      </div>
    </LazyLoad>
  );
};
