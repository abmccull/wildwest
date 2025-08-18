import { NextRequest, NextResponse } from 'next/server';
import {
  getServiceCategories,
  getServiceCatalogByCategory,
  getAllCities,
  getServiceDataStats,
  validateDataIntegrity,
} from '@/lib/data-parser';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    switch (type) {
      case 'categories':
        return NextResponse.json(getServiceCategories());

      case 'services-by-category':
        const category = searchParams.get('category');
        if (!category) {
          return NextResponse.json({ error: 'Category parameter required' }, { status: 400 });
        }
        return NextResponse.json(getServiceCatalogByCategory(category));

      case 'cities':
        return NextResponse.json(getAllCities());

      case 'stats':
        return NextResponse.json(getServiceDataStats());

      case 'validate':
        return NextResponse.json(validateDataIntegrity());

      case 'home-data':
        // Combined data for homepage
        const categories = getServiceCategories();
        const flooringServices = getServiceCatalogByCategory('Flooring').slice(0, 3);
        const demolitionServices = getServiceCatalogByCategory('Demolition').slice(0, 3);
        const junkServices = getServiceCatalogByCategory('Junk Removal').slice(0, 3);
        const cities = getAllCities();

        return NextResponse.json({
          categories,
          flooringServices,
          demolitionServices,
          junkServices,
          cities,
        });

      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('Data API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
