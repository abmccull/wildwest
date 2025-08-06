#!/usr/bin/env node

/**
 * Environment Variable Validator
 * Checks for common issues with environment variables before deployment
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Required environment variables
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

function validateEnvFile(envPath: string): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  };

  // Check if file exists
  if (!fs.existsSync(envPath)) {
    result.errors.push(`Environment file not found: ${envPath}`);
    result.valid = false;
    return result;
  }

  // Load environment variables
  const envConfig = dotenv.config({ path: envPath });
  
  if (envConfig.error) {
    result.errors.push(`Failed to parse environment file: ${envConfig.error.message}`);
    result.valid = false;
    return result;
  }

  const env = envConfig.parsed || {};

  // Check required variables
  for (const varName of requiredVars) {
    if (!env[varName]) {
      result.errors.push(`Missing required variable: ${varName}`);
      result.valid = false;
    } else {
      // Validate format
      const value = env[varName];
      
      // Check for newlines
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
          result.errors.push(`Invalid URL format in ${varName}: ${value}`);
          result.valid = false;
        }
      }
      
      // Validate JWT tokens
      if (varName.includes('KEY')) {
        // Check for proper JWT format (basic check)
        const jwtParts = value.split('.');
        if (varName.includes('ANON_KEY') || varName.includes('SERVICE_ROLE_KEY')) {
          if (jwtParts.length !== 3) {
            result.errors.push(`Invalid JWT format in ${varName}`);
            result.valid = false;
          }
        }
      }
    }
  }

  // Check optional variables
  for (const varName of optionalVars) {
    if (!env[varName]) {
      result.warnings.push(`Optional variable not set: ${varName}`);
    }
  }

  // Check for common mistakes
  for (const [key, value] of Object.entries(env)) {
    // Check for placeholder values
    if (value.includes('your-') || value.includes('YOUR-') || value === 'your_value_here') {
      result.errors.push(`Variable contains placeholder value: ${key}`);
      result.valid = false;
    }
    
    // Check for quotes in values (common mistake)
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      result.warnings.push(`Variable value contains quotes: ${key}`);
    }
  }

  return result;
}

function printResults(envFile: string, results: ValidationResult): void {
  console.log(`\n${colors.blue}Validating: ${envFile}${colors.reset}`);
  console.log('='.repeat(50));

  if (results.valid) {
    console.log(`${colors.green}✓ Environment file is valid${colors.reset}`);
  } else {
    console.log(`${colors.red}✗ Environment file has errors${colors.reset}`);
  }

  if (results.errors.length > 0) {
    console.log(`\n${colors.red}Errors:${colors.reset}`);
    results.errors.forEach(error => {
      console.log(`  ${colors.red}✗${colors.reset} ${error}`);
    });
  }

  if (results.warnings.length > 0) {
    console.log(`\n${colors.yellow}Warnings:${colors.reset}`);
    results.warnings.forEach(warning => {
      console.log(`  ${colors.yellow}⚠${colors.reset} ${warning}`);
    });
  }

  console.log('');
}

function main(): void {
  console.log(`${colors.blue}Environment Variable Validator${colors.reset}`);
  console.log('='.repeat(50));

  const envFiles = [
    '.env.local',
    '.env.production',
    '.env.production.local',
  ];

  let hasErrors = false;

  for (const envFile of envFiles) {
    const envPath = path.join(process.cwd(), envFile);
    if (fs.existsSync(envPath)) {
      const results = validateEnvFile(envPath);
      printResults(envFile, results);
      
      if (!results.valid) {
        hasErrors = true;
      }
    } else {
      console.log(`${colors.yellow}Skipping: ${envFile} (not found)${colors.reset}`);
    }
  }

  // Summary
  console.log('='.repeat(50));
  if (hasErrors) {
    console.log(`${colors.red}✗ Validation failed. Please fix errors before deployment.${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`${colors.green}✓ All environment files validated successfully!${colors.reset}`);
    console.log(`${colors.blue}Ready for deployment.${colors.reset}`);
  }
}

// Run validation
if (require.main === module) {
  main();
}