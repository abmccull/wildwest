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
  orem: "Orem",
  ogden: "Ogden",
  layton: "Layton",
  taylorsville: "Taylorsville",
  murray: "Murray",
  bountiful: "Bountiful",
  draper: "Draper",
  riverton: "Riverton",
  roy: "Roy",
  "pleasant-grove": "Pleasant Grove",
  "cottonwood-heights": "Cottonwood Heights",
};

// Reverse mapping for URL generation
export const CITY_SLUG_MAP: Record<string, string> = Object.entries(
  CITY_DISPLAY_NAMES,
).reduce((acc, [slug, name]) => ({ ...acc, [name]: slug }), {});

/**
 * Generate schema markup for LocalBusiness
 */
export function generateLocalBusinessSchema(
  city: string,
  services?: ServiceType[],
) {
  const displayCity = CITY_DISPLAY_NAMES[city] || city;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://wildwestslc.com/locations/${city}`,
    name: `Wild West Construction - ${displayCity}`,
    description: `Professional construction services in ${displayCity}, Utah. Licensed, insured, and experienced contractors.`,
    url: `https://wildwestslc.com/locations/${city}`,
    telephone: "+1-801-691-4065",
    email: "info@wildwestslc.com",
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "247",
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "40.6669",
        longitude: "-111.8904",
      },
      geoRadius: "50000",
    },
    ...(services && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Construction Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${SERVICE_DISPLAY_NAMES[service]} Services`,
            description: `Professional ${SERVICE_DISPLAY_NAMES[service].toLowerCase()} services in ${displayCity}, UT`,
          },
        })),
      },
    }),
    sameAs: [
      "https://facebook.com/wildwestslc",
      "https://instagram.com/wildwestslc",
      "https://linkedin.com/company/wildwestslc",
    ],
  };
}

/**
 * Generate schema markup for Service
 */
export function generateServiceSchema(city: string, service: ServiceType) {
  const displayCity = CITY_DISPLAY_NAMES[city] || city;
  const serviceName = SERVICE_DISPLAY_NAMES[service];

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://wildwestslc.com/locations/${city}/${service}`,
    name: `${serviceName} Services in ${displayCity}`,
    description: `Professional ${serviceName.toLowerCase()} services in ${displayCity}, Utah. Licensed and insured contractors with years of experience.`,
    provider: {
      "@type": "LocalBusiness",
      name: "Wild West Construction",
      telephone: "+1-801-691-4065",
      email: "info@wildwestslc.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Murray",
        addressRegion: "UT",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "City",
      name: displayCity,
      containedInPlace: {
        "@type": "State",
        name: "Utah",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${serviceName} Services`,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${serviceName} Installation`,
            description: `Professional ${serviceName.toLowerCase()} installation services`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${serviceName} Repair`,
            description: `Expert ${serviceName.toLowerCase()} repair and maintenance`,
          },
        },
      ],
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
 * Generate metadata for city hub pages
 */
export function generateCityHubMetadata(
  city: string,
  pageData?: Page,
): Metadata {
  const displayCity = CITY_DISPLAY_NAMES[city] || city;

  const title =
    pageData?.meta_title ||
    `Construction Services in ${displayCity}, UT | Wild West Construction`;
  const description =
    pageData?.meta_description ||
    `Professional construction services in ${displayCity}, Utah. Licensed, insured contractors specializing in flooring, demolition, and junk removal. Free estimates available.`;

  return {
    title,
    description,
    keywords: `construction services ${displayCity}, contractors ${displayCity} UT, flooring installation ${displayCity}, demolition services ${displayCity}, junk removal ${displayCity}`,
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
          alt: `Construction Services in ${displayCity}`,
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
      canonical: `https://wildwestslc.com/locations/${city}`,
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
 * Generate metadata for service pages
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
    `${serviceName} Services in ${displayCity}, UT | Wild West Construction`;
  const description =
    pageData?.meta_description ||
    `Professional ${serviceName.toLowerCase()} services in ${displayCity}, Utah. Licensed and experienced contractors. Get your free estimate today.`;

  return {
    title,
    description,
    keywords: `${serviceName.toLowerCase()} ${displayCity}, ${serviceName.toLowerCase()} contractors ${displayCity} UT, ${serviceName.toLowerCase()} services ${displayCity} Utah`,
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
          alt: `${serviceName} Services in ${displayCity}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/images/og-${service}.jpg`],
    },
    alternates: {
      canonical: `https://wildwestslc.com/locations/${city}/${service}`,
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
      paths.push({
        params: { city, service },
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
