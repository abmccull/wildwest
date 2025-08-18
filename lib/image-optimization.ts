/**
 * Image optimization utilities for SEO and performance
 */

interface ImageMetadata {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

interface StructuredImageData {
  '@context': string;
  '@type': string;
  contentUrl: string;
  caption?: string;
  description?: string;
  name?: string;
  uploadDate?: string;
  width?: string;
  height?: string;
}

/**
 * Generate SEO-friendly alt text for images
 */
export function generateSeoAltText(
  filename: string,
  category?: string,
  location?: string,
  serviceType?: string
): string {
  // Remove file extension and clean filename
  const baseName =
    filename
      .split('/')
      .pop()
      ?.replace(/\.[^/.]+$/, '') || '';
  const cleanName = baseName.replace(/[-_]/g, ' ').trim();

  // Build context-aware alt text
  const parts: string[] = [];

  if (serviceType) {
    parts.push(serviceType);
  }

  if (cleanName && !cleanName.includes('image') && !cleanName.includes('img')) {
    parts.push(cleanName);
  }

  if (category) {
    parts.push(category);
  }

  if (location) {
    parts.push(`in ${location}`);
  }

  // Default fallback
  if (parts.length === 0) {
    return 'Wild West Construction services';
  }

  // Capitalize first letter of the result
  const altText = parts.join(' ');
  return altText.charAt(0).toUpperCase() + altText.slice(1);
}

/**
 * Generate structured data for images
 */
export function generateImageStructuredData(
  image: ImageMetadata,
  context?: {
    organizationName?: string;
    uploadDate?: string;
  }
): StructuredImageData {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestslc.com';
  const imageUrl = image.src.startsWith('http') ? image.src : `${baseUrl}${image.src}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: imageUrl,
    caption: image.alt,
    description: image.title || image.alt,
    name: image.alt,
    uploadDate: context?.uploadDate || new Date().toISOString(),
    ...(image.width && { width: image.width.toString() }),
    ...(image.height && { height: image.height.toString() }),
  };
}

/**
 * Optimize image loading strategy based on position
 */
export function getImageLoadingStrategy(
  position: 'above-fold' | 'below-fold' | 'critical' | 'decorative'
): 'eager' | 'lazy' {
  switch (position) {
    case 'above-fold':
    case 'critical':
      return 'eager';
    case 'below-fold':
    case 'decorative':
    default:
      return 'lazy';
  }
}

/**
 * Generate responsive image sizes for different breakpoints
 */
export function generateResponsiveSizes(
  defaultWidth: number,
  layout: 'full' | 'constrained' | 'fixed' = 'constrained'
): string {
  switch (layout) {
    case 'full':
      return '100vw';
    case 'fixed':
      return `${defaultWidth}px`;
    case 'constrained':
    default:
      return '(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px';
  }
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(
  baseSrc: string,
  sizes: number[] = [640, 768, 1024, 1280, 1536]
): string {
  // If using Next.js Image optimization, this is handled automatically
  // This is for custom implementations
  return sizes
    .map((size) => {
      const optimizedSrc = baseSrc.replace(/(\.\w+)$/, `-${size}w$1`);
      return `${optimizedSrc} ${size}w`;
    })
    .join(', ');
}

/**
 * Get optimal image format based on browser support
 */
export function getOptimalImageFormat(
  originalFormat: string,
  supportsWebP: boolean = true,
  supportsAvif: boolean = false
): string {
  if (supportsAvif && originalFormat !== 'svg') {
    return 'avif';
  }
  if (supportsWebP && originalFormat !== 'svg') {
    return 'webp';
  }
  return originalFormat;
}

/**
 * Calculate aspect ratio for image containers
 */
export function calculateAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
}

/**
 * Generate blur data URL for placeholder
 */
export function generateBlurDataUrl(
  width: number = 10,
  height: number = 10,
  color: string = '#f3f4f6'
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

/**
 * Preload critical images
 */
export function preloadCriticalImages(images: ImageMetadata[]): void {
  if (typeof window === 'undefined') return;

  images.forEach((image) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = image.src;

    // Add specific attributes for different image types
    if (image.src.endsWith('.webp')) {
      link.type = 'image/webp';
    } else if (image.src.endsWith('.avif')) {
      link.type = 'image/avif';
    }

    document.head.appendChild(link);
  });
}

/**
 * Check if browser supports modern image formats
 */
export function checkImageFormatSupport(): {
  webp: boolean;
  avif: boolean;
} {
  if (typeof window === 'undefined') {
    return { webp: true, avif: false }; // Default for SSR
  }

  const webpSupport =
    document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

  // AVIF support detection is more complex and would require a promise
  // For now, we'll use a simple check
  const avifSupport = false; // Conservative default

  return {
    webp: webpSupport,
    avif: avifSupport,
  };
}

/**
 * Image SEO validator
 */
export function validateImageSeo(image: ImageMetadata): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (!image.alt || image.alt.trim().length === 0) {
    issues.push('Missing alt text');
  } else if (image.alt.length > 125) {
    issues.push('Alt text too long (should be under 125 characters)');
  } else if (
    image.alt.toLowerCase().includes('image of') ||
    image.alt.toLowerCase().includes('picture of')
  ) {
    issues.push('Alt text should not include "image of" or "picture of"');
  }

  if (!image.src) {
    issues.push('Missing image source');
  }

  if (image.width && image.height) {
    const aspectRatio = image.width / image.height;
    if (aspectRatio > 3 || aspectRatio < 0.33) {
      issues.push('Unusual aspect ratio - may cause layout shifts');
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

const imageOptimization = {
  generateSeoAltText,
  generateImageStructuredData,
  getImageLoadingStrategy,
  generateResponsiveSizes,
  generateSrcSet,
  getOptimalImageFormat,
  calculateAspectRatio,
  generateBlurDataUrl,
  preloadCriticalImages,
  checkImageFormatSupport,
  validateImageSeo,
};

export default imageOptimization;
