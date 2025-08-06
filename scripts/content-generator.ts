/**
 * Content Generation Utilities for Wild West Construction SEO Pages
 * Generates unique, SEO-optimized content for city-service combinations
 *
 * Business Information:
 * - Name: Wild West Construction
 * - Address: 4097 S 420 W Murray, UT 84123
 * - Phone: (801) 691-4065
 * - Email: info@wildwestslc.com
 * - WhatsApp: https://wa.me/18016914065
 */

import { ServiceType } from "../types/database";

// Salt Lake County cities (15 cities in order of population)
export const SALT_LAKE_COUNTY_CITIES = [
  "Salt Lake City",
  "West Valley City",
  "West Jordan",
  "Sandy",
  "South Jordan",
  "Taylorsville",
  "Herriman",
  "Draper",
  "Murray",
  "Riverton",
  "Midvale",
  "Cottonwood Heights",
  "Holladay",
  "South Salt Lake",
  "Bluffdale",
] as const;

export type SaltLakeCity = (typeof SALT_LAKE_COUNTY_CITIES)[number];

// Keywords for each service category (25 per service as specified)
export const SERVICE_KEYWORDS: Record<ServiceType, string[]> = {
  flooring: [
    "hardwood flooring installation",
    "luxury vinyl plank installation",
    "flooring installation",
    "LVP installation",
    "laminate flooring installation",
    "hardwood flooring installation cost",
    "luxury vinyl plank installation cost",
    "laminate installation cost",
    "flooring contractors",
    "best flooring installers",
    "hardwood floor installation contractors",
    "LVP flooring installation professionals",
    "laminate floor installation services",
    "luxury vinyl tile installation",
    "engineered hardwood installation",
    "Shaw LVP installation",
    "COREtec flooring installation",
    "Mohawk hardwood installation",
    "Armstrong vinyl plank installation",
    "Karndean luxury vinyl installation",
    "waterproof flooring installation",
    "hardwood vs laminate installation",
    "DIY vs professional flooring installation",
    "flooring installation services",
    "residential flooring installation",
  ],
  demolition: [
    "demolition contractors",
    "commercial demolition",
    "demolition services",
    "licensed demolition contractor",
    "emergency demolition services",
    "demolition quote",
    "interior demolition contractors",
    "kitchen demolition",
    "bathroom demolition contractors",
    "wall removal services",
    "commercial building demolition",
    "residential demolition",
    "selective demolition services",
    "demolition permit",
    "concrete demolition",
    "structural demolition contractors",
    "demolition cost",
    "same day demolition",
    "affordable demolition services",
    "professional demolition contractors",
    "insured demolition company",
    "demolition debris removal",
    "tenant improvement demolition",
    "retail store demolition",
    "warehouse demolition contractors",
  ],
  junk_removal: [
    "junk removal",
    "construction debris removal",
    "junk removal services",
    "same day junk removal",
    "commercial junk removal",
    "estate cleanout services",
    "junk hauling quote",
    "furniture removal",
    "appliance removal services",
    "construction waste removal",
    "office cleanout services",
    "yard waste removal",
    "basement cleanout",
    "emergency junk removal",
    "next day junk pickup",
    "urgent debris removal",
    "24 hour junk removal",
    "affordable junk removal",
    "cheap junk hauling",
    "junk removal cost",
    "free junk removal estimate",
    "hazardous waste removal",
    "electronic waste disposal",
    "mattress disposal",
    "foreclosure cleanout services",
  ],
};

// Neighborhoods and landmarks for each city
export const CITY_NEIGHBORHOODS: Record<string, string[]> = {
  "Salt Lake City": [
    "Downtown",
    "Capitol Hill",
    "The Avenues",
    "Sugar House",
    "Millcreek",
    "Rose Park",
    "Glendale",
    "Poplar Grove",
    "East Central",
  ],
  "West Valley City": [
    "Granger",
    "Hunter",
    "Chesterfield",
    "Redwood",
    "Valley Fair Mall Area",
  ],
  "West Jordan": [
    "Jordan Landing",
    "Copper Hills",
    "Bingham Junction",
    "Old Bingham Highway",
  ],
  Sandy: [
    "Alta View",
    "Bell Canyon",
    "Crescent View",
    "Dimple Dell",
    "Eastridge",
  ],
  "South Jordan": [
    "Daybreak",
    "South Jordan Parkway",
    "River Front",
    "Glenmoor",
    "The District",
  ],
  Taylorsville: ["Bennion", "Kearns", "Valley Center", "Taylorsville-Bennion"],
  Herriman: [
    "Herriman Towne Center",
    "Rose Canyon",
    "Mountain View Village",
    "Rosecrest",
  ],
  Draper: ["South Mountain", "Corner Canyon", "SunCrest", "Steep Mountain"],
  Murray: [
    "Fashion Place",
    "Murray Park",
    "Vine Street",
    "State Street Corridor",
  ],
  Riverton: ["Blackridge", "South Hills", "River Oaks", "Riverton City Center"],
  Midvale: [
    "Fort Union",
    "East Midvale",
    "Center Street",
    "Midvale Main Street",
  ],
  "Cottonwood Heights": [
    "Big Cottonwood",
    "Union Park",
    "Butler Elementary",
    "Fort Union",
  ],
  Holladay: [
    "Holladay Village",
    "Cottonwood Mall Area",
    "4500 South",
    "Highland Drive",
  ],
  "South Salt Lake": [
    "Central Park",
    "State Street",
    "West Side",
    "3300 South Corridor",
  ],
  Bluffdale: [
    "Porter Rockwell",
    "Bluffdale City Center",
    "Herriman Border",
    "Sienna Hills",
  ],
};

// Service-specific content variations
export const SERVICE_DESCRIPTIONS: Record<
  ServiceType,
  {
    short: string;
    detailed: string;
    benefits: string[];
    process: string[];
  }
> = {
  flooring: {
    short: "Professional flooring installation and repair services",
    detailed:
      "Transform your space with our expert flooring solutions. From hardwood and laminate to tile and luxury vinyl, we deliver quality installations that enhance your property value and aesthetic appeal.",
    benefits: [
      "Increase property value",
      "Improve indoor air quality",
      "Enhance aesthetic appeal",
      "Long-lasting durability",
      "Professional installation warranty",
      "Expert material selection guidance",
    ],
    process: [
      "Free in-home consultation and measurement",
      "Material selection and ordering",
      "Professional preparation and removal",
      "Precision installation by certified technicians",
      "Final inspection and cleanup",
      "Warranty activation and care instructions",
    ],
  },
  demolition: {
    short: "Safe and efficient demolition services",
    detailed:
      "Our licensed demolition experts provide safe, efficient, and environmentally responsible demolition services for residential and commercial properties.",
    benefits: [
      "Licensed and insured contractors",
      "Safe demolition practices",
      "Proper waste disposal",
      "Minimal disruption to neighbors",
      "Utility disconnection coordination",
      "Site cleanup included",
    ],
    process: [
      "Site assessment and permit acquisition",
      "Utility disconnection coordination",
      "Safety preparation and containment",
      "Systematic demolition execution",
      "Debris removal and disposal",
      "Final site cleanup and inspection",
    ],
  },
  junk_removal: {
    short: "Reliable junk removal and cleanout services",
    detailed:
      "Clear out unwanted items quickly and responsibly with our professional junk removal team. We handle everything from single items to complete property cleanouts.",
    benefits: [
      "Same-day service available",
      "Eco-friendly disposal methods",
      "No sorting required",
      "Heavy lifting handled",
      "Donation coordination",
      "Fair and transparent pricing",
    ],
    process: [
      "Free estimate and scheduling",
      "Professional team arrival",
      "Item identification and sorting",
      "Careful removal and loading",
      "Responsible disposal or donation",
      "Final sweep and cleanup",
    ],
  },
};

// Generate unique meta title (max 60 characters)
export function generateMetaTitle(
  city: string,
  service: ServiceType,
  keyword?: string,
): string {
  const serviceDisplayName = service
    .replace("_", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  if (keyword) {
    // For keyword-specific pages
    const keywordTitle = keyword
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return `${keywordTitle} in ${city} | Wild West Construction`.substring(
      0,
      60,
    );
  }

  // For hub pages
  return `${serviceDisplayName} Services in ${city} | Wild West`.substring(
    0,
    60,
  );
}

// Generate unique meta description (max 160 characters)
export function generateMetaDescription(
  city: string,
  service: ServiceType,
  keyword?: string,
): string {
  const serviceDesc = SERVICE_DESCRIPTIONS[service];
  const baseDescription = keyword
    ? `Professional ${keyword} services in ${city}, UT.`
    : `${serviceDesc.short} in ${city}, UT.`;

  return `${baseDescription} Licensed, insured contractors with 10+ years experience. Free estimates. Call today!`.substring(
    0,
    160,
  );
}

// Generate H1 tag
export function generateH1(
  city: string,
  service: ServiceType,
  keyword?: string,
): string {
  if (keyword) {
    return `${keyword
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")} Services in ${city}, Utah`;
  }

  const serviceDisplayName = service
    .replace("_", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  return `Professional ${serviceDisplayName} Services in ${city}, Utah`;
}

// Generate URL slug
export function generateSlug(
  city: string,
  service: ServiceType,
  keyword?: string,
): string {
  const citySlug = city.toLowerCase().replace(/\s+/g, "-");
  const serviceSlug = service.replace("_", "-");

  if (keyword) {
    const keywordSlug = keyword.toLowerCase().replace(/\s+/g, "-");
    return `${citySlug}-${keywordSlug}`;
  }

  return `${citySlug}-${serviceSlug}`;
}

// Wild West Construction Business Information
export const BUSINESS_INFO = {
  name: "Wild West Construction",
  address: "4097 S 420 W Murray, UT 84123",
  phone: "(801) 691-4065",
  email: "info@wildwestslc.com",
  whatsapp: "https://wa.me/18016914065",
  yearsExperience: "10+",
};

// Generate FAQ content
export function generateFAQ(
  city: string,
  service: ServiceType,
  keyword?: string,
): Array<{ question: string; answer: string }> {
  const serviceDisplay = service.replace("_", " ");
  const serviceCap = serviceDisplay.replace(/\b\w/g, (l) => l.toUpperCase());
  const neighborhoods = CITY_NEIGHBORHOODS[city] || [];
  const randomNeighborhood =
    neighborhoods[Math.floor(Math.random() * neighborhoods.length)];

  const baseFAQs = [
    {
      question: `How much does ${serviceDisplay} cost in ${city}?`,
      answer: `${serviceCap} costs in ${city} vary based on project size and materials. Wild West Construction offers free estimates with transparent, competitive pricing. Most projects range from $500 to $5,000+ depending on scope. Call ${BUSINESS_INFO.phone} for your free estimate.`,
    },
    {
      question: `Are you licensed and insured in ${city}?`,
      answer: `Yes, Wild West Construction is fully licensed and insured to operate in ${city} and throughout Utah. We carry comprehensive liability insurance and workers' compensation coverage for your peace of mind.`,
    },
    {
      question: `Do you serve ${randomNeighborhood} and other ${city} neighborhoods?`,
      answer: `Absolutely! Wild West Construction provides ${serviceDisplay} services throughout ${city}, including ${randomNeighborhood} and all surrounding neighborhoods. Contact us at ${BUSINESS_INFO.phone} for service availability in your area.`,
    },
    {
      question: `What's included in your ${serviceDisplay} service?`,
      answer: `Our ${serviceDisplay} service includes consultation, preparation, professional work execution, cleanup, and disposal. Wild West Construction handles all aspects of the project from start to finish with ${BUSINESS_INFO.yearsExperience} years of experience.`,
    },
    {
      question: `How quickly can you start my ${serviceDisplay} project?`,
      answer: `Wild West Construction typically can start ${serviceDisplay} projects in ${city} within 1-2 weeks, depending on project scope and schedule. Emergency services are available for urgent needs. Call ${BUSINESS_INFO.phone} to schedule your project.`,
    },
    {
      question: `How can I contact Wild West Construction?`,
      answer: `You can reach Wild West Construction at ${BUSINESS_INFO.phone}, email us at ${BUSINESS_INFO.email}, or visit our office at ${BUSINESS_INFO.address}. We also offer WhatsApp messaging for quick responses.`,
    },
  ];

  if (keyword) {
    baseFAQs.unshift({
      question: `What makes your ${keyword} service different?`,
      answer: `Our ${keyword} service in ${city} stands out through quality craftsmanship, transparent pricing, and customer satisfaction guarantee. We use premium materials and proven techniques.`,
    });
  }

  return baseFAQs.slice(0, 5); // Return 5 FAQs
}

// Generate testimonials
export function generateTestimonials(
  city: string,
  service: ServiceType,
): Array<{ name: string; text: string; rating: number }> {
  const serviceDisplay = service.replace("_", " ");
  const firstNames = [
    "Mike",
    "Sarah",
    "David",
    "Jennifer",
    "Robert",
    "Lisa",
    "James",
    "Maria",
    "John",
    "Amanda",
  ];
  const lastInitials = [
    "S.",
    "M.",
    "J.",
    "W.",
    "B.",
    "T.",
    "R.",
    "L.",
    "K.",
    "P.",
  ];

  const testimonialTemplates = [
    `Excellent ${serviceDisplay} work! Wild West Construction's team was professional and completed the project on time. Highly recommend for anyone in ${city}.`,
    `Wild West Construction delivered outstanding ${serviceDisplay} service. Fair pricing and quality results. Very satisfied with the outcome. Will use them again!`,
    `Professional and reliable ${serviceDisplay} contractors. Wild West Construction exceeded our expectations and left everything clean. Great experience overall.`,
    `Top-notch ${serviceDisplay} service in ${city}. Wild West Construction's crew was skilled and courteous. Would definitely use them again for future projects.`,
    `Called ${BUSINESS_INFO.phone} for ${serviceDisplay} service in ${city} and couldn't be happier. Wild West Construction delivered exactly what they promised.`,
    `Found Wild West Construction online and so glad I did! Their ${serviceDisplay} service in ${city} was professional and affordable. Highly recommended!`,
  ];

  return Array.from({ length: 3 }, (_, i) => ({
    name: `${firstNames[i]} ${lastInitials[i]}`,
    text: testimonialTemplates[i],
    rating: 5,
  }));
}

// Generate complete page content
export function generatePageContent(
  city: string,
  service: ServiceType,
  keyword?: string,
): {
  hero_text: string;
  service_description: string;
  city_description: string;
  features: string[];
  testimonials: Array<{ name: string; text: string; rating: number }>;
  faq: Array<{ question: string; answer: string }>;
  cta_text: string;
  sections: Array<{ title: string; content: string }>;
} {
  const serviceDesc = SERVICE_DESCRIPTIONS[service];
  const neighborhoods = CITY_NEIGHBORHOODS[city] || [];
  const serviceDisplay = service.replace("_", " ");
  const serviceCap = serviceDisplay.replace(/\b\w/g, (l) => l.toUpperCase());

  const keywordTitle = keyword
    ? keyword
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : serviceCap;

  return {
    hero_text: keyword
      ? `Expert ${keywordTitle} Services in ${city}, Utah`
      : `Professional ${serviceCap} Services Serving ${city} & Surrounding Areas`,

    service_description: keyword
      ? `Specialized ${keyword} services in ${city}, Utah. Our experienced contractors deliver quality results with attention to detail and customer satisfaction guarantee.`
      : serviceDesc.detailed,

    city_description: `Proudly serving ${city} and neighborhoods including ${neighborhoods.slice(0, 3).join(", ")}, and surrounding areas throughout Utah.`,

    features: serviceDesc.benefits,

    testimonials: generateTestimonials(city, service),

    faq: generateFAQ(city, service, keyword),

    cta_text: `Ready to start your ${serviceDisplay} project in ${city}? Contact Wild West Construction at ${BUSINESS_INFO.phone} or email ${BUSINESS_INFO.email} for a free estimate!`,

    sections: [
      {
        title: `Why Choose Wild West Construction for ${serviceCap} Services?`,
        content: `With ${BUSINESS_INFO.yearsExperience} years of experience serving ${city}, Wild West Construction has built a reputation for excellence in ${serviceDisplay}. Located at ${BUSINESS_INFO.address}, our team combines expertise with quality materials to deliver results that exceed expectations. Call ${BUSINESS_INFO.phone} to experience the difference.`,
      },
      {
        title: `Our ${serviceCap} Process`,
        content: serviceDesc.process
          .map((step, index) => `${index + 1}. ${step}`)
          .join("\n"),
      },
      {
        title: `Serving ${city} Communities`,
        content: `We're proud to serve homeowners and businesses throughout ${city}, including ${neighborhoods.join(", ")}. Our local knowledge and commitment to the community ensure personalized service that meets your specific needs.`,
      },
    ],
  };
}
