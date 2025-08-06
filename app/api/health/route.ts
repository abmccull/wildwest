import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

interface HealthCheckResponse {
  status: "healthy" | "unhealthy";
  timestamp: string;
  uptime: number;
  version: string;
  services: {
    database: {
      status: "connected" | "disconnected" | "error";
      responseTime?: number;
      error?: string;
    };
    api: {
      status: "operational";
      responseTime: number;
    };
  };
  environment: string;
}

export async function GET() {
  const startTime = Date.now();

  try {
    // Initialize Supabase client inside the function
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    // Initialize health check response
    const healthCheck: HealthCheckResponse = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || "1.0.0",
      services: {
        database: {
          status: "disconnected",
        },
        api: {
          status: "operational",
          responseTime: 0,
        },
      },
      environment: process.env.NODE_ENV || "development",
    };

    // Test database connectivity only if credentials are available
    const dbStartTime = Date.now();
    
    if (supabaseUrl && supabaseServiceKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { error } = await supabase
          .from("leads")
          .select("count", { count: "exact", head: true })
          .limit(1);

        const dbResponseTime = Date.now() - dbStartTime;

        if (error) {
          healthCheck.services.database = {
            status: "error",
            responseTime: dbResponseTime,
            error: error.message,
          };
          healthCheck.status = "unhealthy";
        } else {
          healthCheck.services.database = {
            status: "connected",
            responseTime: dbResponseTime,
          };
        }
      } catch (dbError) {
        const dbResponseTime = Date.now() - dbStartTime;
        healthCheck.services.database = {
          status: "error",
          responseTime: dbResponseTime,
          error:
            dbError instanceof Error ? dbError.message : "Unknown database error",
        };
        healthCheck.status = "unhealthy";
      }
    }

    // Calculate API response time
    healthCheck.services.api.responseTime = Date.now() - startTime;

    // Return appropriate status code based on health
    const statusCode = healthCheck.status === "healthy" ? 200 : 503;

    return NextResponse.json(healthCheck, { status: statusCode });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Health check error:", error);

    const errorResponse: HealthCheckResponse = {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || "1.0.0",
      services: {
        database: {
          status: "error",
          error: "Unable to perform health check",
        },
        api: {
          status: "operational",
          responseTime: Date.now() - startTime,
        },
      },
      environment: process.env.NODE_ENV || "development",
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
