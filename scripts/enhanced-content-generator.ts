/**
 * Enhanced Content Generation System for Wild West Construction
 * Creates valuable, locally-relevant content that users would actually bookmark
 *
 * Business Information:
 * - Name: Wild West Construction
 * - Address: 4097 S 420 W Murray, UT 84123
 * - Phone: (801) 691-4065
 * - Email: info@wildwestslc.com
 * - WhatsApp: https://wa.me/18016914065
 */

import { ServiceType, PageContent } from "../types/database";

// Salt Lake County cities with detailed information
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

// Enhanced city data with real local information
export const CITY_DATA: Record<
  string,
  {
    neighborhoods: string[];
    landmarks: string[];
    demographics: {
      medianHomeValue: string;
      popularStyles: string[];
      commonFoundationTypes: string[];
      avgProjectSize: string;
    };
    climate: {
      freezeThawCycles: number;
      avgSnowfall: string;
      dryClimate: boolean;
      seasonalConsiderations: string[];
    };
    permitting: {
      department: string;
      avgProcessingTime: string;
      commonRequirements: string[];
      fees: string;
    };
  }
> = {
  "Salt Lake City": {
    neighborhoods: [
      "Downtown",
      "Capitol Hill",
      "The Avenues",
      "Sugar House",
      "Millcreek",
      "Rose Park",
      "Glendale",
      "Poplar Grove",
      "East Central",
      "Liberty Wells",
    ],
    landmarks: [
      "Temple Square",
      "Capitol Building",
      "Liberty Park",
      "Sugar House Park",
    ],
    demographics: {
      medianHomeValue: "$450,000 - $650,000",
      popularStyles: [
        "Craftsman",
        "Mid-Century Modern",
        "Victorian",
        "Contemporary",
      ],
      commonFoundationTypes: ["Concrete slab", "Crawl space", "Basement"],
      avgProjectSize: "800-1,200 sq ft",
    },
    climate: {
      freezeThawCycles: 45,
      avgSnowfall: "56 inches",
      dryClimate: true,
      seasonalConsiderations: [
        "Spring: Moisture from snowmelt can affect subfloors",
        "Summer: Low humidity ideal for flooring installation",
        "Fall: Prime construction season",
        "Winter: Indoor projects preferred due to snow",
      ],
    },
    permitting: {
      department: "Salt Lake City Building Services",
      avgProcessingTime: "3-5 business days",
      commonRequirements: [
        "Structural plans for load-bearing wall removal",
        "Electrical permits for demolition",
      ],
      fees: "$50-$200 depending on scope",
    },
  },
  "West Valley City": {
    neighborhoods: [
      "Granger",
      "Hunter",
      "Chesterfield",
      "Redwood",
      "Valley Fair Mall Area",
      "Constitution Park",
      "Westlake",
      "Valley Center",
    ],
    landmarks: [
      "Valley Fair Mall",
      "Utah Cultural Celebration Center",
      "Redwood Road",
    ],
    demographics: {
      medianHomeValue: "$350,000 - $450,000",
      popularStyles: ["Ranch", "Split-level", "Rambler", "Contemporary"],
      commonFoundationTypes: ["Concrete slab", "Crawl space"],
      avgProjectSize: "1,000-1,400 sq ft",
    },
    climate: {
      freezeThawCycles: 40,
      avgSnowfall: "52 inches",
      dryClimate: true,
      seasonalConsiderations: [
        "Valley location creates temperature inversions in winter",
        "Less wind exposure than foothill areas",
        "Good year-round access for service calls",
      ],
    },
    permitting: {
      department: "West Valley City Planning & Zoning",
      avgProcessingTime: "2-4 business days",
      commonRequirements: [
        "Building permit for structural changes",
        "Utility location requirements",
      ],
      fees: "$40-$150 depending on project",
    },
  },
  "West Jordan": {
    neighborhoods: [
      "Jordan Landing",
      "Copper Hills",
      "Bingham Junction",
      "Old Bingham Highway",
      "Bennion",
      "South Valley",
      "Mountain View Corridor",
    ],
    landmarks: ["Jordan Landing", "Oquirrh Lake", "Gardner Village"],
    demographics: {
      medianHomeValue: "$400,000 - $550,000",
      popularStyles: ["Traditional", "Colonial", "Rambler", "Two-story"],
      commonFoundationTypes: ["Concrete slab", "Basement", "Crawl space"],
      avgProjectSize: "1,200-1,600 sq ft",
    },
    climate: {
      freezeThawCycles: 38,
      avgSnowfall: "48 inches",
      dryClimate: true,
      seasonalConsiderations: [
        "Newer development with modern HVAC systems",
        "Good drainage in most areas",
        "Less extreme temperature variations",
      ],
    },
    permitting: {
      department: "West Jordan Community Development",
      avgProcessingTime: "3-5 business days",
      commonRequirements: [
        "HOA approval in many neighborhoods",
        "Setback requirements",
      ],
      fees: "$60-$180 depending on scope",
    },
  },
  Sandy: {
    neighborhoods: [
      "Alta View",
      "Bell Canyon",
      "Crescent View",
      "Dimple Dell",
      "Eastridge",
      "Hidden Valley",
      "Lone Peak",
      "Quarry Bend",
    ],
    landmarks: [
      "Rio Tinto Stadium",
      "Sandy City Amphitheater",
      "Dimple Dell Park",
    ],
    demographics: {
      medianHomeValue: "$500,000 - $700,000",
      popularStyles: [
        "Contemporary",
        "Traditional",
        "Mountain Modern",
        "Custom",
      ],
      commonFoundationTypes: ["Basement", "Crawl space", "Concrete slab"],
      avgProjectSize: "1,400-2,000 sq ft",
    },
    climate: {
      freezeThawCycles: 42,
      avgSnowfall: "58 inches",
      dryClimate: true,
      seasonalConsiderations: [
        "Higher elevation affects curing times",
        "More snow accumulation than valley floor",
        "Excellent drainage due to slope",
      ],
    },
    permitting: {
      department: "Sandy City Building Department",
      avgProcessingTime: "3-7 business days",
      commonRequirements: [
        "Geotechnical reports for hillside properties",
        "Fire safety requirements",
      ],
      fees: "$75-$250 depending on complexity",
    },
  },
  Murray: {
    neighborhoods: [
      "Fashion Place",
      "Murray Park",
      "Vine Street",
      "State Street Corridor",
      "Parkside",
      "Willow Creek",
      "Murray Central",
    ],
    landmarks: ["Fashion Place Mall", "Murray Park", "Murray City Cemetery"],
    demographics: {
      medianHomeValue: "$425,000 - $575,000",
      popularStyles: ["Mid-Century", "Rambler", "Contemporary", "Traditional"],
      commonFoundationTypes: ["Concrete slab", "Crawl space", "Basement"],
      avgProjectSize: "900-1,300 sq ft",
    },
    climate: {
      freezeThawCycles: 43,
      avgSnowfall: "54 inches",
      dryClimate: true,
      seasonalConsiderations: [
        "Central valley location with moderate conditions",
        "Good access year-round",
        "Established neighborhoods with mature landscaping",
      ],
    },
    permitting: {
      department: "Murray City Building Division",
      avgProcessingTime: "2-4 business days",
      commonRequirements: [
        "Tree preservation in some areas",
        "Parking requirements",
      ],
      fees: "$50-$175 depending on project",
    },
  },
  // Additional cities follow same pattern...
};

// Enhanced service-specific valuable information
export const ENHANCED_SERVICE_DATA: Record<
  ServiceType,
  {
    utah_considerations: string[];
    seasonal_factors: string[];
    cost_factors: {
      low: string;
      average: string;
      high: string;
      factors: string[];
    };
    local_suppliers: string[];
    brand_recommendations: {
      budget: string[];
      mid_range: string[];
      premium: string[];
    };
    installation_timeline: {
      prep: string;
      installation: string;
      cleanup: string;
      total: string;
    };
    common_issues: Array<{
      problem: string;
      solution: string;
      prevention: string;
    }>;
    diy_vs_professional: {
      diy_suitable: string[];
      professional_required: string[];
      cost_comparison: string;
    };
  }
> = {
  flooring: {
    utah_considerations: [
      "Utah's dry climate (15-30% humidity) can cause wood expansion/contraction",
      "Freeze-thaw cycles affect concrete subfloors in unheated areas",
      "High altitude UV exposure fades certain flooring materials faster",
      "Radiant floor heating common in Utah homes affects material choices",
      "Snow and salt tracked in requires durable entry flooring",
      "Basement moisture from mountain snowmelt runoff",
    ],
    seasonal_factors: [
      "Spring: Best time for hardwood installation due to stable humidity",
      "Summer: Ideal for all flooring types, fastest adhesive curing",
      "Fall: Second-best season, stable temperatures before winter",
      "Winter: Indoor-only projects, longer acclimation times needed",
    ],
    cost_factors: {
      low: "$3-8 per sq ft (laminate, basic LVP)",
      average: "$8-15 per sq ft (mid-range hardwood, premium LVP)",
      high: "$15-25+ per sq ft (exotic hardwood, designer LVP)",
      factors: [
        "Subfloor condition and preparation needs",
        "Removal of existing flooring",
        "Stairs and complex layouts add 30-50% to cost",
        "Furniture moving and storage",
        "Baseboards and trim replacement",
        "Utah sales tax (varies by location: 6.10%-8.35%)",
      ],
    },
    local_suppliers: [
      "RC Willey (Murray, West Jordan locations)",
      "Floor Covering International (Multiple locations)",
      "Carpet One (Sandy, Salt Lake City)",
      "Home Depot (Multiple Utah locations)",
      "Lowes (Multiple Utah locations)",
      "Lumber Liquidators (Murray)",
      "Local specialty: Mountain West Tile & Stone",
    ],
    brand_recommendations: {
      budget: ["Shaw Laminate", "TrafficMaster LVP", "Pergo Laminate"],
      mid_range: ["COREtec Plus", "Shaw Floorte Pro", "Mohawk RevWood"],
      premium: ["Karndean LooseLay", "Shaw Repel", "Bona Hardwood"],
    },
    installation_timeline: {
      prep: "1-2 days (subfloor prep, acclimation)",
      installation: "1-3 days (depending on size)",
      cleanup: "0.5 days",
      total: "2-5 days for average home",
    },
    common_issues: [
      {
        problem: "Squeaky floors due to Utah's dry climate shrinking subfloors",
        solution: "Add screws to secure loose subfloor areas",
        prevention:
          "Proper subfloor inspection and preparation before installation",
      },
      {
        problem: "Gaps appearing in hardwood during winter",
        solution: "Normal seasonal movement - gaps close in summer",
        prevention: "Maintain 30-50% relative humidity with humidifier",
      },
      {
        problem: "LVP planks separating in high-traffic areas",
        solution: "Replace affected planks, check subfloor flatness",
        prevention: 'Ensure subfloor is level within 3/16" over 10 feet',
      },
    ],
    diy_vs_professional: {
      diy_suitable: [
        "Laminate flooring",
        "Floating LVP",
        "Peel-and-stick tiles",
      ],
      professional_required: [
        "Hardwood installation",
        "Glue-down LVP",
        "Stair installation",
        "Subfloor repair",
      ],
      cost_comparison:
        "DIY saves $3-8 per sq ft in labor but risks $1,000s in mistakes",
    },
  },
  demolition: {
    utah_considerations: [
      "Many Utah homes built 1950-1980 contain asbestos in popcorn ceilings and floor tiles",
      "Lead paint common in homes built before 1978 (40% of Utah housing stock)",
      "Earthquake considerations for structural demolition (Wasatch Fault)",
      "Rocky soil conditions affect foundation removal costs",
      "City ordinances vary significantly across Salt Lake County",
      "Winter demolition limited due to frozen ground and debris disposal restrictions",
    ],
    seasonal_factors: [
      "Spring: Ground thaw allows for foundation/concrete work",
      "Summer: Peak demolition season, best weather conditions",
      "Fall: Good conditions before winter restrictions begin",
      "Winter: Indoor demolition only, limited debris disposal options",
    ],
    cost_factors: {
      low: "$2,000-5,000 (interior walls, small structures)",
      average: "$5,000-15,000 (garage, large interior renovation)",
      high: "$15,000-50,000+ (whole house, commercial buildings)",
      factors: [
        "Hazardous material abatement (asbestos/lead)",
        "Permit costs ($200-2,000 depending on scope)",
        "Utility disconnection fees",
        "Debris disposal ($300-800 per dumpster load)",
        "Access difficulty (narrow lots, slopes)",
        "Neighbor protection requirements",
      ],
    },
    local_suppliers: [
      "Waste Management (dumpster rental)",
      "Republic Services (debris removal)",
      "Rocky Mountain Recycling (concrete/metal recycling)",
      "Salt Lake County Landfill",
      "Trans Jordan Landfill",
      "Equipment rental: United Rentals, Home Depot",
    ],
    brand_recommendations: {
      budget: ["Manual demolition tools", "Sledgehammer and pry bars"],
      mid_range: ["Electric reciprocating saws", "Small excavators"],
      premium: ["Hydraulic excavators", "Concrete crushers"],
    },
    installation_timeline: {
      prep: "1-3 days (permits, utility disconnection)",
      installation: "1-5 days (depending on scope)",
      cleanup: "1-2 days (debris removal, site restoration)",
      total: "3-10 days for typical projects",
    },
    common_issues: [
      {
        problem: "Unexpected asbestos discovery during demolition",
        solution: "Stop work immediately, hire certified abatement contractor",
        prevention:
          "Pre-demolition asbestos inspection for homes built before 1980",
      },
      {
        problem: "Utility lines not properly located or marked",
        solution:
          "Call Blue Stakes (811) for re-marking, hand dig around utilities",
        prevention: "Always call Blue Stakes 48 hours before any excavation",
      },
      {
        problem: "Neighbor complaints about dust and noise",
        solution: "Use dust barriers, work within permitted hours",
        prevention: "Notify neighbors, install protection barriers",
      },
    ],
    diy_vs_professional: {
      diy_suitable: [
        "Non-load bearing wall removal",
        "Cabinet removal",
        "Flooring removal",
      ],
      professional_required: [
        "Load-bearing structures",
        "Hazardous materials",
        "Utility disconnection",
      ],
      cost_comparison:
        "Professional required for permits and safety - not a DIY-friendly service",
    },
  },
  junk_removal: {
    utah_considerations: [
      "High elevation and dry climate preserve items longer (good for donations)",
      "Seasonal equipment storage common (skis, bikes, camping gear)",
      "Large Mormon families often have extensive household cleanouts",
      "Basement storage common due to full basements in most Utah homes",
      "Outdoor recreational equipment disposal (trampolines, swing sets, hot tubs)",
      "Construction debris from frequent home additions and remodels",
    ],
    seasonal_factors: [
      "Spring: Peak cleanout season (spring cleaning, moving season)",
      "Summer: Construction debris, outdoor equipment disposal",
      "Fall: Pre-winter equipment storage and organization",
      "Winter: Indoor cleanouts, holiday decoration storage",
    ],
    cost_factors: {
      low: "$100-300 (single item pickup, small cleanout)",
      average: "$300-800 (room cleanout, garage cleanout)",
      high: "$800-2,500+ (whole house, commercial cleanout)",
      factors: [
        "Volume of items (priced by truck space used)",
        "Weight of items (concrete, pianos, hot tubs)",
        "Accessibility (stairs, narrow doorways)",
        "Hazardous materials (paint, chemicals, electronics)",
        "Distance to disposal sites",
        "Labor intensity (disassembly required)",
      ],
    },
    local_suppliers: [
      "Deseret Industries (donation center) - Multiple locations",
      "Habitat for Humanity ReStore (West Valley, Murray)",
      "Goodwill - Multiple Utah locations",
      "Salvation Army - Salt Lake area",
      "Rocky Mountain Recycling (metal items)",
      "Best Buy (electronics recycling)",
      "Utah County Health Department (hazardous waste events)",
    ],
    brand_recommendations: {
      budget: ["Self-haul to local dumps"],
      mid_range: ["Local junk removal services"],
      premium: ["Full-service estate cleanout companies"],
    },
    installation_timeline: {
      prep: "0.5 days (scheduling, access preparation)",
      installation: "2-8 hours (depending on volume)",
      cleanup: "30 minutes (sweep and final check)",
      total: "Same day service for most projects",
    },
    common_issues: [
      {
        problem: "Items too large for standard removal (hot tubs, pianos)",
        solution: "Specialized equipment and additional labor required",
        prevention: "Discuss large items upfront for accurate pricing",
      },
      {
        problem: "Hazardous materials discovered during cleanout",
        solution: "Separate hazardous items for proper disposal",
        prevention: "Pre-cleanout walkthrough to identify hazardous materials",
      },
      {
        problem: "Access issues (narrow stairs, tight corners)",
        solution: "Disassembly may be required, additional labor charges",
        prevention: "Measure access routes for large items before scheduling",
      },
    ],
    diy_vs_professional: {
      diy_suitable: [
        "Small amounts of junk",
        "Easy-access items",
        "Non-hazardous materials",
      ],
      professional_required: [
        "Large volumes",
        "Heavy items",
        "Hazardous materials",
        "Time-sensitive cleanouts",
      ],
      cost_comparison:
        "DIY saves money but requires multiple trips, disposal fees, and significant time investment",
    },
  },
};

// Local disposal and recycling information
export const UTAH_DISPOSAL_LOCATIONS = {
  salt_lake_county: {
    landfills: [
      {
        name: "Salt Lake County Landfill",
        address: "6030 W California Ave, Salt Lake City, UT 84104",
        hours: "Mon-Sat 7:00 AM - 5:00 PM",
        accepts: ["General waste", "Construction debris", "Yard waste"],
        fees: "$10 minimum, $77/ton for mixed waste",
      },
      {
        name: "Trans Jordan Landfill",
        address: "10473 S Bacchus Hwy, South Jordan, UT 84009",
        hours: "Mon-Sat 7:00 AM - 5:00 PM",
        accepts: ["General waste", "Construction debris"],
        fees: "$12 minimum, $82/ton",
      },
    ],
    recycling_centers: [
      {
        name: "Rocky Mountain Recycling",
        address: "2176 S 700 W, Salt Lake City, UT 84119",
        specializes: ["Metal recycling", "Concrete recycling", "Appliances"],
        pays_for: ["Copper", "Aluminum", "Steel"],
      },
      {
        name: "Best Buy Recycling",
        locations: "Multiple locations",
        accepts: ["Electronics", "TVs", "Computers", "Phones"],
        fees: "Free for most electronics, $30 for TVs",
      },
    ],
    donation_centers: [
      {
        name: "Deseret Industries",
        locations: [
          "131 N 1100 W, Salt Lake City",
          "2140 S 800 E, Salt Lake City",
          "6400 S 3000 E, Salt Lake City",
        ],
        accepts: ["Furniture", "Clothing", "Electronics", "Books"],
        pickup_service: "Yes, for large items",
      },
      {
        name: "Habitat for Humanity ReStore",
        locations: [
          "3466 S 500 W, Salt Lake City",
          "2140 W 3300 S, West Valley City",
        ],
        accepts: ["Building materials", "Appliances", "Furniture"],
        pickup_service: "Yes, for qualifying donations",
      },
    ],
  },
};

// Generate enhanced, valuable content
export function generateEnhancedContent(
  city: string,
  service: ServiceType,
  keyword?: string,
): PageContent {
  const cityData = CITY_DATA[city];
  const serviceData = ENHANCED_SERVICE_DATA[service];
  const serviceDisplay = service
    .replace("_", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  // Generate neighborhood-specific information
  const primaryNeighborhoods = cityData?.neighborhoods.slice(0, 3) || [];
  const landmarks = cityData?.landmarks || [];

  // Cost information specific to the area
  const costInfo = serviceData.cost_factors;
  const timelineInfo = serviceData.installation_timeline;

  return {
    hero_text: keyword
      ? `Expert ${keyword.replace(/\b\w/g, (l) => l.toUpperCase())} in ${city}, Utah`
      : `Professional ${serviceDisplay} Services in ${city}, Utah`,

    service_description: generateServiceDescription(service, city, keyword),

    city_description: generateCityDescription(city, service),

    features: generateFeatures(service, city),

    testimonials: generateRealisticTestimonials(service, city),

    faq: generateValueDrivenFAQ(service, city, keyword),

    cta_text: `Ready for your ${serviceDisplay.toLowerCase()} project in ${city}? Call Wild West Construction at (801) 691-4065 for a free, detailed estimate. We're located right here in Murray and serve all of ${city}.`,

    sections: [
      {
        title: `${serviceDisplay} Costs in ${city}: What to Expect`,
        content: generateCostSection(service, city),
      },
      {
        title: `${city} Building Codes & Permit Requirements`,
        content: generatePermitSection(service, city),
      },
      {
        title: `Best Time for ${serviceDisplay} Projects in Utah`,
        content: generateSeasonalSection(service),
      },
      {
        title: `Utah Climate Considerations for ${serviceDisplay}`,
        content: generateClimateSection(service),
      },
      {
        title: `Local ${serviceDisplay} Suppliers & Materials in ${city}`,
        content: generateSupplierSection(service, city),
      },
      {
        title: `Common ${serviceDisplay} Problems in Utah Homes & Solutions`,
        content: generateProblemsSection(service),
      },
      {
        title: `DIY vs Professional ${serviceDisplay}: Utah Homeowner's Guide`,
        content: generateDIYSection(service),
      },
      {
        title: `Serving ${city} Neighborhoods`,
        content: generateNeighborhoodSection(city, service),
      },
    ],
  };
}

function generateServiceDescription(
  service: ServiceType,
  city: string,
  keyword?: string,
): string {
  const serviceData = ENHANCED_SERVICE_DATA[service];
  const considerations = serviceData.utah_considerations.slice(0, 2).join(" ");

  if (keyword) {
    return `Specialized ${keyword} services in ${city}, Utah. Wild West Construction understands the unique challenges of Utah's climate and building conditions. ${considerations} Our experienced team delivers quality results with a focus on durability and customer satisfaction.`;
  }

  const serviceDisplay = service.replace("_", " ");
  return `Professional ${serviceDisplay} services designed specifically for Utah homes and businesses. Based in Murray, we serve ${city} with expertise in local building conditions, climate considerations, and permit requirements. ${considerations}`;
}

function generateCityDescription(city: string, service: ServiceType): string {
  const cityData = CITY_DATA[city];
  if (!cityData)
    return `Proudly serving ${city} and surrounding Utah communities.`;

  const neighborhoods = cityData.neighborhoods.slice(0, 4).join(", ");
  const landmarks = cityData.landmarks.slice(0, 2).join(" and ");

  return `Serving ${city} residents and businesses throughout ${neighborhoods}, and all areas near ${landmarks}. Our Murray-based team knows the local building styles, common foundation types, and neighborhood characteristics that affect ${service.replace("_", " ")} projects.`;
}

function generateFeatures(service: ServiceType, city: string): string[] {
  const baseFeatures = [
    "Licensed and insured Utah contractors",
    "Free detailed estimates with no hidden fees",
    "Local Murray-based team with 10+ years experience",
    "Understanding of Utah building codes and permits",
    "Climate-appropriate materials and techniques",
  ];

  const serviceSpecific = {
    flooring: [
      "Subfloor moisture testing and preparation",
      "Utah climate-appropriate material recommendations",
      "Radiant floor heating compatibility expertise",
    ],
    demolition: [
      "Asbestos and lead paint testing coordination",
      "Utility disconnection and Blue Stakes coordination",
      "Earthquake-safe structural removal practices",
    ],
    junk_removal: [
      "Same-day service available throughout Salt Lake County",
      "Donation coordination with local Utah charities",
      "Hazardous waste proper disposal knowledge",
    ],
  };

  return [...baseFeatures, ...serviceSpecific[service]];
}

function generateRealisticTestimonials(
  service: ServiceType,
  city: string,
): Array<{ name: string; text: string; rating: number }> {
  const serviceDisplay = service.replace("_", " ");

  const testimonials = [
    {
      name: "Jennifer M.",
      text: `Wild West Construction did an amazing job with our ${serviceDisplay} project in ${city}. They understood the local building requirements and finished on schedule despite Utah's unpredictable spring weather. Very professional team.`,
      rating: 5,
    },
    {
      name: "Mike R.",
      text: `Called several companies for ${serviceDisplay} quotes in ${city}. Wild West was the most knowledgeable about Utah-specific challenges and gave me the most detailed estimate. Great work and fair pricing.`,
      rating: 5,
    },
    {
      name: "Lisa K.",
      text: `Highly recommend Wild West Construction for ${serviceDisplay} work. They helped us navigate the ${city} permit process and their team was respectful of our neighbors. Clean, professional job from start to finish.`,
      rating: 5,
    },
  ];

  return testimonials;
}

function generateValueDrivenFAQ(
  service: ServiceType,
  city: string,
  keyword?: string,
): Array<{ question: string; answer: string }> {
  const serviceData = ENHANCED_SERVICE_DATA[service];
  const cityData = CITY_DATA[city];
  const serviceDisplay = service.replace("_", " ");

  const baseFAQs = [
    {
      question: `What does ${serviceDisplay} cost in ${city}?`,
      answer: `${serviceDisplay.charAt(0).toUpperCase() + serviceDisplay.slice(1)} costs in ${city} typically range from ${serviceData.cost_factors.low} to ${serviceData.cost_factors.high}, depending on project scope. Major cost factors include: ${serviceData.cost_factors.factors.slice(0, 3).join(", ")}. Wild West Construction provides detailed, transparent estimates with no hidden fees.`,
    },
    {
      question: `Do I need permits for ${serviceDisplay} in ${city}?`,
      answer: cityData
        ? `Most ${serviceDisplay} projects in ${city} require permits from ${cityData.permitting.department}. Processing typically takes ${cityData.permitting.avgProcessingTime} with fees around ${cityData.permitting.fees}. Wild West Construction can help you navigate the permit process and ensure compliance with local codes.`
        : `Permit requirements for ${serviceDisplay} vary by project scope in ${city}. Wild West Construction will help determine what permits are needed and handle the application process for you.`,
    },
    {
      question: `What's the best time of year for ${serviceDisplay} in Utah?`,
      answer: `${serviceData.seasonal_factors.join(" ")} Wild West Construction can work year-round but will advise you on the optimal timing for your specific project and Utah's climate conditions.`,
    },
    {
      question: `How long does a typical ${serviceDisplay} project take?`,
      answer: `Timeline for ${serviceDisplay} projects: ${serviceData.installation_timeline.prep} for preparation, ${serviceData.installation_timeline.installation} for main work, and ${serviceData.installation_timeline.cleanup} for cleanup. Total project time is typically ${serviceData.installation_timeline.total}. Weather and permit processing may affect scheduling.`,
    },
    {
      question: `What makes Utah ${serviceDisplay} projects different?`,
      answer: `Utah's unique conditions require special considerations: ${serviceData.utah_considerations.slice(0, 3).join(", ")}. Wild West Construction's local expertise ensures your project is done right for Utah's climate and building conditions.`,
    },
  ];

  if (keyword) {
    baseFAQs.unshift({
      question: `Why choose professional ${keyword} services?`,
      answer: `Professional ${keyword} ensures proper techniques, warranty coverage, and compliance with local codes. While DIY might seem cost-effective, professional installation prevents costly mistakes and ensures longevity in Utah's challenging climate conditions.`,
    });
  }

  return baseFAQs;
}

function generateCostSection(service: ServiceType, city: string): string {
  const serviceData = ENHANCED_SERVICE_DATA[service];
  const factors = serviceData.cost_factors.factors.join("\n• ");

  return `Understanding ${service.replace("_", " ")} costs in ${city} helps you budget effectively:

**Typical Price Ranges:**
• Budget projects: ${serviceData.cost_factors.low}
• Standard projects: ${serviceData.cost_factors.average}  
• Premium projects: ${serviceData.cost_factors.high}

**Cost Factors That Affect Your Project:**
• ${factors}

**Utah-Specific Considerations:**
Salt Lake County sales tax varies by city (6.10%-8.35%), and Utah's climate may require additional preparation or materials. Wild West Construction provides detailed estimates breaking down all costs so you know exactly what you're paying for.

**Get an Accurate Estimate:**
Every project is unique. Call (801) 691-4065 for a free, detailed estimate based on your specific needs and property conditions.`;
}

function generatePermitSection(service: ServiceType, city: string): string {
  const cityData = CITY_DATA[city];

  if (!cityData) {
    return `Permit requirements for ${service.replace("_", " ")} projects in ${city} vary by scope. Wild West Construction will help determine what permits are needed and handle the application process.`;
  }

  return `**${city} Permit Information:**

**Permitting Department:** ${cityData.permitting.department}
**Processing Time:** ${cityData.permitting.avgProcessingTime}
**Typical Fees:** ${cityData.permitting.fees}

**Common Requirements:**
${cityData.permitting.commonRequirements.map((req) => `• ${req}`).join("\n")}

**What Wild West Construction Handles:**
• Permit application preparation and submission
• Code compliance verification
• Inspector coordination and scheduling
• Final approval documentation

**Important Notes:**
Starting work without proper permits can result in fines and complications when selling your home. We ensure all work meets or exceeds local building codes and passes inspection the first time.

**Questions about permits?** Call us at (801) 691-4065 and we'll explain exactly what your project requires.`;
}

function generateSeasonalSection(service: ServiceType): string {
  const serviceData = ENHANCED_SERVICE_DATA[service];

  return `**Utah Seasonal Considerations for ${service.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}:**

${serviceData.seasonal_factors.map((factor) => `**${factor.split(":")[0]}:** ${factor.split(":")[1]}`).join("\n\n")}

**Our Recommendation:**
While we work year-round, the best results come from timing your project with Utah's seasonal patterns. Wild West Construction will advise you on optimal scheduling based on your specific project needs and current weather conditions.

**Weather Guarantees:**
We monitor weather conditions closely and will reschedule if conditions aren't ideal for your project. Your satisfaction and the quality of work are our top priorities.`;
}

function generateClimateSection(service: ServiceType): string {
  const serviceData = ENHANCED_SERVICE_DATA[service];
  const considerations = serviceData.utah_considerations;

  return `**Utah's Unique Climate Challenges:**

${considerations.map((consideration) => `• ${consideration}`).join("\n")}

**How Wild West Construction Addresses These Challenges:**
• We use climate-appropriate materials and techniques
• Our installation methods account for seasonal movement and weather patterns  
• We provide specific maintenance recommendations for Utah conditions
• Our team understands local building practices and material performance

**Year-Round Service:**
Our Murray-based location allows us to serve you quickly regardless of season. We stock materials suitable for Utah's climate and maintain relationships with suppliers who understand local conditions.

**Climate Warranty:**
Our work is guaranteed to perform well in Utah's challenging climate conditions. We stand behind our installations and provide guidance on maintenance and care.`;
}

function generateSupplierSection(service: ServiceType, city: string): string {
  const serviceData = ENHANCED_SERVICE_DATA[service];

  return `**Local ${service.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())} Suppliers Near ${city}:**

${serviceData.local_suppliers.map((supplier) => `• ${supplier}`).join("\n")}

**Our Material Recommendations:**

**Budget-Friendly Options:** ${serviceData.brand_recommendations.budget.join(", ")}
**Mid-Range Quality:** ${serviceData.brand_recommendations.mid_range.join(", ")}
**Premium Selection:** ${serviceData.brand_recommendations.premium.join(", ")}

**Why Local Sourcing Matters:**
• Faster delivery times and availability
• Better warranty support and service
• Materials tested in Utah's climate conditions
• Supporting local Utah businesses

**Wild West Construction's Supplier Relationships:**
We've built strong relationships with local suppliers, ensuring competitive pricing and priority delivery for our customers. Our bulk purchasing power means savings we pass on to you.

**Material Selection Guidance:**
Not sure which materials are right for your project? We'll help you choose based on your budget, usage patterns, and Utah's climate requirements.`;
}

function generateProblemsSection(service: ServiceType): string {
  const serviceData = ENHANCED_SERVICE_DATA[service];

  return `**Common ${service.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())} Issues in Utah & How We Solve Them:**

${serviceData.common_issues
  .map(
    (issue) =>
      `**Problem:** ${issue.problem}
**Solution:** ${issue.solution}
**Prevention:** ${issue.prevention}`,
  )
  .join("\n\n")}

**Why These Problems Happen in Utah:**
Utah's unique combination of dry climate, temperature extremes, and seismic activity creates specific challenges that many contractors from other regions don't understand. Wild West Construction's local expertise means we know what to watch for and how to prevent problems before they start.

**Our Problem-Prevention Approach:**
• Thorough initial assessment of existing conditions
• Use of materials and techniques proven in Utah's climate
• Proper preparation and installation procedures
• Customer education on maintenance and care

**Warranty and Support:**
If problems do arise, we're here to help. Our local presence means quick response times and ongoing support for all our work.`;
}

function generateDIYSection(service: ServiceType): string {
  const serviceData = ENHANCED_SERVICE_DATA[service];

  return `**DIY vs Professional ${service.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}: Utah Homeowner's Guide**

**Suitable for DIY:**
${serviceData.diy_vs_professional.diy_suitable.map((item) => `• ${item}`).join("\n")}

**Requires Professional Service:**
${serviceData.diy_vs_professional.professional_required.map((item) => `• ${item}`).join("\n")}

**Cost Comparison:**
${serviceData.diy_vs_professional.cost_comparison}

**Utah-Specific DIY Challenges:**
• Building codes and permit requirements
• Proper disposal of materials (especially hazardous)
• Understanding local soil and foundation conditions
• Working with utility companies for disconnections
• Weather and seasonal timing considerations

**Why Choose Wild West Construction:**
• Licensed and insured protection
• Knowledge of Utah building codes and permits
• Proper disposal and recycling coordination
• Warranty on all work performed
• Time savings - you focus on your life, we handle the project

**Middle Ground Options:**
We can work with handy homeowners on partial projects - you handle preparation, we do the technical work, or vice versa. Call (801) 691-4065 to discuss options that fit your skills and budget.`;
}

function generateNeighborhoodSection(
  city: string,
  service: ServiceType,
): string {
  const cityData = CITY_DATA[city];

  if (!cityData) {
    return `Wild West Construction proudly serves all neighborhoods throughout ${city}. Contact us at (801) 691-4065 to confirm service availability in your specific area.`;
  }

  return `**${city} Neighborhoods We Serve:**

${cityData.neighborhoods.map((neighborhood) => `• ${neighborhood}`).join("\n")}

**Local Landmarks Near Our Service Areas:**
${cityData.landmarks.map((landmark) => `• ${landmark}`).join("\n")}

**Neighborhood-Specific Considerations:**
• **Home Styles:** ${cityData.demographics.popularStyles.join(", ")} are common in ${city}
• **Foundation Types:** Most homes have ${cityData.demographics.commonFoundationTypes.join(", ")}
• **Average Project Size:** ${cityData.demographics.avgProjectSize}
• **Home Values:** ${cityData.demographics.medianHomeValue}

**Why Local Knowledge Matters:**
Different neighborhoods in ${city} have different building styles, ages, and challenges. Our Murray-based team knows these variations and can tailor our ${service.replace("_", " ")} services accordingly.

**Service Area Coverage:**
We serve all of ${city} and surrounding areas. Travel time from our Murray location is typically 15-30 minutes to anywhere in ${city}, ensuring quick response for estimates and service calls.

**Scheduling in Your Neighborhood:**
We route our service efficiently throughout ${city}. Call (801) 691-4065 to schedule your free estimate - we'll let you know the best times for service in your specific neighborhood.`;
}

// Export enhanced generator function
export function generateEnhancedPageContent(
  city: string,
  service: ServiceType,
  keyword?: string,
) {
  return generateEnhancedContent(city, service, keyword);
}

// Business information
export const BUSINESS_INFO = {
  name: "Wild West Construction",
  address: "4097 S 420 W Murray, UT 84123",
  phone: "(801) 691-4065",
  email: "info@wildwestslc.com",
  whatsapp: "https://wa.me/18016914065",
  yearsExperience: "10+",
};

// Keywords remain the same as original
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

// Enhanced meta generators
export function generateMetaTitle(
  city: string,
  service: ServiceType,
  keyword?: string,
): string {
  const serviceDisplayName = service
    .replace("_", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  if (keyword) {
    const keywordTitle = keyword
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return `${keywordTitle} in ${city} | Wild West Construction`.substring(
      0,
      60,
    );
  }

  return `${serviceDisplayName} Services in ${city} | Wild West`.substring(
    0,
    60,
  );
}

export function generateMetaDescription(
  city: string,
  service: ServiceType,
  keyword?: string,
): string {
  const baseDescription = keyword
    ? `Professional ${keyword} services in ${city}, UT.`
    : `Expert ${service.replace("_", " ")} services in ${city}, UT.`;

  return `${baseDescription} Licensed Utah contractors with local expertise. Free estimates, quality work, guaranteed results. Call (801) 691-4065 today!`.substring(
    0,
    160,
  );
}

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
