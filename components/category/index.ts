// Category Page Components
export { default as CategoryHero } from './CategoryHero';
export { default as ServiceHighlights } from './ServiceHighlights';
export { default as CitiesList } from './CitiesList';
export { default as CallToAction } from './CallToAction';

// Re-export types for convenience
export type {
  CategoryData,
  ServiceHighlight,
  CategoryPageData,
  CallToActionData,
  CategoryHeroProps,
  ServiceHighlightsProps,
  CitiesListProps,
  CallToActionProps,
} from '../../lib/types/category.types';
