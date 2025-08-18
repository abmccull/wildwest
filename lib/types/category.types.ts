/**
 * Category page types and interfaces
 */

export interface CategoryData {
  name: string;
  slug: string;
  title: string;
  description: string;
  heroImage?: string;
}

export interface ServiceHighlight {
  name: string;
  description: string;
  benefits: string[];
  icon?: string;
}

export interface CategoryPageData {
  category: CategoryData;
  services: ServiceHighlight[];
  cities: string[];
  seoData: {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl: string;
    jsonLd: any;
  };
}

export interface CallToActionData {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
    ariaLabel: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
    ariaLabel: string;
  };
}

export interface CategoryHeroProps {
  category: CategoryData;
  backgroundImage?: string;
}

export interface ServiceHighlightsProps {
  services: ServiceHighlight[];
  categoryName: string;
}

export interface CitiesListProps {
  cities: string[];
  categorySlug: string;
  maxDisplay?: number;
  showAll?: boolean;
}

export interface CallToActionProps {
  data: CallToActionData;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}
