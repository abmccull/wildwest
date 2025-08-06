import { NextRequest, NextResponse } from "next/server";

// Use Node.js runtime for better compatibility
// export const runtime = 'edge'; // Removed due to TypeScript compatibility issues
export const dynamic = 'force-dynamic';

interface EdgeHealthCheckResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  edge: {
    region: string | null;
    runtime: string;
    responseTime: number;
  };
  services: {
    api: {
      status: "operational";
      responseTime: number;
    };
    cdn: {
      status: "operational";
    };
  };
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Get region information (geo only available with edge runtime)
    const region = null; // request.geo?.region || null;
    
    const healthCheck: EdgeHealthCheckResponse = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      edge: {
        region,
        runtime: "edge",
        responseTime: 0,
      },
      services: {
        api: {
          status: "operational",
          responseTime: 0,
        },
        cdn: {
          status: "operational",
        },
      },
    };

    // Calculate response times
    const responseTime = Date.now() - startTime;
    healthCheck.edge.responseTime = responseTime;
    healthCheck.services.api.responseTime = responseTime;

    // Set appropriate status based on performance
    if (responseTime > 1000) {
      healthCheck.status = "degraded";
    }

    const response = NextResponse.json(healthCheck, { 
      status: healthCheck.status === "healthy" ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'CDN-Cache-Control': 'no-cache',
        'Vercel-CDN-Cache-Control': 'no-cache',
      }
    });

    return response;
  } catch (error) {
    console.error("Edge health check error:", error);

    const errorResponse: EdgeHealthCheckResponse = {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      edge: {
        region: null, // request.geo?.region || null,
        runtime: "edge",
        responseTime: Date.now() - startTime,
      },
      services: {
        api: {
          status: "operational",
          responseTime: Date.now() - startTime,
        },
        cdn: {
          status: "operational",
        },
      },
    };

    return NextResponse.json(errorResponse, { status: 503 });
  }
}

// Handle other HTTP methods
export async function POST() {
  return NextResponse.json(
    { error: "Method not allowed. Use GET for health checks." },
    { status: 405 },
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method not allowed. Use GET for health checks." },
    { status: 405 },
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed. Use GET for health checks." },
    { status: 405 },
  );
}