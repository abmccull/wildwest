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
 * Generate enhanced metadata for footer pages
 */
export function generateFooterPageMetadata(
  pageName: string,
  pageDescription: string,
): Metadata {
  const title = `${pageName} | Wild West Construction - Utah's Premier Contractors`;
  const description = pageDescription;

  return {
    title,
    description,
    keywords: `Wild West Construction ${pageName.toLowerCase()}, Utah construction company ${pageName.toLowerCase()}, Salt Lake City contractors`,
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
  const description =
    pageData?.meta_description ||
    `Professional construction services in ${displayCity}, Utah. Licensed, insured contractors serving Salt Lake County with flooring, demolition, and junk removal. Free estimates & 24/7 service. Call (801) 691-4065.`;

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
  const description =
    pageData?.meta_description ||
    `Expert ${serviceName.toLowerCase()} services in ${displayCity}, Utah. Licensed & insured contractors serving Salt Lake County. Quality workmanship, free estimates, 10-year warranty. Call (801) 691-4065 today.`;

  // Service-specific Utah keywords
  const serviceKeywords = {
    flooring: [
      `flooring installation ${displayCity} Utah`,
      `hardwood flooring ${displayCity}`,
      `tile installation ${displayCity}`,
      `laminate flooring ${displayCity} UT`,
      `carpet installation ${displayCity}`,
      `floor refinishing ${displayCity}`,
      `Salt Lake County flooring contractors`,
      `Utah flooring services`,
    ],
    demolition: [
      `demolition services ${displayCity} Utah`,
      `interior demolition ${displayCity}`,
      `kitchen demolition ${displayCity}`,
      `bathroom demolition ${displayCity}`,
      `concrete removal ${displayCity} UT`,
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
  // Next app router expects an array of params objects
  return Object.keys(CITY_DISPLAY_NAMES).map((city) => ({ city }));
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
