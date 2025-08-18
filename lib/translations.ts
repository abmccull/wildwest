/**
 * Translation system for Spanish language support
 * Provides comprehensive translations for key pages and components
 */

export interface TranslationStrings {
  // Navigation
  nav: {
    home: string;
    services: string;
    flooring: string;
    demolition: string;
    junkRemoval: string;
    about: string;
    contact: string;
    getQuote: string;
    callNow: string;
  };
  
  // Common
  common: {
    phone: string;
    email: string;
    address: string;
    hours: string;
    freeEstimate: string;
    getStarted: string;
    learnMore: string;
    viewMore: string;
    readMore: string;
    contactUs: string;
    testimonials: string;
    services: string;
    locations: string;
    emergency: string;
    licensed: string;
    insured: string;
    years: string;
    experience: string;
    projects: string;
    completed: string;
    customers: string;
    satisfied: string;
  };

  // City Pages
  cityPage: {
    heroTitle: string;
    heroDescription: string;
    whyChooseUs: string;
    localExpertise: string;
    localExpertiseDesc: string;
    fastResponse: string;
    fastResponseDesc: string;
    qualityCraftsmanship: string;
    qualityCraftsmanshipDesc: string;
    licensedInsured: string;
    licensedInsuredDesc: string;
    ourServices: string;
    recentProjects: string;
    getFreeQuote: string;
    readyToTransform: string;
    joinSatisfiedCustomers: string;
    neighborhoods: string;
    serviceAreas: string;
    emergencyServices: string;
    buildingCodes: string;
    localPartnerships: string;
  };

  // Services
  services: {
    flooring: {
      title: string;
      description: string;
      hardwoodInstallation: string;
      laminateInstallation: string;
      vinylPlankInstallation: string;
      tileInstallation: string;
      carpetInstallation: string;
      floorRefinishing: string;
      subfloorRepair: string;
    };
    demolition: {
      title: string;
      description: string;
      interiorDemolition: string;
      kitchenDemolition: string;
      bathroomDemolition: string;
      concreteRemoval: string;
      structuralDemolition: string;
      safeDemolition: string;
    };
    junkRemoval: {
      title: string;
      description: string;
      constructionDebris: string;
      furnitureRemoval: string;
      applianceRemoval: string;
      basementCleanout: string;
      yardWaste: string;
      commercialCleanup: string;
    };
  };

  // Forms
  forms: {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    service: string;
    selectService: string;
    projectType: string;
    budget: string;
    timeline: string;
    description: string;
    additionalInfo: string;
    submit: string;
    submitQuote: string;
    required: string;
    sending: string;
    success: string;
    error: string;
    tryAgain: string;
    bestTimeToCall: string;
    morning: string;
    afternoon: string;
    evening: string;
    weekend: string;
  };

  // Testimonials
  testimonials: {
    title: string;
    subtitle: string;
    readFullReview: string;
    verified: string;
    reviewer: string;
    project: string;
    location: string;
    completedOn: string;
    rating: string;
    outOf: string;
    stars: string;
  };

  // Footer
  footer: {
    tagline: string;
    quickLinks: string;
    serviceAreas: string;
    contactInfo: string;
    followUs: string;
    businessHours: string;
    mondayFriday: string;
    saturday: string;
    sunday: string;
    closed: string;
    emergencyAvailable: string;
    allRightsReserved: string;
    privacy: string;
    terms: string;
    sitemap: string;
  };

  // SEO Meta
  seo: {
    homeTitle: string;
    homeDescription: string;
    cityTitle: string;
    cityDescription: string;
    serviceTitle: string;
    serviceDescription: string;
    keywords: string;
  };

  // Call to Action
  cta: {
    readyToStart: string;
    getYourQuote: string;
    callToday: string;
    emailUs: string;
    schedule: string;
    consultation: string;
    freeInspection: string;
    noObligation: string;
  };

  // About
  about: {
    ourStory: string;
    founded: string;
    mission: string;
    vision: string;
    values: string;
    team: string;
    certifications: string;
    awards: string;
    community: string;
  };
}

const ENGLISH_TRANSLATIONS: TranslationStrings = {
  nav: {
    home: 'Home',
    services: 'Services',
    flooring: 'Flooring',
    demolition: 'Demolition',
    junkRemoval: 'Junk Removal',
    about: 'About',
    contact: 'Contact',
    getQuote: 'Get Quote',
    callNow: 'Call Now'
  },
  common: {
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    hours: 'Hours',
    freeEstimate: 'Free Estimate',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    viewMore: 'View More',
    readMore: 'Read More',
    contactUs: 'Contact Us',
    testimonials: 'Testimonials',
    services: 'Services',
    locations: 'Locations',
    emergency: 'Emergency',
    licensed: 'Licensed',
    insured: 'Insured',
    years: 'Years',
    experience: 'Experience',
    projects: 'Projects',
    completed: 'Completed',
    customers: 'Customers',
    satisfied: 'Satisfied'
  },
  cityPage: {
    heroTitle: 'Professional Construction Services in {city}',
    heroDescription: 'Wild West Construction is your trusted partner for quality flooring, demolition, and junk removal services in {city}, Utah. With years of experience serving {county}, we deliver exceptional craftsmanship and reliable service you can count on.',
    whyChooseUs: 'Why Choose Wild West Construction in {city}?',
    localExpertise: 'Local Expertise',
    localExpertiseDesc: 'We understand the unique construction needs of {city} residents. From the local building codes to the climate considerations, our team has the knowledge and experience to handle any project in {county}.',
    fastResponse: 'Fast Response Times',
    fastResponseDesc: 'Located nearby, we can quickly respond to your construction needs in {city}. Our local presence means faster project starts, better communication, and more personalized service for every customer.',
    qualityCraftsmanship: 'Quality Craftsmanship',
    qualityCraftsmanshipDesc: 'Every project in {city} is completed with attention to detail and quality materials. We take pride in our work and stand behind every installation, demolition, and cleanup service we provide.',
    licensedInsured: 'Licensed & Insured',
    licensedInsuredDesc: 'Wild West Construction is fully licensed and insured to work in {city} and throughout Utah. You can trust that your property and investment are protected when you choose our services.',
    ourServices: 'Our Construction Services in {city}',
    recentProjects: 'Recent Projects in {city}',
    getFreeQuote: 'Get Your Free Quote Today',
    readyToTransform: 'Ready to Transform Your Space in {city}?',
    joinSatisfiedCustomers: 'Join hundreds of satisfied customers who have trusted Wild West Construction with their projects. Contact us today to get started!',
    neighborhoods: 'Neighborhoods We Serve',
    serviceAreas: 'Service Areas',
    emergencyServices: 'Emergency Services',
    buildingCodes: 'Building Codes & Permits',
    localPartnerships: 'Local Partnerships'
  },
  services: {
    flooring: {
      title: 'Flooring Services',
      description: 'Professional flooring installation and refinishing services',
      hardwoodInstallation: 'Hardwood Installation',
      laminateInstallation: 'Laminate Installation',
      vinylPlankInstallation: 'Vinyl Plank Installation',
      tileInstallation: 'Tile Installation',
      carpetInstallation: 'Carpet Installation',
      floorRefinishing: 'Floor Refinishing',
      subfloorRepair: 'Subfloor Repair'
    },
    demolition: {
      title: 'Demolition Services',
      description: 'Safe and efficient demolition services for your renovation projects',
      interiorDemolition: 'Interior Demolition',
      kitchenDemolition: 'Kitchen Demolition',
      bathroomDemolition: 'Bathroom Demolition',
      concreteRemoval: 'Concrete Removal',
      structuralDemolition: 'Structural Demolition',
      safeDemolition: 'Safe Demolition'
    },
    junkRemoval: {
      title: 'Junk Removal Services',
      description: 'Fast and reliable junk removal and cleanup services',
      constructionDebris: 'Construction Debris',
      furnitureRemoval: 'Furniture Removal',
      applianceRemoval: 'Appliance Removal',
      basementCleanout: 'Basement Cleanout',
      yardWaste: 'Yard Waste',
      commercialCleanup: 'Commercial Cleanup'
    }
  },
  forms: {
    name: 'Name',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    zipCode: 'Zip Code',
    service: 'Service',
    selectService: 'Select a Service',
    projectType: 'Project Type',
    budget: 'Budget',
    timeline: 'Timeline',
    description: 'Description',
    additionalInfo: 'Additional Information',
    submit: 'Submit',
    submitQuote: 'Submit Quote Request',
    required: 'Required',
    sending: 'Sending...',
    success: 'Thank you! We\'ll contact you soon.',
    error: 'Sorry, there was an error. Please try again.',
    tryAgain: 'Try Again',
    bestTimeToCall: 'Best Time to Call',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    weekend: 'Weekend'
  },
  testimonials: {
    title: 'Customer Testimonials',
    subtitle: 'What Our Customers Say',
    readFullReview: 'Read Full Review',
    verified: 'Verified Customer',
    reviewer: 'Reviewer',
    project: 'Project',
    location: 'Location',
    completedOn: 'Completed on',
    rating: 'Rating',
    outOf: 'out of',
    stars: 'stars'
  },
  footer: {
    tagline: 'Building Utah\'s Future, One Project at a Time',
    quickLinks: 'Quick Links',
    serviceAreas: 'Service Areas',
    contactInfo: 'Contact Information',
    followUs: 'Follow Us',
    businessHours: 'Business Hours',
    mondayFriday: 'Monday - Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    closed: 'Closed',
    emergencyAvailable: '24/7 Emergency Services Available',
    allRightsReserved: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    sitemap: 'Sitemap'
  },
  seo: {
    homeTitle: 'Wild West Construction - Professional Building Services',
    homeDescription: 'Wild West Construction provides professional construction services including flooring, demolition, and junk removal. Quality craftsmanship you can trust.',
    cityTitle: '{city} Construction Services | Wild West Construction',
    cityDescription: 'Professional construction services in {city}, Utah. Wild West Construction provides flooring, demolition, and junk removal services throughout Salt Lake County. Get your free quote today!',
    serviceTitle: '{service} Services in {city} | Wild West Construction',
    serviceDescription: 'Professional {service} services in {city}, Utah. Expert craftsmanship, licensed and insured. Contact Wild West Construction for your free estimate today.',
    keywords: 'construction, contractor, flooring, demolition, junk removal, Utah, {city}'
  },
  cta: {
    readyToStart: 'Ready to Start Your Project?',
    getYourQuote: 'Get Your Free Quote',
    callToday: 'Call Today',
    emailUs: 'Email Us',
    schedule: 'Schedule',
    consultation: 'Consultation',
    freeInspection: 'Free Inspection',
    noObligation: 'No Obligation'
  },
  about: {
    ourStory: 'Our Story',
    founded: 'Founded',
    mission: 'Mission',
    vision: 'Vision',
    values: 'Values',
    team: 'Our Team',
    certifications: 'Certifications',
    awards: 'Awards',
    community: 'Community Involvement'
  }
};

const SPANISH_TRANSLATIONS: TranslationStrings = {
  nav: {
    home: 'Inicio',
    services: 'Servicios',
    flooring: 'Pisos',
    demolition: 'Demolición',
    junkRemoval: 'Remoción de Basura',
    about: 'Acerca de',
    contact: 'Contacto',
    getQuote: 'Cotización',
    callNow: 'Llamar Ahora'
  },
  common: {
    phone: 'Teléfono',
    email: 'Correo',
    address: 'Dirección',
    hours: 'Horarios',
    freeEstimate: 'Estimación Gratuita',
    getStarted: 'Comenzar',
    learnMore: 'Saber Más',
    viewMore: 'Ver Más',
    readMore: 'Leer Más',
    contactUs: 'Contáctanos',
    testimonials: 'Testimonios',
    services: 'Servicios',
    locations: 'Ubicaciones',
    emergency: 'Emergencia',
    licensed: 'Licenciado',
    insured: 'Asegurado',
    years: 'Años',
    experience: 'Experiencia',
    projects: 'Proyectos',
    completed: 'Completados',
    customers: 'Clientes',
    satisfied: 'Satisfechos'
  },
  cityPage: {
    heroTitle: 'Servicios de Construcción Profesional en {city}',
    heroDescription: 'Wild West Construction es su socio confiable para servicios de calidad en pisos, demolición y remoción de basura en {city}, Utah. Con años de experiencia sirviendo en {county}, entregamos artesanía excepcional y servicio confiable en el que puede confiar.',
    whyChooseUs: '¿Por Qué Elegir Wild West Construction en {city}?',
    localExpertise: 'Experiencia Local',
    localExpertiseDesc: 'Entendemos las necesidades únicas de construcción de los residentes de {city}. Desde los códigos de construcción locales hasta las consideraciones climáticas, nuestro equipo tiene el conocimiento y experiencia para manejar cualquier proyecto en {county}.',
    fastResponse: 'Tiempos de Respuesta Rápidos',
    fastResponseDesc: 'Ubicados cerca, podemos responder rápidamente a sus necesidades de construcción en {city}. Nuestra presencia local significa inicios de proyectos más rápidos, mejor comunicación y servicio más personalizado para cada cliente.',
    qualityCraftsmanship: 'Artesanía de Calidad',
    qualityCraftsmanshipDesc: 'Cada proyecto en {city} se completa con atención al detalle y materiales de calidad. Nos enorgullecemos de nuestro trabajo y respaldamos cada instalación, demolición y servicio de limpieza que proporcionamos.',
    licensedInsured: 'Licenciado y Asegurado',
    licensedInsuredDesc: 'Wild West Construction está completamente licenciado y asegurado para trabajar en {city} y en todo Utah. Puede confiar en que su propiedad e inversión están protegidas cuando elige nuestros servicios.',
    ourServices: 'Nuestros Servicios de Construcción en {city}',
    recentProjects: 'Proyectos Recientes en {city}',
    getFreeQuote: 'Obtenga Su Cotización Gratuita Hoy',
    readyToTransform: '¿Listo Para Transformar Su Espacio en {city}?',
    joinSatisfiedCustomers: 'Únase a cientos de clientes satisfechos que han confiado en Wild West Construction con sus proyectos. ¡Contáctenos hoy para comenzar!',
    neighborhoods: 'Vecindarios Que Servimos',
    serviceAreas: 'Áreas de Servicio',
    emergencyServices: 'Servicios de Emergencia',
    buildingCodes: 'Códigos de Construcción y Permisos',
    localPartnerships: 'Asociaciones Locales'
  },
  services: {
    flooring: {
      title: 'Servicios de Pisos',
      description: 'Servicios profesionales de instalación y refinamiento de pisos',
      hardwoodInstallation: 'Instalación de Madera',
      laminateInstallation: 'Instalación de Laminado',
      vinylPlankInstallation: 'Instalación de Vinil',
      tileInstallation: 'Instalación de Azulejo',
      carpetInstallation: 'Instalación de Alfombra',
      floorRefinishing: 'Refinamiento de Pisos',
      subfloorRepair: 'Reparación de Subpiso'
    },
    demolition: {
      title: 'Servicios de Demolición',
      description: 'Servicios de demolición seguros y eficientes para sus proyectos de renovación',
      interiorDemolition: 'Demolición Interior',
      kitchenDemolition: 'Demolición de Cocina',
      bathroomDemolition: 'Demolición de Baño',
      concreteRemoval: 'Remoción de Concreto',
      structuralDemolition: 'Demolición Estructural',
      safeDemolition: 'Demolición Segura'
    },
    junkRemoval: {
      title: 'Servicios de Remoción de Basura',
      description: 'Servicios rápidos y confiables de remoción de basura y limpieza',
      constructionDebris: 'Escombros de Construcción',
      furnitureRemoval: 'Remoción de Muebles',
      applianceRemoval: 'Remoción de Electrodomésticos',
      basementCleanout: 'Limpieza de Sótano',
      yardWaste: 'Desechos de Jardín',
      commercialCleanup: 'Limpieza Comercial'
    }
  },
  forms: {
    name: 'Nombre',
    firstName: 'Primer Nombre',
    lastName: 'Apellido',
    email: 'Correo Electrónico',
    phone: 'Teléfono',
    address: 'Dirección',
    city: 'Ciudad',
    zipCode: 'Código Postal',
    service: 'Servicio',
    selectService: 'Seleccione un Servicio',
    projectType: 'Tipo de Proyecto',
    budget: 'Presupuesto',
    timeline: 'Cronología',
    description: 'Descripción',
    additionalInfo: 'Información Adicional',
    submit: 'Enviar',
    submitQuote: 'Enviar Solicitud de Cotización',
    required: 'Requerido',
    sending: 'Enviando...',
    success: '¡Gracias! Nos pondremos en contacto pronto.',
    error: 'Lo sentimos, hubo un error. Por favor intente de nuevo.',
    tryAgain: 'Intentar de Nuevo',
    bestTimeToCall: 'Mejor Hora para Llamar',
    morning: 'Mañana',
    afternoon: 'Tarde',
    evening: 'Noche',
    weekend: 'Fin de Semana'
  },
  testimonials: {
    title: 'Testimonios de Clientes',
    subtitle: 'Lo Que Dicen Nuestros Clientes',
    readFullReview: 'Leer Reseña Completa',
    verified: 'Cliente Verificado',
    reviewer: 'Revisor',
    project: 'Proyecto',
    location: 'Ubicación',
    completedOn: 'Completado el',
    rating: 'Calificación',
    outOf: 'de',
    stars: 'estrellas'
  },
  footer: {
    tagline: 'Construyendo el Futuro de Utah, Un Proyecto a la Vez',
    quickLinks: 'Enlaces Rápidos',
    serviceAreas: 'Áreas de Servicio',
    contactInfo: 'Información de Contacto',
    followUs: 'Síguenos',
    businessHours: 'Horarios Comerciales',
    mondayFriday: 'Lunes - Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo',
    closed: 'Cerrado',
    emergencyAvailable: 'Servicios de Emergencia 24/7 Disponibles',
    allRightsReserved: 'Todos los derechos reservados.',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    sitemap: 'Mapa del Sitio'
  },
  seo: {
    homeTitle: 'Wild West Construction - Servicios Profesionales de Construcción',
    homeDescription: 'Wild West Construction proporciona servicios profesionales de construcción incluyendo pisos, demolición y remoción de basura. Artesanía de calidad en la que puede confiar.',
    cityTitle: 'Servicios de Construcción en {city} | Wild West Construction',
    cityDescription: 'Servicios profesionales de construcción en {city}, Utah. Wild West Construction proporciona servicios de pisos, demolición y remoción de basura en todo el Condado de Salt Lake. ¡Obtenga su cotización gratuita hoy!',
    serviceTitle: 'Servicios de {service} en {city} | Wild West Construction',
    serviceDescription: 'Servicios profesionales de {service} en {city}, Utah. Artesanía experta, licenciado y asegurado. Contacte a Wild West Construction para su estimación gratuita hoy.',
    keywords: 'construcción, contratista, pisos, demolición, remoción de basura, Utah, {city}'
  },
  cta: {
    readyToStart: '¿Listo Para Comenzar Su Proyecto?',
    getYourQuote: 'Obtenga Su Cotización Gratuita',
    callToday: 'Llame Hoy',
    emailUs: 'Envíenos un Correo',
    schedule: 'Programar',
    consultation: 'Consulta',
    freeInspection: 'Inspección Gratuita',
    noObligation: 'Sin Obligación'
  },
  about: {
    ourStory: 'Nuestra Historia',
    founded: 'Fundado',
    mission: 'Misión',
    vision: 'Visión',
    values: 'Valores',
    team: 'Nuestro Equipo',
    certifications: 'Certificaciones',
    awards: 'Premios',
    community: 'Participación Comunitaria'
  }
};

export const TRANSLATIONS = {
  en: ENGLISH_TRANSLATIONS,
  es: SPANISH_TRANSLATIONS
};

/**
 * Get translations for a specific language
 */
export function getTranslations(language: string = 'en'): TranslationStrings {
  return TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;
}

/**
 * Translate a string with variable interpolation
 */
export function translate(
  key: string, 
  language: string = 'en', 
  variables: Record<string, string> = {}
): string {
  const translations = getTranslations(language);
  const keys = key.split('.');
  
  let value: any = translations;
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (typeof value !== 'string') {
    console.warn(`Translation key '${key}' not found for language '${language}'`);
    return key;
  }
  
  // Replace variables in the format {variableName}
  return value.replace(/\{(\w+)\}/g, (match, varName) => {
    return variables[varName] || match;
  });
}

/**
 * Get hreflang alternatives for a page
 */
export function getHreflangAlternatives(basePath: string): Array<{
  hreflang: string;
  href: string;
}> {
  const supportedLanguages = Object.keys(TRANSLATIONS);
  
  return supportedLanguages.map(lang => ({
    hreflang: lang,
    href: lang === 'en' ? basePath : `/${lang}${basePath}`
  }));
}

export default TRANSLATIONS;