'use client';

import Link from 'next/link';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: {
    category?: string;
    search?: string;
  };
}

export default function BlogPagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: BlogPaginationProps) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    
    if (page > 1) {
      params.set('page', page.toString());
    }
    
    if (searchParams.category) {
      params.set('category', searchParams.category);
    }
    
    if (searchParams.search) {
      params.set('search', searchParams.search);
    }

    const paramString = params.toString();
    return paramString ? `${basePath}?${paramString}` : basePath;
  };

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side
    const range = [];
    const rangeWithDots = [];

    // Calculate the start and end of our visible range
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    // Adjust start and end to always show a consistent number of pages when possible
    if (end - start < 2 * delta) {
      if (start === 1) {
        end = Math.min(totalPages, start + 2 * delta);
      } else if (end === totalPages) {
        start = Math.max(1, end - 2 * delta);
      }
    }

    // Build the range
    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Add first page and dots if needed
    if (start > 1) {
      rangeWithDots.push(1);
      if (start > 2) {
        rangeWithDots.push('...');
      }
    }

    // Add main range
    rangeWithDots.push(...range);

    // Add last page and dots if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center space-x-1" aria-label="Pagination">
      {/* Previous Page */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Go to previous page"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </Link>
      ) : (
        <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 cursor-not-allowed">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </span>
      )}

      {/* Page Numbers */}
      {visiblePages.map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <Link
              href={buildUrl(page as number)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-red-600 text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Link>
          )}
        </div>
      ))}

      {/* Next Page */}
      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Go to next page"
        >
          Next
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      ) : (
        <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 cursor-not-allowed">
          Next
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </nav>
  );
}