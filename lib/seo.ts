/**
 * SEO utilities for Wild West Construction hub-and-spoke model
 */

import { Metadata } from "next";
import {
  Page,
  SERVICES,
  SERVICE_DISPLAY_NAMES,
  ServiceType,
} from "@/types/database";
import { createServerClient } from "./supabase-server";

// City mapping from database to display names
export const CITY_DISPLAY_NAMES: Record<string, string> = {
  "salt-lake-city": "Salt Lake City",
  "west-valley-city": "West Valley City",
  "west-jordan": "West Jordan",
  sandy: "Sandy",
  "south-jordan": "South Jordan",
  orem: "Orem",
  ogden: "Ogden",
  layton: "Layton",
  taylorsville: "Taylorsville",
  murray: "Murray",
  bountiful: "Bountiful",
  draper: "Draper",
  riverton: "Riverton",
  herriman: "Herriman",
  midvale: "Midvale",
  holladay: "Holladay",
  "south-salt-lake": "South Salt Lake",
  bluffdale: "Bluffdale",
  roy: "Roy",
  "pleasant-grove": "Pleasant Grove",
  "cottonwood-heights": "Cottonwood Heights",
};

// Reverse mapping for URL generation
export const CITY_SLUG_MAP: Record<string, string> = Object.entries(
  CITY_DISPLAY_NAMES,
).reduce((acc, [slug, name]) => ({ ...acc, [name]: slug }), {});

/**
 * Generate enhanced schema markup for LocalBusiness with comprehensive Utah location data
 */
export function generateLocalBusinessSchema(
  city: string,
  services?: ServiceType[],
) {
  const displayCity = CITY_DISPLAY_NAMES[city] || city;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": `https://wildwestslc.com/locations/${city}`,
    name: `Wild West Construction - ${displayCity}`,
    alternateName: "Wild West Construction",
    legalName: "Wild West Construction LLC",
    description: `Professional construction services in ${displayCity}, Utah. Licensed, insured, and experienced contractors specializing in flooring, demolition, and junk removal throughout Salt Lake County.`,
    url: `https://wildwestslc.com/locations/${city}`,
    telephone: "+1-801-691-4065",
    email: "info@wildwestslc.com",
    foundingDate: "2010",
    address: {
      "@type": "PostalAddress",
      streetAddress: "4097 S 420 W",
      addressLocality: "Murray",
      addressRegion: "UT",
      postalCode: "84123",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.6669",
      longitude: "-111.8904",
    },
    openingHours: ["Mo-Fr 07:00-18:00", "Sa 08:00-16:00"],
    priceRange: "$$",
    paymentAccepted: ["Cash", "Credit Card", "Check", "Financing Available"],
    currenciesAccepted: "USD",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "247",
      bestRating: "5",
      worstRating: "1",
    },
    serviceArea: [
      {
        "@type": "City",
        name: displayCity,
        containedInPlace: {
          "@type": "State",
          name: "Utah",
          containedInPlace: {
            "@type": "Country",
            name: "United States",
          },
        },
      },
      {
        "@type": "AdministrativeArea",
        name: "Salt Lake County",
        containedInPlace: {
          "@type": "State",
          name: "Utah",
        },
      },
    ],
    areaServed: [
      "Salt Lake City, UT",
      "West Valley City, UT",
      "West Jordan, UT",
      "Sandy, UT",
      "Orem, UT",
      "Murray, UT",
      "Taylorsville, UT",
      "Draper, UT",
      "Riverton, UT",
      "Cottonwood Heights, UT",
      "Bountiful, UT",
      "Layton, UT",
      "Ogden, UT",
      "Pleasant Grove, UT",
      "Roy, UT",
    ],
    ...(services && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Construction Services",
        itemListElement: services.map((service, index) => ({
          "@type": "Offer",
          "@id": `https://wildwestslc.com/locations/${city}/${service}`,
          itemOffered: {
            "@type": "Service",
            name: `${SERVICE_DISPLAY_NAMES[service]} Services in ${displayCity}`,
            description: `Professional ${SERVICE_DISPLAY_NAMES[service].toLowerCase()} services in ${displayCity}, Utah. Licensed contractors serving Salt Lake County.`,
            provider: {
              "@type": "Organization",
              name: "Wild West Construction",
            },
            areaServed: {
              "@type": "City",
              name: displayCity,
            },
          },
          position: index + 1,
        })),
      },
    }),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-801-691-4065",
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "English",
        contactOption: "TollFree",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "07:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        email: "info@wildwestslc.com",
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "English",
      },
    ],
    sameAs: [
      "https://www.facebook.com/wildwestflooringbrokers/",
      "https://www.instagram.com/wildwestflooring/",
      "https://www.youtube.com/@wildwestslc",
    ],
    brand: {
      "@type": "Brand",
      name: "Wild West Construction",
    },
    logo: {
      "@type": "ImageObject",
      url: "https://wildwestslc.com/images/logo.png",
      width: "300",
      height: "100",
    },
  };
}

/**
 * Generate enhanced schema markup for Service with comprehensive local data
 */
export function generateServiceSchema(city: string, service: ServiceType) {
  const displayCity = CITY_DISPLAY_NAMES[city] || city;
  const serviceName = SERVICE_DISPLAY_NAMES[service];

  // Service-specific details
  const serviceDetails = {
    flooring: {
      category: "FlooringInstallation",
      offers: [
        "Hardwood Floor Installation",
        "Laminate & Vinyl Flooring",
        "Tile Installation",
        "Carpet Installation",
        "Floor Refinishing",
        "Subfloor Repair",
      ],
    },
    demolition: {
      category: "DemolitionService",
      offers: [
        "Interior Demolition",
        "Exterior Demolition",
        "Kitchen Demolition",
        "Bathroom Demolition",
        "Concrete Removal",
        "Debris Cleanup",
      ],
    },
    junk_removal: {
      category: "WasteManagement",
      offers: [
        "Construction Debris Removal",
        "Household Junk Removal",
        "Appliance Removal",
        "Furniture Removal",
        "Yard Waste Cleanup",
        "Estate Cleanouts",
      ],
    },
  };

  const details = serviceDetails[service];

  return {
    "@context": "https://schema.org",
    "@type": ["Service", details.category],
    "@id": `https://wildwestslc.com/locations/${city}/${service}`,
    name: `${serviceName} Services in ${displayCity}, Utah`,
    alternateName: `${displayCity} ${serviceName} Services`,
    description: `Professional ${serviceName.toLowerCase()} services in ${displayCity}, Utah. Licensed and insured contractors serving Salt Lake County with years of experience and quality workmanship.`,
    url: `https://wildwestslc.com/locations/${city}/${service}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://wildwestslc.com",
      name: "Wild West Construction",
      telephone: "+1-801-691-4065",
      email: "info@wildwestslc.com",
      url: "https://wildwestslc.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4097 S 420 W",
        addressLocality: "Murray",
        addressRegion: "UT",
        postalCode: "84123",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "247",
      },
    },
    areaServed: [
      {
        "@type": "City",
        name: displayCity,
        containedInPlace: {
          "@type": "State",
          name: "Utah",
          containedInPlace: {
            "@type": "Country",
            name: "United States",
          },
        },
      },
      {
        "@type": "AdministrativeArea",
        name: "Salt Lake County",
        containedInPlace: {
          "@type": "State",
          name: "Utah",
        },
      },
    ],
    serviceType: serviceName,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${serviceName} Services in ${displayCity}`,
      description: `Comprehensive ${serviceName.toLowerCase()} services available in ${displayCity}, Utah`,
      itemListElement: details.offers.map((offer, index) => ({
        "@type": "Offer",
        "@id": `https://wildwestslc.com/locations/${city}/${service}#offer-${index + 1}`,
        name: offer,
        description: `Professional ${offer.toLowerCase()} services in ${displayCity}, Utah`,
        itemOffered: {
          "@type": "Service",
          name: offer,
          provider: {
            "@type": "Organization",
            name: "Wild West Construction",
          },
        },
        priceRange: "$$",
        availability: "https://schema.org/InStock",
        eligibleRegion: {
          "@type": "Place",
          name: `${displayCity}, Utah`,
        },
        position: index + 1,
      })),
    },
    offers: {
      "@type": "Offer",
      description: `Professional ${serviceName.toLowerCase()} services in ${displayCity}`,
      priceRange: "$$",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString().split("T")[0],
      eligibleRegion: {
        "@type": "Place",
        name: `${displayCity}, Utah`,
      },
    },
    audience: {
      "@type": "Audience",
      geographicArea: {
        "@type": "Place",
        name: `${displayCity}, Utah`,
      },
    },
  };
}

/**
 * Generate breadcrumb schema markup
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ schema markup
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate blog post/article schema markup
 */
export function generateArticleSchema(
  title: string,
  content: string,
  publishDate: string,
  modifiedDate?: string,
  author = "Wild West Construction",
  imageUrl?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: content.substring(0, 160) + "...",
    articleBody: content,
    datePublished: publishDate,
    dateModified: modifiedDate || publishDate,
    author: {
      "@type": "Organization",
      name: author,
      url: "https://wildwestslc.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Wild West Construction",
      url: "https://wildwestslc.com",
      logo: {
        "@type": "ImageObject",
        url: "https://wildwestslc.com/images/logo.png",
        width: "300",
        height: "100",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://wildwestslc.com/blog",
    },
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
        width: "1200",
        height: "630",
      },
    }),
    keywords:
      "construction, Utah, Salt Lake City, home improvement, contractors",
    inLanguage: "en-US",
    isPartOf: {
      "@type": "Website",
      name: "Wild West Construction",
      url: "https://wildwestslc.com",
    },
    about: [
      {
        "@type": "Thing",
        name: "Construction Services",
      },
      {
        "@type": "Place",
        name: "Utah",
      },
    ],
  };
}

/**
 * Generate enhanced metadata for footer pages with fallback descriptions
 */
export function generateFooterPageMetadata(
  pageName: string,
  pageDescription: string,
): Metadata {
  const title = `${pageName} | Wild West Construction - Utah's Premier Contractors`;
  
  // Provide fallback descriptions if pageDescription is empty
  const fallbackDescriptions: Record<string, string> = {
    "Privacy Policy": "Wild West Construction privacy policy. Learn how we protect your personal information and data when using our construction services in Utah. Transparent data handling practices for our valued customers.",
    "Terms of Service": "Wild West Construction terms of service and conditions for our flooring, demolition, and junk removal services in Utah. Understanding our service agreements and customer responsibilities.",
    "About Us": "Wild West Construction is Utah's trusted construction company with 10+ years experience. Licensed, bonded & insured contractors serving Salt Lake County with professional flooring, demolition & junk removal services.",
    "Contact": "Contact Wild West Construction for professional construction services in Utah. Licensed contractors serving Salt Lake County. Free estimates for flooring, demolition & junk removal. Call (801) 691-4065.",
    "Careers": "Join Wild West Construction's growing team! Career opportunities for construction professionals in Utah. We offer competitive pay, benefits, and growth opportunities for skilled contractors and laborers."
  };
  
  const description = pageDescription || fallbackDescriptions[pageName] || `${pageName} information for Wild West Construction, Utah's premier construction contractors serving Salt Lake County.`;

  return {
    title,
    description,
    keywords: `Wild West Construction ${pageName.toLowerCase()}, Utah construction company ${pageName.toLowerCase()}, Salt Lake City contractors, construction services Utah`,
    openGraph: {
      title,
      description,
      url: `https://wildwestslc.com/${pageName.toLowerCase().replace(/\s+/g, "-")}`,
      siteName: "Wild West Construction",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/images/og-construction.jpg",
          width: 1200,
          height: 630,
          alt: `Wild West Construction - ${pageName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-construction.jpg"],
    },
    alternates: {
      canonical: `https://wildwestslc.com/${pageName.toLowerCase().replace(/\s+/g, "-")}`,
      languages: {
        "en-US": `https://wildwestslc.com/${pageName.toLowerCase().replace(/\s+/g, "-")}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Generate enhanced metadata for city hub pages with Utah local SEO focus
 */
export function generateCityHubMetadata(
  city: string,
  pageData?: Page,
): Metadata {
  const displayCity = CITY_DISPLAY_NAMES[city] || city;

  const title =
    pageData?.meta_title ||
    `Construction Services in ${displayCity}, Utah | Wild West Construction - Licensed Contractors`;
  
  // Create unique, compelling meta descriptions for better indexation
  const description =
    pageData?.meta_description ||
    `Top-rated construction services in ${displayCity}, Utah. Wild West Construction offers professional flooring, demolition & junk removal with 10+ years experience. Licensed, bonded & insured contractors serving Salt Lake County. Free estimates, same-day quotes. Call (801) 691-4065 for quality work at competitive prices.`;

  // Enhanced Utah-focused keywords
  const localKeywords = [
    `construction services ${displayCity} Utah`,
    `contractors ${displayCity} UT`,
    `flooring installation ${displayCity}`,
    `demolition services ${displayCity}`,
    `junk removal ${displayCity} Utah`,
    `licensed contractors Salt Lake County`,
    `${displayCity} home improvement`,
    `Utah construction company`,
    `${displayCity} renovation services`,
    `Salt Lake County contractors`,
    `construction contractor near me ${displayCity}`,
    `reliable construction services ${displayCity}`,
  ].join(", ");

  return {
    title,
    description,
    keywords: localKeywords,
    authors: [{ name: "Wild West Construction" }],
    creator: "Wild West Construction",
    publisher: "Wild West Construction",
    openGraph: {
      title,
      description,
      url: `https://wildwestslc.com/locations/${city}`,
      siteName: "Wild West Construction",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/images/og-construction.jpg",
          width: 1200,
          height: 630,
          alt: `Professional Construction Services in ${displayCity}, Utah - Wild West Construction`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/og-construction.jpg"],
      creator: "@wildwestslc",
      site: "@wildwestslc",
    },
    alternates: {
      canonical: `https://wildwestslc.com/locations/${city}`,
      languages: {
        "en-US": `https://wildwestslc.com/locations/${city}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "geo.region": "US-UT",
      "geo.placename": displayCity,
      "geo.position": "40.6669;-111.8904",
      ICBM: "40.6669, -111.8904",
    },
  };
}

/**
 * Generate enhanced metadata for service pages with local Utah SEO optimization
 */
export function generateServiceMetadata(
  city: string,
  service: ServiceType,
  pageData?: Page,
): Metadata {
  const displayCity = CITY_DISPLAY_NAMES[city] || city;
  const serviceName = SERVICE_DISPLAY_NAMES[service];

  const title =
    pageData?.meta_title ||
    `${serviceName} Services in ${displayCity}, Utah | Wild West Construction - Licensed Contractors`;
  
  // Create unique, compelling meta descriptions based on service type
  const serviceDescriptions = {
    flooring: `Professional flooring installation in ${displayCity}, Utah. Wild West Construction specializes in hardwood, vinyl, tile & carpet installation with 10+ years experience. Licensed contractors offering free estimates, quality materials & workmanship guarantee. Same-day quotes available. Call (801) 691-4065 for expert flooring services.`,
    demolition: `Expert demolition services in ${displayCity}, Utah. Wild West Construction handles interior/exterior demolition, debris removal & site cleanup. Licensed, insured contractors with professional equipment. Safe, efficient demolition for homes & businesses. Free estimates. Call (801) 691-4065 today.`,
    junk_removal: `Fast junk removal in ${displayCity}, Utah. Wild West Construction removes construction debris, furniture, appliances & household items. Same-day service available. Licensed haulers with proper disposal methods. Residential & commercial cleanouts. Free estimates. Call (801) 691-4065 for reliable junk removal.`
  };
  
  const description =
    pageData?.meta_description ||
    serviceDescriptions[service];

  // Service-specific Utah keywords with enhanced local focus
  const serviceKeywords = {
    flooring: [
      `flooring installation ${displayCity} Utah`,
      `hardwood flooring ${displayCity}`,
      `tile installation ${displayCity}`,
      `laminate flooring ${displayCity} UT`,
      `vinyl plank flooring ${displayCity}`,
      `carpet installation ${displayCity}`,
      `floor refinishing ${displayCity}`,
      `flooring contractors near me ${displayCity}`,
      `Salt Lake County flooring contractors`,
      `Utah flooring services`,
      `best flooring company ${displayCity}`,
    ],
    demolition: [
      `demolition services ${displayCity} Utah`,
      `interior demolition ${displayCity}`,
      `kitchen demolition ${displayCity}`,
      `bathroom demolition ${displayCity}`,
      `concrete removal ${displayCity} UT`,
      `demolition contractors near me ${displayCity}`,
      `house demolition ${displayCity}`,
      `commercial demolition ${displayCity}`,
      `demolition contractors Salt Lake County`,
      `Utah demolition services`,
      `debris removal ${displayCity}`,
    ],
    junk_removal: [
      `junk removal ${displayCity} Utah`,
      `construction debris removal ${displayCity}`,
      `furniture removal ${displayCity}`,
      `appliance removal ${displayCity} UT`,
      `estate cleanouts ${displayCity}`,
      `junk hauling ${displayCity}`,
      `waste removal services ${displayCity}`,
      `junk removal near me ${displayCity}`,
      `junk removal Salt Lake County`,
      `Utah waste removal services`,
      `debris hauling ${displayCity}`,
    ],
  };

  const keywords = [
    ...serviceKeywords[service],
    `${serviceName.toLowerCase()} contractors ${displayCity}`,
    `licensed ${serviceName.toLowerCase()} Utah`,
    `${displayCity} construction services`,
    `Salt Lake County ${serviceName.toLowerCase()}`,
    `affordable ${serviceName.toLowerCase()} ${displayCity}`,
  ].join(", ");

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Wild West Construction" }],
    creator: "Wild West Construction",
    publisher: "Wild West Construction",
    openGraph: {
      title,
      description,
      url: `https://wildwestslc.com/locations/${city}/${service}`,
      siteName: "Wild West Construction",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `/images/og-${service}.jpg`,
          width: 1200,
          height: 630,
          alt: `Professional ${serviceName} Services in ${displayCity}, Utah - Wild West Construction`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/images/og-${service}.jpg`],
      creator: "@wildwestslc",
      site: "@wildwestslc",
    },
    alternates: {
      canonical: `https://wildwestslc.com/locations/${city}/${service}`,
      languages: {
        "en-US": `https://wildwestslc.com/locations/${city}/${service}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "geo.region": "US-UT",
      "geo.placename": displayCity,
      "geo.position": "40.6669;-111.8904",
      ICBM: "40.6669, -111.8904",
      "service-type": serviceName,
    },
  };
}

/**
 * Fetch page data by slug from Supabase
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) {
      console.error("Error fetching page by slug:", error);
      return null;
    }

    return data as Page;
  } catch (error) {
    console.error("Error in getPageBySlug:", error);
    return null;
  }
}

/**
 * Get all published pages for a city (for hub page service links)
 */
export async function getCityPages(city: string): Promise<Page[]> {
  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("city", city)
      .eq("published", true)
      .order("service");

    if (error) {
      console.error("Error fetching city pages:", error);
      return [];
    }

    return (data as Page[]) || [];
  } catch (error) {
    console.error("Error in getCityPages:", error);
    return [];
  }
}

/**
 * Generate static paths for city pages
 */
export function generateCityPaths() {
  return Object.keys(CITY_DISPLAY_NAMES).map((city) => ({
    params: { city },
  }));
}

/**
 * Generate static paths for service pages
 */
export function generateServicePaths() {
  const paths = [];

  for (const city of Object.keys(CITY_DISPLAY_NAMES)) {
    for (const service of SERVICES) {
      // Convert underscore to hyphen for URLs
      const serviceUrl = service.replace(/_/g, "-");
      paths.push({
        params: { city, service: serviceUrl },
      });
    }
  }

  return paths;
}

/**
 * Increment page views
 */
export async function incrementPageViews(pageId: string): Promise<void> {
  try {
    const supabase = await createServerClient();

    await supabase.rpc("increment_page_views", {
      page_uuid: pageId,
    });
  } catch (error) {
    console.error("Error incrementing page views:", error);
  }
}

/**
 * Check if a database page slug conflicts with location routes
 * Returns the preferred canonical URL to prevent conflicts
 */
export function resolveCanonicalConflicts(slug: string, pageData?: Page): string {
  const baseUrl = "https://wildwestslc.com";
  
  if (!pageData) {
    return `${baseUrl}/${slug}`;
  }
  
  const { city, service } = pageData;
  
  // Check if this database page matches a potential location route pattern
  const citySlug = Object.keys(CITY_DISPLAY_NAMES).find(key => 
    CITY_DISPLAY_NAMES[key].toLowerCase().replace(/\s+/g, "-") === city.toLowerCase().replace(/\s+/g, "-")
  );
  
  if (citySlug && SERVICES.includes(service)) {
    // This database page conflicts with location routes
    // Prefer the location route structure for better SEO hierarchy
    const serviceSlug = service.replace(/_/g, "-");
    const preferredUrl = `${baseUrl}/locations/${citySlug}/${serviceSlug}`;
    
    // Log the conflict for monitoring
    console.log(`Canonical conflict resolved: ${slug} -> preferred: /locations/${citySlug}/${serviceSlug}`);
    
    return preferredUrl;
  }
  
  // No conflict, use database page URL
  return `${baseUrl}/${slug}`;
}

/**
 * Generate enhanced metadata for database pages with conflict resolution
 */
export function generateDatabasePageMetadata(
  slug: string,
  pageData: Page,
): Metadata {
  const displayCity = CITY_DISPLAY_NAMES[pageData.city] || pageData.city;
  const serviceName = SERVICE_DISPLAY_NAMES[pageData.service];
  
  // Resolve canonical conflicts
  const canonicalUrl = resolveCanonicalConflicts(slug, pageData);
  
  const title = pageData.meta_title || `${pageData.keyword} | Wild West Construction - Utah Contractors`;
  
  // Create unique meta description if missing
  const description = pageData.meta_description || 
    `Professional ${serviceName.toLowerCase()} services in ${displayCity}, Utah. Wild West Construction delivers expert ${serviceName.toLowerCase()} with quality materials, skilled craftsmen & competitive pricing. Licensed, bonded & insured contractors. Free estimates available. Call (801) 691-4065 for reliable construction services.`;

  // Enhanced keywords for database pages
  const keywords = [
    pageData.keyword,
    `${serviceName} ${displayCity} Utah`,
    `construction services ${displayCity}`,
    `contractors ${displayCity} UT`,
    `licensed contractors Salt Lake County`,
    `${displayCity} home improvement`,
    `Utah construction company`,
    `Salt Lake County contractors`,
    `${serviceName.toLowerCase()} contractors near me`,
    `professional ${serviceName.toLowerCase()} ${displayCity}`,
  ].join(", ");

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Wild West Construction" }],
    creator: "Wild West Construction",
    publisher: "Wild West Construction",
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Wild West Construction",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `/images/og-${pageData.service}.jpg`,
          width: 1200,
          height: 630,
          alt: `${serviceName} Services in ${displayCity}, Utah - Wild West Construction`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/images/og-${pageData.service}.jpg`],
      creator: "@wildwestslc",
      site: "@wildwestslc",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-US": canonicalUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "geo.region": "US-UT",
      "geo.placename": displayCity,
      "geo.position": "40.6669;-111.8904",
      ICBM: "40.6669, -111.8904",
      "service-type": serviceName,
    },
  };
}
