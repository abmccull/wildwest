import { NextRequest, NextResponse } from 'next/server';
import { createServerServiceClient } from '@/lib/supabase-server';
import { withApiMiddleware, successResponse, DatabaseError } from '@/lib/api-middleware';

export const GET = withApiMiddleware(
  async (req: NextRequest) => {
    const supabase = createServerServiceClient();

    try {
      // Get query parameters
      const { searchParams } = new URL(req.url);
      const limit = parseInt(searchParams.get('limit') || '50');
      const offset = parseInt(searchParams.get('offset') || '0');
      const search = searchParams.get('search');

      // Build query
      let query = supabase.from('services').select('*').order('name', { ascending: true });

      // Add search filter if provided
      if (search) {
        query = query.or(`name.ilike.%${search}%,slug.ilike.%${search}%`);
      }

      // Add pagination
      query = query.range(offset, offset + limit - 1);

      // Execute query
      const { data: services, error, count } = await query;

      if (error) {
        console.error('Database error fetching services:', error);
        throw new DatabaseError('Failed to fetch services');
      }

      // Get total count for pagination (if needed)
      let totalCount = count;
      if (totalCount === null) {
        const { count: totalCountResult, error: countError } = await supabase
          .from('services')
          .select('*', { count: 'exact', head: true });

        if (!countError) {
          totalCount = totalCountResult;
        }
      }

      const responseData = {
        services: services || [],
        pagination: {
          limit,
          offset,
          total: totalCount || 0,
          hasMore: services ? services.length === limit : false,
        },
        search: search || null,
      };

      return NextResponse.json(successResponse(responseData), { status: 200 });
    } catch (error: any) {
      console.error('Services fetch error:', error);
      throw error;
    }
  },
  { methods: ['GET'], skipRateLimit: true }
);

// Handle preflight requests
export const OPTIONS = withApiMiddleware(
  async (req: NextRequest) => {
    return NextResponse.json(successResponse({ message: 'OK' }), { status: 200 });
  },
  { methods: ['OPTIONS'], skipRateLimit: true }
);
