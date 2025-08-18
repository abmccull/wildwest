/**
 * Comprehensive local SEO content system for Utah cities served by Wildwest Construction
 * Contains detailed, locally-optimized content for enhanced search engine visibility
 */

export interface CityNeighborhood {
  name: string;
  slug: string;
  description: string;
  landmarks: string[];
  averageHomeValue: number;
  popularServices: string[];
}

export interface LocalChallenge {
  challenge: string;
  solution: string;
  seasonality: string;
}

export interface CityTestimonial {
  customerName: string;
  neighborhood: string;
  service: string;
  quote: string;
  rating: number;
  projectValue: number;
  completionDate: string;
}

export interface LocalPartnership {
  businessName: string;
  type: 'supplier' | 'permit_office' | 'inspection' | 'professional';
  description: string;
  contactInfo?: string;
}

export interface CityContent {
  overview: string;
  demographics: {
    population: number;
    medianHousehold: number;
    medianHomeValue: number;
    averageHomeAge: number;
    growthRate: string;
  };
  localChallenges: LocalChallenge[];
  popularServices: {
    service: string;
    demand: 'high' | 'medium' | 'low';
    seasonality: string;
    averageProject: number;
    description: string;
  }[];
  neighborhoods: CityNeighborhood[];
  landmarks: {
    name: string;
    type: 'residential' | 'commercial' | 'recreational' | 'historic';
    description: string;
    nearbyProjects: string[];
  }[];
  testimonials: CityTestimonial[];
  localPartnerships: LocalPartnership[];
  emergencyResponse: {
    responseTime: string;
    coverage24_7: boolean;
    specializations: string[];
  };
  buildingCodes: {
    permitOffice: string;
    commonRequirements: string[];
    inspectionProcess: string;
    averagePermitTime: string;
    specialConsiderations: string[];
  };
  serviceAreas: {
    primary: string[];
    secondary: string[];
    emergencyOnly: string[];
  };
  localPhoneNumbers: {
    main: string;
    emergency: string;
    permits: string;
  };
  drivingDirections: {
    fromLandmark: string;
    directions: string;
    estimatedTime: string;
    parkingInfo?: string;
  }[];
}

export const CITY_CONTENT: Record<string, CityContent> = {
  'salt-lake-city-ut': {
    overview:
      "Utah's capital and economic center, Salt Lake City presents unique construction opportunities across diverse neighborhoods from historic downtown to modern suburban areas. Our team understands the city's complex zoning requirements and historic preservation guidelines.",
    demographics: {
      population: 200591,
      medianHousehold: 65000,
      medianHomeValue: 450000,
      averageHomeAge: 45,
      growthRate: '+2.1% annually',
    },
    localChallenges: [
      {
        challenge: 'Historic district renovations require special permits and materials',
        solution:
          'Our certified historic renovation specialists ensure compliance with preservation standards',
        seasonality: 'Year-round with winter weather considerations',
      },
      {
        challenge: 'Seismic building codes require earthquake-resistant construction methods',
        solution: 'We use seismic retrofitting techniques and earthquake-safe building practices',
        seasonality: 'Critical for all seasons',
      },
      {
        challenge: 'High-altitude concrete curing and expansion joint requirements',
        solution: 'Specialized concrete mixtures and installation techniques for elevation',
        seasonality: 'Winter concrete work requires heated curing',
      },
    ],
    popularServices: [
      {
        service: 'Historic Home Renovation',
        demand: 'high',
        seasonality: 'Spring through Fall',
        averageProject: 75000,
        description: 'Preserving character while modernizing historic Salt Lake homes',
      },
      {
        service: 'Basement Finishing',
        demand: 'high',
        seasonality: 'Year-round',
        averageProject: 35000,
        description: 'Converting basements into functional living spaces',
      },
      {
        service: 'Earthquake Retrofitting',
        demand: 'medium',
        seasonality: 'Year-round',
        averageProject: 25000,
        description: 'Seismic strengthening for older homes',
      },
    ],
    neighborhoods: [
      {
        name: 'The Avenues',
        slug: 'the-avenues',
        description: 'Historic hillside neighborhood with Victorian and early 20th-century homes',
        landmarks: ['Ensign Peak', 'Memory Grove', 'Utah State Capitol'],
        averageHomeValue: 650000,
        popularServices: ['Historic Renovation', 'Foundation Repair', 'Custom Millwork'],
      },
      {
        name: 'Sugar House',
        slug: 'sugar-house',
        description: 'Trendy neighborhood mixing historic homes with modern developments',
        landmarks: ['Sugar House Park', 'Westminster College'],
        averageHomeValue: 525000,
        popularServices: ['Kitchen Remodeling', 'ADU Construction', 'Flooring Installation'],
      },
      {
        name: 'Downtown',
        slug: 'downtown',
        description: 'Urban core with historic buildings and modern high-rises',
        landmarks: ['Temple Square', 'City Creek Center', 'Vivint Arena'],
        averageHomeValue: 475000,
        popularServices: ['Loft Conversion', 'Commercial Renovation', 'Rooftop Decks'],
      },
    ],
    landmarks: [
      {
        name: 'Temple Square',
        type: 'historic',
        description: 'Historic religious center requiring specialized restoration work',
        nearbyProjects: ['Historic Building Restoration', 'Landscaping', 'Walkway Installation'],
      },
      {
        name: 'University of Utah',
        type: 'commercial',
        description: 'Major university campus with ongoing construction projects',
        nearbyProjects: ['Student Housing', 'Laboratory Construction', 'Campus Infrastructure'],
      },
    ],
    testimonials: [
      {
        customerName: 'Sarah M.',
        neighborhood: 'The Avenues',
        service: 'Historic Home Renovation',
        quote:
          'Wildwest Construction perfectly preserved our 1920s home character while adding modern amenities.',
        rating: 5,
        projectValue: 85000,
        completionDate: '2024-09-15',
      },
      {
        customerName: 'David K.',
        neighborhood: 'Sugar House',
        service: 'Kitchen Remodeling',
        quote: 'Professional team that understood both our vision and the neighborhood aesthetic.',
        rating: 5,
        projectValue: 42000,
        completionDate: '2024-11-20',
      },
    ],
    localPartnerships: [
      {
        businessName: 'Salt Lake City Building Services',
        type: 'permit_office',
        description: 'Primary permit and inspection coordination',
        contactInfo: '(801) 535-6000',
      },
      {
        businessName: 'Historic Lumber & Millwork',
        type: 'supplier',
        description: 'Specialized materials for historic renovations',
      },
    ],
    emergencyResponse: {
      responseTime: '45 minutes',
      coverage24_7: true,
      specializations: ['Storm Damage', 'Foundation Issues', 'Plumbing Emergencies'],
    },
    buildingCodes: {
      permitOffice: 'Salt Lake City Building Services Department',
      commonRequirements: [
        'Seismic compliance',
        'Historic district approval',
        'Energy efficiency standards',
      ],
      inspectionProcess: 'Online scheduling with 48-hour notice required',
      averagePermitTime: '3-6 weeks',
      specialConsiderations: ['Historic preservation review', 'Neighborhood compatibility'],
    },
    serviceAreas: {
      primary: ['Downtown', 'The Avenues', 'Sugar House', 'Marmalade District'],
      secondary: ['Rose Park', 'Glendale', 'Poplar Grove'],
      emergencyOnly: ['East Bench', 'Federal Heights'],
    },
    localPhoneNumbers: {
      main: '(801) 555-0123',
      emergency: '(801) 555-0911',
      permits: '(801) 555-0124',
    },
    drivingDirections: [
      {
        fromLandmark: 'Salt Lake City International Airport',
        directions: 'Take I-80 East for 8 miles, exit at 600 South, turn right to downtown area',
        estimatedTime: '20 minutes',
        parkingInfo: 'Street parking available, some metered zones',
      },
      {
        fromLandmark: 'University of Utah',
        directions: 'Head west on 400 South for 3 miles to downtown core',
        estimatedTime: '15 minutes',
      },
    ],
  },

  'west-valley-city-ut': {
    overview:
      "West Valley City is Utah's second-largest city, featuring diverse residential communities and growing commercial districts. Our team specializes in both new construction and renovation projects throughout this dynamic suburban area.",
    demographics: {
      population: 140230,
      medianHousehold: 58000,
      medianHomeValue: 385000,
      averageHomeAge: 35,
      growthRate: '+1.8% annually',
    },
    localChallenges: [
      {
        challenge: 'Clay soil conditions require special foundation considerations',
        solution: 'We use specialized foundation techniques and proper drainage systems',
        seasonality: 'Critical during wet spring months',
      },
      {
        challenge: 'Rapid development requires efficient project coordination',
        solution: 'Streamlined permitting process and experienced local teams',
        seasonality: 'Peak season March through October',
      },
    ],
    popularServices: [
      {
        service: 'New Home Construction',
        demand: 'high',
        seasonality: 'Spring through Fall',
        averageProject: 325000,
        description: 'Custom and tract home construction in developing areas',
      },
      {
        service: 'Bathroom Remodeling',
        demand: 'high',
        seasonality: 'Year-round',
        averageProject: 18000,
        description: 'Modernizing bathrooms in established neighborhoods',
      },
      {
        service: 'Deck and Patio Construction',
        demand: 'medium',
        seasonality: 'Spring through Fall',
        averageProject: 12000,
        description: 'Outdoor living space construction',
      },
    ],
    neighborhoods: [
      {
        name: 'Hunter',
        slug: 'hunter',
        description: 'Established neighborhood with mature homes and tree-lined streets',
        landmarks: ['Hunter Park', 'West Valley Shopping Center'],
        averageHomeValue: 420000,
        popularServices: ['Home Additions', 'Kitchen Remodeling', 'HVAC Installation'],
      },
      {
        name: 'Granger',
        slug: 'granger',
        description: 'Growing community with mix of new and established homes',
        landmarks: ['Granger Medical Center', 'Valley Regional Park'],
        averageHomeValue: 375000,
        popularServices: ['Flooring Installation', 'Bathroom Remodeling', 'Garage Construction'],
      },
    ],
    landmarks: [
      {
        name: 'Utah Cultural Celebration Center',
        type: 'recreational',
        description: 'Community center hosting events and cultural activities',
        nearbyProjects: ['Event Space Renovation', 'Parking Lot Construction', 'Landscaping'],
      },
    ],
    testimonials: [
      {
        customerName: 'Maria L.',
        neighborhood: 'Hunter',
        service: 'Kitchen Remodeling',
        quote: 'The team completed our kitchen renovation on time and within budget.',
        rating: 5,
        projectValue: 28000,
        completionDate: '2024-10-05',
      },
    ],
    localPartnerships: [
      {
        businessName: 'West Valley City Building Department',
        type: 'permit_office',
        description: 'Permit processing and building inspections',
      },
    ],
    emergencyResponse: {
      responseTime: '35 minutes',
      coverage24_7: true,
      specializations: ['Water Damage', 'Foundation Settlement', 'Wind Damage'],
    },
    buildingCodes: {
      permitOffice: 'West Valley City Community Development',
      commonRequirements: ['Standard residential codes', 'Energy efficiency compliance'],
      inspectionProcess: 'Online scheduling system available',
      averagePermitTime: '2-4 weeks',
      specialConsiderations: ['Soil conditions', 'Flood zone requirements'],
    },
    serviceAreas: {
      primary: ['Hunter', 'Granger', 'Redwood', 'Chesterfield'],
      secondary: ['West Valley Center', 'Westpointe'],
      emergencyOnly: [],
    },
    localPhoneNumbers: {
      main: '(801) 555-0125',
      emergency: '(801) 555-0912',
      permits: '(801) 555-0126',
    },
    drivingDirections: [
      {
        fromLandmark: 'Salt Lake City Downtown',
        directions: 'Take I-215 West, exit at 3500 South, head west to West Valley City',
        estimatedTime: '25 minutes',
      },
    ],
  },

  'west-jordan-ut': {
    overview:
      'West Jordan combines family-friendly neighborhoods with growing commercial areas. Our construction services support both residential improvements and new commercial development in this thriving Salt Lake County community.',
    demographics: {
      population: 116961,
      medianHousehold: 72000,
      medianHomeValue: 425000,
      averageHomeAge: 28,
      growthRate: '+2.3% annually',
    },
    localChallenges: [
      {
        challenge: 'Rapidly expanding infrastructure requires coordination with utilities',
        solution:
          'Strong relationships with local utility companies for efficient project completion',
        seasonality: 'Year-round coordination needed',
      },
      {
        challenge: 'High demand creates tight scheduling',
        solution: 'Advanced project management and skilled crew scheduling',
        seasonality: 'Peak demand April through September',
      },
    ],
    popularServices: [
      {
        service: 'Home Additions',
        demand: 'high',
        seasonality: 'Spring through Fall',
        averageProject: 55000,
        description: 'Expanding homes for growing families',
      },
      {
        service: 'Finished Basements',
        demand: 'high',
        seasonality: 'Year-round',
        averageProject: 38000,
        description: 'Converting unfinished basements to living space',
      },
    ],
    neighborhoods: [
      {
        name: 'Copper Canyon',
        slug: 'copper-canyon',
        description: 'Newer development with modern homes and amenities',
        landmarks: ['Copper Canyon Elementary', 'Regional Park'],
        averageHomeValue: 485000,
        popularServices: ['Custom Home Building', 'Landscaping', 'Pool Installation'],
      },
      {
        name: 'Old Bingham Highway',
        slug: 'old-bingham-highway',
        description: 'Established area with mature neighborhoods',
        landmarks: ['Jordan River Parkway', 'West Jordan City Hall'],
        averageHomeValue: 395000,
        popularServices: ['Home Renovations', 'Roof Replacement', 'Driveway Repair'],
      },
    ],
    landmarks: [
      {
        name: 'Jordan Landing',
        type: 'commercial',
        description: 'Major shopping and entertainment complex',
        nearbyProjects: ['Retail Build-outs', 'Restaurant Construction', 'Parking Structure'],
      },
    ],
    testimonials: [
      {
        customerName: 'Jennifer R.',
        neighborhood: 'Copper Canyon',
        service: 'Home Addition',
        quote:
          'Our family room addition exceeded expectations. Professional work from start to finish.',
        rating: 5,
        projectValue: 62000,
        completionDate: '2024-08-30',
      },
    ],
    localPartnerships: [
      {
        businessName: 'West Jordan Building Department',
        type: 'permit_office',
        description: 'Building permits and inspection services',
      },
    ],
    emergencyResponse: {
      responseTime: '30 minutes',
      coverage24_7: true,
      specializations: ['Storm Damage', 'Plumbing Emergencies', 'Electrical Issues'],
    },
    buildingCodes: {
      permitOffice: 'West Jordan Community Development',
      commonRequirements: ['Standard building codes', 'HOA compliance where applicable'],
      inspectionProcess: 'Automated scheduling system',
      averagePermitTime: '2-3 weeks',
      specialConsiderations: ['HOA architectural review', 'Utility coordination'],
    },
    serviceAreas: {
      primary: ['Copper Canyon', 'Old Bingham Highway', 'Jordan Landing Area'],
      secondary: ['Welby', 'Oquirrh'],
      emergencyOnly: [],
    },
    localPhoneNumbers: {
      main: '(801) 555-0127',
      emergency: '(801) 555-0913',
      permits: '(801) 555-0128',
    },
    drivingDirections: [
      {
        fromLandmark: 'Jordan Landing',
        directions: 'Central location with easy access to all West Jordan neighborhoods',
        estimatedTime: '10-15 minutes to most areas',
      },
    ],
  },

  'sandy-ut': {
    overview:
      'Sandy sits at the base of the Wasatch Mountains, offering unique construction challenges and opportunities. From historic downtown to modern residential areas, our team handles projects ranging from mountain home construction to urban renovations.',
    demographics: {
      population: 96904,
      medianHousehold: 78000,
      medianHomeValue: 485000,
      averageHomeAge: 32,
      growthRate: '+1.9% annually',
    },
    localChallenges: [
      {
        challenge: 'Mountain proximity creates unique weather and drainage challenges',
        solution: 'Specialized drainage systems and weather-resistant construction methods',
        seasonality: 'Critical during spring snowmelt and summer storms',
      },
      {
        challenge: 'Varied elevation requires custom foundation solutions',
        solution: 'Engineered foundations adapted to specific lot conditions',
        seasonality: 'Foundation work limited during winter months',
      },
    ],
    popularServices: [
      {
        service: 'Custom Mountain Homes',
        demand: 'high',
        seasonality: 'Spring through Fall',
        averageProject: 450000,
        description: 'Luxury homes designed for mountain views and weather',
      },
      {
        service: 'Outdoor Living Spaces',
        demand: 'high',
        seasonality: 'Spring through Fall',
        averageProject: 25000,
        description: 'Decks, patios, and outdoor kitchens for mountain lifestyle',
      },
    ],
    neighborhoods: [
      {
        name: 'Alta Canyon',
        slug: 'alta-canyon',
        description: 'Upscale mountain neighborhood with custom homes',
        landmarks: ['Bell Canyon', 'Dimple Dell Regional Park'],
        averageHomeValue: 650000,
        popularServices: ['Custom Home Construction', 'Mountain Landscaping', 'Retaining Walls'],
      },
      {
        name: 'Historic Sandy',
        slug: 'historic-sandy',
        description: 'Original town center with historic buildings and character',
        landmarks: ['Sandy City Hall', 'Lone Peak Park'],
        averageHomeValue: 425000,
        popularServices: [
          'Historic Renovation',
          'Downtown Loft Conversion',
          'Commercial Renovation',
        ],
      },
    ],
    landmarks: [
      {
        name: 'Rio Tinto Stadium',
        type: 'recreational',
        description: 'Major sports venue and event center',
        nearbyProjects: ['Commercial Construction', 'Parking Facilities', 'Retail Development'],
      },
    ],
    testimonials: [
      {
        customerName: 'Michael T.',
        neighborhood: 'Alta Canyon',
        service: 'Custom Home Construction',
        quote: 'They understood our vision for a mountain home and delivered beyond expectations.',
        rating: 5,
        projectValue: 525000,
        completionDate: '2024-07-15',
      },
    ],
    localPartnerships: [
      {
        businessName: 'Sandy City Building Department',
        type: 'permit_office',
        description: 'Building permits and planning services',
      },
    ],
    emergencyResponse: {
      responseTime: '25 minutes',
      coverage24_7: true,
      specializations: ['Weather Damage', 'Foundation Issues', 'Mountain Construction Emergencies'],
    },
    buildingCodes: {
      permitOffice: 'Sandy City Community Development',
      commonRequirements: ['Seismic standards', 'Slope stability', 'Architectural compatibility'],
      inspectionProcess: 'Digital scheduling with mountain weather considerations',
      averagePermitTime: '3-5 weeks',
      specialConsiderations: [
        'Hillside construction',
        'View preservation',
        'Drainage requirements',
      ],
    },
    serviceAreas: {
      primary: ['Alta Canyon', 'Historic Sandy', 'Bell Canyon Estates'],
      secondary: ['Crescent View', 'Hidden Valley'],
      emergencyOnly: ['Upper Elevation Areas'],
    },
    localPhoneNumbers: {
      main: '(801) 555-0129',
      emergency: '(801) 555-0914',
      permits: '(801) 555-0130',
    },
    drivingDirections: [
      {
        fromLandmark: 'I-15 and 10600 South',
        directions: 'Take 10600 South east into Sandy, continue to specific neighborhoods',
        estimatedTime: '15-25 minutes depending on destination',
      },
    ],
  },

  'draper-ut': {
    overview:
      "Draper represents some of Utah's most exclusive residential communities, nestled in the foothills with stunning mountain and valley views. Our premium construction services cater to discerning homeowners seeking luxury and quality.",
    demographics: {
      population: 51017,
      medianHousehold: 95000,
      medianHomeValue: 625000,
      averageHomeAge: 25,
      growthRate: '+2.0% annually',
    },
    localChallenges: [
      {
        challenge: 'Hillside construction requires specialized engineering and equipment',
        solution: 'Certified hillside construction specialists and advanced equipment',
        seasonality: 'Weather-dependent, limited winter access',
      },
      {
        challenge: 'High-end finishes demand exceptional craftsmanship standards',
        solution: 'Master craftsmen and premium material suppliers',
        seasonality: 'Year-round with indoor finish work',
      },
    ],
    popularServices: [
      {
        service: 'Luxury Custom Homes',
        demand: 'high',
        seasonality: 'Spring through Fall',
        averageProject: 750000,
        description: 'High-end custom homes with premium finishes',
      },
      {
        service: 'Hillside Landscaping',
        demand: 'high',
        seasonality: 'Spring through Fall',
        averageProject: 45000,
        description: 'Terraced landscaping and retaining wall systems',
      },
    ],
    neighborhoods: [
      {
        name: 'SunCrest',
        slug: 'suncrest',
        description: 'Premier hillside community with panoramic views',
        landmarks: ['Corner Canyon Regional Park', 'SunCrest Golf Course'],
        averageHomeValue: 850000,
        popularServices: [
          'Luxury Home Construction',
          'View Deck Installation',
          'Hillside Stabilization',
        ],
      },
      {
        name: 'South Mountain',
        slug: 'south-mountain',
        description: 'Established upscale neighborhood with mature landscaping',
        landmarks: ['South Mountain Golf Club', 'Draper City Park'],
        averageHomeValue: 575000,
        popularServices: ['Home Additions', 'Pool Construction', 'Outdoor Kitchens'],
      },
    ],
    landmarks: [
      {
        name: 'Loveland Living Planet Aquarium',
        type: 'recreational',
        description: 'Major tourist attraction and educational facility',
        nearbyProjects: ['Educational Facility Construction', 'Visitor Center Expansion'],
      },
    ],
    testimonials: [
      {
        customerName: 'Robert and Catherine H.',
        neighborhood: 'SunCrest',
        service: 'Luxury Custom Home',
        quote: 'Exceptional quality and attention to detail. Our dream home became reality.',
        rating: 5,
        projectValue: 825000,
        completionDate: '2024-09-01',
      },
    ],
    localPartnerships: [
      {
        businessName: 'Draper City Planning Department',
        type: 'permit_office',
        description: 'Building permits and architectural review',
      },
      {
        businessName: 'Alpine Luxury Materials',
        type: 'supplier',
        description: 'Premium building materials and custom millwork',
      },
    ],
    emergencyResponse: {
      responseTime: '30 minutes',
      coverage24_7: true,
      specializations: ['Hillside Stabilization', 'Luxury Property Protection', 'Weather Damage'],
    },
    buildingCodes: {
      permitOffice: 'Draper City Community Development',
      commonRequirements: [
        'Architectural review board approval',
        'Hillside development standards',
        'Premium construction standards',
      ],
      inspectionProcess: 'Detailed inspection process with architectural compliance',
      averagePermitTime: '4-6 weeks',
      specialConsiderations: ['View preservation', 'Hillside engineering', 'HOA compliance'],
    },
    serviceAreas: {
      primary: ['SunCrest', 'South Mountain', 'Corner Canyon'],
      secondary: ['Draper Historic District'],
      emergencyOnly: ['Steep Terrain Areas'],
    },
    localPhoneNumbers: {
      main: '(801) 555-0131',
      emergency: '(801) 555-0915',
      permits: '(801) 555-0132',
    },
    drivingDirections: [
      {
        fromLandmark: 'I-15 at Bangerter Highway',
        directions: 'Take Bangerter south to 12300 South, turn east toward foothills',
        estimatedTime: '20 minutes',
        parkingInfo: 'Private driveways, limited street parking in developments',
      },
    ],
  },

  // Add more cities following the same pattern...
  'murray-ut': {
    overview:
      'Murray is centrally located in Salt Lake County, offering a perfect blend of established neighborhoods and modern developments. Our construction services range from historic home renovations to contemporary commercial projects.',
    demographics: {
      population: 49205,
      medianHousehold: 64000,
      medianHomeValue: 415000,
      averageHomeAge: 42,
      growthRate: '+1.2% annually',
    },
    localChallenges: [
      {
        challenge: 'Mixed residential and commercial areas require versatile expertise',
        solution: 'Comprehensive construction services for all property types',
        seasonality: 'Year-round commercial projects, seasonal residential work',
      },
      {
        challenge: 'Aging infrastructure in established areas needs careful coordination',
        solution: 'Utility coordination and infrastructure-aware construction methods',
        seasonality: 'Infrastructure work typically spring through fall',
      },
    ],
    popularServices: [
      {
        service: 'Home Modernization',
        demand: 'high',
        seasonality: 'Year-round',
        averageProject: 45000,
        description: 'Updating established homes with modern amenities',
      },
      {
        service: 'Commercial Renovation',
        demand: 'medium',
        seasonality: 'Year-round',
        averageProject: 125000,
        description: 'Modernizing commercial spaces for new businesses',
      },
    ],
    neighborhoods: [
      {
        name: 'Murray Central',
        slug: 'murray-central',
        description: 'Historic downtown area with mix of residential and commercial properties',
        landmarks: ['Murray City Hall', 'Murray Park'],
        averageHomeValue: 425000,
        popularServices: ['Historic Renovation', 'Commercial Build-out', 'Mixed-use Development'],
      },
      {
        name: 'Woodrow',
        slug: 'woodrow',
        description: 'Established residential neighborhood with tree-lined streets',
        landmarks: ['Woodrow Elementary', 'Wheeler Historic Farm'],
        averageHomeValue: 395000,
        popularServices: ['Kitchen Remodeling', 'Bathroom Updates', 'Home Additions'],
      },
    ],
    landmarks: [
      {
        name: 'Fashion Place Mall',
        type: 'commercial',
        description: 'Major shopping center with ongoing retail developments',
        nearbyProjects: [
          'Retail Renovations',
          'Restaurant Build-outs',
          'Parking Structure Maintenance',
        ],
      },
    ],
    testimonials: [
      {
        customerName: 'Lisa and Tom W.',
        neighborhood: 'Woodrow',
        service: 'Kitchen Remodeling',
        quote: 'Professional team that transformed our outdated kitchen into our dream space.',
        rating: 5,
        projectValue: 38000,
        completionDate: '2024-10-12',
      },
    ],
    localPartnerships: [
      {
        businessName: 'Murray City Building Department',
        type: 'permit_office',
        description: 'Permits and inspections for residential and commercial projects',
      },
    ],
    emergencyResponse: {
      responseTime: '25 minutes',
      coverage24_7: true,
      specializations: ['Commercial Emergencies', 'Residential Repairs', 'Infrastructure Issues'],
    },
    buildingCodes: {
      permitOffice: 'Murray City Community and Economic Development',
      commonRequirements: [
        'Standard building codes',
        'Historic district compliance',
        'Commercial zoning requirements',
      ],
      inspectionProcess: 'Efficient online scheduling system',
      averagePermitTime: '2-4 weeks',
      specialConsiderations: ['Historic preservation', 'Commercial-residential interface'],
    },
    serviceAreas: {
      primary: ['Murray Central', 'Woodrow', 'Fashion Place'],
      secondary: ['Vine Street', 'Murray East'],
      emergencyOnly: [],
    },
    localPhoneNumbers: {
      main: '(801) 555-0133',
      emergency: '(801) 555-0916',
      permits: '(801) 555-0134',
    },
    drivingDirections: [
      {
        fromLandmark: 'Fashion Place Mall',
        directions: 'Central Murray location with easy access to all neighborhoods',
        estimatedTime: '10-15 minutes to anywhere in Murray',
      },
    ],
  },
};

export const POPULAR_CITIES_ORDER = [
  'salt-lake-city-ut',
  'west-valley-city-ut',
  'west-jordan-ut',
  'sandy-ut',
  'draper-ut',
  'murray-ut',
  'south-jordan-ut',
  'taylorsville-ut',
  'millcreek-ut',
  'cottonwood-heights-ut',
];

/**
 * Get comprehensive content for a specific city
 */
export function getCityContent(citySlug: string): CityContent | null {
  return CITY_CONTENT[citySlug] || null;
}

/**
 * Get all neighborhoods for a specific city
 */
export function getCityNeighborhoods(citySlug: string): CityNeighborhood[] {
  const content = getCityContent(citySlug);
  return content?.neighborhoods || [];
}

/**
 * Get local testimonials for a city
 */
export function getCityTestimonials(citySlug: string): CityTestimonial[] {
  const content = getCityContent(citySlug);
  return content?.testimonials || [];
}

/**
 * Get emergency response information for a city
 */
export function getEmergencyResponseInfo(citySlug: string) {
  const content = getCityContent(citySlug);
  return content?.emergencyResponse;
}

/**
 * Get building code information for a city
 */
export function getBuildingCodeInfo(citySlug: string) {
  const content = getCityContent(citySlug);
  return content?.buildingCodes;
}

/**
 * Get popular services for a city based on demand
 */
export function getPopularCityServices(citySlug: string, limit?: number) {
  const content = getCityContent(citySlug);
  if (!content) return [];

  return content.popularServices
    .sort((a, b) => {
      const demandOrder = { high: 3, medium: 2, low: 1 };
      return demandOrder[b.demand] - demandOrder[a.demand];
    })
    .slice(0, limit);
}

/**
 * Get local SEO keywords for a city
 */
export function getCityKeywords(citySlug: string): string[] {
  const content = getCityContent(citySlug);
  if (!content) return [];

  const keywords: string[] = [];

  // Add neighborhood keywords
  content.neighborhoods.forEach((neighborhood) => {
    keywords.push(`${neighborhood.name} construction`);
    keywords.push(`${neighborhood.name} contractor`);
    neighborhood.popularServices.forEach((service) => {
      keywords.push(`${neighborhood.name} ${service.toLowerCase()}`);
    });
  });

  // Add service keywords
  content.popularServices.forEach((service) => {
    keywords.push(`${service.service} ${citySlug.replace('-ut', '')}`);
  });

  return [...new Set(keywords)]; // Remove duplicates
}
