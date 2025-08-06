import { NextResponse } from 'next/server';

// This endpoint checks environment variable configuration at runtime
export async function GET() {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];

  const optionalVars = [
    'RESEND_API_KEY',
    'ADMIN_USERNAME',
    'ADMIN_PASSWORD',
  ];

  const results = {
    status: 'healthy',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    required: {} as Record<string, boolean>,
    optional: {} as Record<string, boolean>,
    errors: [] as string[],
    warnings: [] as string[],
  };

  // Check required variables
  for (const varName of requiredVars) {
    const value = process.env[varName];
    results.required[varName] = !!value;
    
    if (!value) {
      results.errors.push(`Missing: ${varName}`);
      results.status = 'unhealthy';
    } else {
      // Basic validation without exposing values
      if (value.includes('\n') || value.includes('\r')) {
        results.errors.push(`Malformed: ${varName} contains newlines`);
        results.status = 'unhealthy';
      }
      
      if (varName.includes('URL')) {
        try {
          new URL(value);
        } catch {
          results.errors.push(`Invalid URL: ${varName}`);
          results.status = 'unhealthy';
        }
      }
    }
  }

  // Check optional variables
  for (const varName of optionalVars) {
    const value = process.env[varName];
    results.optional[varName] = !!value;
    
    if (!value) {
      results.warnings.push(`Optional not set: ${varName}`);
    }
  }

  // Return appropriate status code
  const statusCode = results.status === 'healthy' ? 200 : 503;
  
  return NextResponse.json(results, { status: statusCode });
}

// Health check endpoint for monitoring
export async function HEAD() {
  const hasRequiredVars = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  return new NextResponse(null, {
    status: hasRequiredVars ? 200 : 503,
  });
}