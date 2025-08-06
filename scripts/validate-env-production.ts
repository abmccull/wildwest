#!/usr/bin/env node

/**
 * Production-Safe Environment Variable Validator
 * Works in both local and Vercel deployment environments
 */

// Required environment variables for production
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
];

// Optional but recommended variables
const optionalVars = [
  'RESEND_API_KEY',
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD',
  'NEXT_PUBLIC_BUSINESS_NAME',
  'NEXT_PUBLIC_BUSINESS_PHONE',
  'NEXT_PUBLIC_BUSINESS_EMAIL',
  'NEXT_PUBLIC_BUSINESS_ADDRESS',
  'NEXT_PUBLIC_WHATSAPP_LINK',
];

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

function validateEnvironment(): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  };

  // Check if we're in a CI/CD environment
  const isCI = process.env.CI === 'true' || process.env.VERCEL === '1';
  const isProduction = process.env.NODE_ENV === 'production';

  console.log(`\nEnvironment Variable Validation`);
  console.log(`Environment: ${isProduction ? 'Production' : 'Development'}`);
  console.log(`CI/CD: ${isCI ? 'Yes' : 'No'}`);
  console.log('='.repeat(50));

  // Check required variables
  for (const varName of requiredVars) {
    const value = process.env[varName];
    
    if (!value) {
      result.errors.push(`Missing required variable: ${varName}`);
      result.valid = false;
    } else {
      // Validate format without exposing values
      
      // Check for newlines (common copy-paste error)
      if (value.includes('\n') || value.includes('\r')) {
        result.errors.push(`Variable contains newline characters: ${varName}`);
        result.valid = false;
      }
      
      // Check for trailing/leading whitespace
      if (value !== value.trim()) {
        result.warnings.push(`Variable has whitespace: ${varName}`);
      }
      
      // Validate URLs
      if (varName.includes('URL')) {
        try {
          const url = new URL(value);
          
          // Check for Supabase URL format
          if (varName === 'NEXT_PUBLIC_SUPABASE_URL') {
            if (!url.hostname.endsWith('.supabase.co')) {
              result.warnings.push(`Supabase URL doesn't match expected format: ${varName}`);
            }
            if (url.protocol !== 'https:') {
              result.errors.push(`Supabase URL must use HTTPS: ${varName}`);
              result.valid = false;
            }
          }
        } catch (error) {
          result.errors.push(`Invalid URL format in ${varName}`);
          result.valid = false;
        }
      }
      
      // Basic JWT validation (without exposing the key)
      if (varName.includes('KEY')) {
        const jwtParts = value.split('.');
        if (varName.includes('ANON_KEY') || varName.includes('SERVICE_ROLE_KEY')) {
          if (jwtParts.length !== 3) {
            result.errors.push(`Invalid JWT format in ${varName}`);
            result.valid = false;
          }
        }
      }
      
      // Check for placeholder values
      if (value.includes('your-') || value.includes('YOUR-') || value === 'your_value_here') {
        result.errors.push(`Variable contains placeholder value: ${varName}`);
        result.valid = false;
      }
    }
  }

  // Check optional variables (warnings only)
  for (const varName of optionalVars) {
    if (!process.env[varName]) {
      // Only warn in production
      if (isProduction) {
        result.warnings.push(`Optional variable not set: ${varName}`);
      }
    }
  }

  // Print results
  if (result.valid) {
    console.log(`✓ Environment validation passed`);
  } else {
    console.log(`✗ Environment validation failed`);
  }

  if (result.errors.length > 0) {
    console.log(`\nErrors:`);
    result.errors.forEach(error => {
      console.error(`  ✗ ${error}`);
    });
  }

  if (result.warnings.length > 0) {
    console.log(`\nWarnings:`);
    result.warnings.forEach(warning => {
      console.warn(`  ⚠ ${warning}`);
    });
  }

  console.log('');

  return result;
}

// Main execution
function main(): void {
  const results = validateEnvironment();
  
  // In CI/CD environments, only fail on critical errors
  const isCI = process.env.CI === 'true' || process.env.VERCEL === '1';
  
  if (!results.valid) {
    if (isCI) {
      // In CI/CD, log errors but don't block the build for missing optional vars
      const criticalErrors = results.errors.filter(err => 
        !err.includes('Optional') && 
        !err.includes('WARNING')
      );
      
      if (criticalErrors.length > 0) {
        console.error('Critical environment configuration errors detected.');
        console.error('Please check your Vercel environment variables.');
        process.exit(1);
      }
    } else {
      // In local development, fail on any validation error
      console.error('Validation failed. Please fix errors before deployment.');
      process.exit(1);
    }
  }
  
  console.log('Environment validation completed successfully.');
}

// Run validation only if executed directly
if (require.main === module) {
  main();
}

export { validateEnvironment };