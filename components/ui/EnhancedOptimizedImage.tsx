'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface EnhancedOptimizedImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
  // SEO enhancements
  title?: string;
  caption?: string;
  context?: string; // Context for better alt text generation
}

// Generate descriptive alt text based on context and filename
function generateAltText(src: string, context?: string): string {
  // Extract filename without extension
  const filename = src.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
  
  // Replace hyphens and underscores with spaces
  const cleanName = filename.replace(/[-_]/g, ' ');
  
  // Capitalize first letter of each word
  const titleCase = cleanName.replace(/\b\w/g, (char) => char.toUpperCase());
  
  // Add context if provided
  if (context) {
    return `${titleCase} - ${context}`;
  }
  
  // Default patterns for common image types
  if (filename.includes('hero')) {
    return `${titleCase} Hero Image`;
  }
  if (filename.includes('logo')) {
    return `${titleCase} Logo`;
  }
  if (filename.includes('icon')) {
    return `${titleCase} Icon`;
  }
  if (filename.includes('gallery')) {
    return `${titleCase} Gallery Image`;
  }
  if (filename.includes('team')) {
    return `${titleCase} Team Member`;
  }
  if (filename.includes('product')) {
    return `${titleCase} Product Image`;
  }
  if (filename.includes('service')) {
    return `${titleCase} Service`;
  }
  
  return titleCase || 'Image';
}

export const EnhancedOptimizedImage: React.FC<EnhancedOptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  loading = 'lazy',
  onLoad,
  onError,
  title,
  caption,
  context,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageAlt, setImageAlt] = useState(alt || '');

  useEffect(() => {
    // Generate alt text if not provided
    if (!alt) {
      setImageAlt(generateAltText(src, context));
    } else {
      setImageAlt(alt);
    }
  }, [src, alt, context]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
    
    // Log successful image load for monitoring
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'image_load', {
        event_category: 'Performance',
        event_label: src,
      });
    }
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
    
    // Log image error for monitoring
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'image_error', {
        event_category: 'Error',
        event_label: src,
      });
    }
  };

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
    </svg>`
  ).toString('base64')}`;

  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={fill ? {} : { width, height }}
        role="img"
        aria-label={imageAlt}
      >
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="sr-only">{imageAlt} - Failed to load</span>
      </div>
    );
  }

  const imageElement = (
    <Image
      src={src}
      alt={imageAlt}
      title={title || imageAlt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      quality={quality}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL || defaultBlurDataURL}
      loading={priority ? 'eager' : loading}
      className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      onLoad={handleLoad}
      onError={handleError}
      style={{
        objectFit: 'cover',
      }}
    />
  );

  // If caption is provided, wrap in figure element for better SEO
  if (caption) {
    return (
      <figure className={`relative ${isLoading ? 'animate-pulse bg-gray-200' : ''}`}>
        {imageElement}
        <figcaption className="text-sm text-gray-600 mt-2 text-center">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <div className={`relative ${isLoading ? 'animate-pulse bg-gray-200' : ''}`}>
      {imageElement}
    </div>
  );
};

// Component for lazy loading images with intersection observer
export const LazyOptimizedImage: React.FC<EnhancedOptimizedImageProps> = (props) => {
  const [isInView, setIsInView] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before the image enters viewport
      }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  if (!isInView) {
    return (
      <div
        ref={setRef}
        className={`bg-gray-200 ${props.className}`}
        style={props.fill ? {} : { width: props.width, height: props.height }}
        aria-label={props.alt || generateAltText(props.src, props.context)}
      />
    );
  }

  return <EnhancedOptimizedImage {...props} />;
};

export default EnhancedOptimizedImage;