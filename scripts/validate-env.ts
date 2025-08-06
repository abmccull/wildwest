#!/usr/bin/env node

/**
 * Environment Variable Validator
 * Checks for common issues with environment variables before deployment
 * Works in both local and Vercel environments
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Detect if running in CI/Vercel environment
const isVercel = process.env.VERCEL === '1' || process.env.CI === 'true';
const isLocal = !isVercel;

// Colors for console output (only use in local environments)
const colors = isLocal ? {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
} : {
  reset: '',
  red: '',
  green: '',
  yellow: '',
  blue: '',
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

/**
 * Log messages with proper formatting for both local and Vercel environments
 */
function log(message: string, level: 'info' | 'error' | 'warn' = 'info'): void {
  const prefix = isVercel ? `[ENV-VALIDATOR] ` : '';
  const timestamp = isVercel ? `${new Date().toISOString()} ` : '';
  
  switch (level) {
    case 'error':
      console.error(`${timestamp}${prefix}ERROR: ${message}`);
      break;
    case 'warn':
      console.warn(`${timestamp}${prefix}WARN: ${message}`);
      break;
    default:
      console.log(`${timestamp}${prefix}${message}`);
      break;
  }
}

/**
 * Validate environment variables from process.env (for Vercel/CI environments)
 */
function validateProcessEnv(): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  };

  log('Validating environment variables from process.env', 'info');
  
  try {
    const env = process.env;
    
    // Check required variables
    for (const varName of requiredVars) {
      const value = env[varName];
      
      if (!value || value.trim() === '') {
        result.errors.push(`Missing required variable: ${varName}`);
        result.valid = false;
        log(`Missing required variable: ${varName}`, 'error');
      } else {
        // Validate format
        const trimmedValue = value.trim();
        
        // Check for newlines
        if (trimmedValue.includes('\n') || trimmedValue.includes('\r')) {
          result.errors.push(`Variable contains newline characters: ${varName}`);
          result.valid = false;
          log(`Variable contains newline characters: ${varName}`, 'error');
        }
        
        // Check for trailing/leading whitespace
        if (value !== trimmedValue) {
          result.warnings.push(`Variable has whitespace: ${varName}`);
          log(`Variable has whitespace: ${varName}`, 'warn');
        }
        
        // Validate URLs
        if (varName.includes('URL')) {
          try {
            const url = new URL(trimmedValue);
            
            // Check for Supabase URL format
            if (varName === 'NEXT_PUBLIC_SUPABASE_URL') {
              if (!url.hostname.endsWith('.supabase.co')) {
                result.warnings.push(`Supabase URL doesn't match expected format: ${varName}`);
                log(`Supabase URL doesn't match expected format: ${varName}`, 'warn');
              }
              if (url.protocol !== 'https:') {
                result.errors.push(`Supabase URL must use HTTPS: ${varName}`);
                result.valid = false;
                log(`Supabase URL must use HTTPS: ${varName}`, 'error');
              }
            }
          } catch (error) {
            result.errors.push(`Invalid URL format in ${varName}`);
            result.valid = false;
            log(`Invalid URL format in ${varName}`, 'error');
          }
        }
        
        // Validate JWT tokens
        if (varName.includes('KEY')) {
          // Check for proper JWT format (basic check)
          const jwtParts = trimmedValue.split('.');
          if (varName.includes('ANON_KEY') || varName.includes('SERVICE_ROLE_KEY')) {
            if (jwtParts.length !== 3) {
              result.errors.push(`Invalid JWT format in ${varName}`);
              result.valid = false;
              log(`Invalid JWT format in ${varName}`, 'error');
            }
          }
        }
        
        // Check for placeholder values
        if (trimmedValue.includes('your-') || trimmedValue.includes('YOUR-') || trimmedValue === 'your_value_here') {
          result.errors.push(`Variable contains placeholder value: ${varName}`);
          result.valid = false;
          log(`Variable contains placeholder value: ${varName}`, 'error');
        }
      }
    }

    // Check optional variables
    for (const varName of optionalVars) {
      const value = env[varName];
      if (!value || value.trim() === '') {
        result.warnings.push(`Optional variable not set: ${varName}`);
        log(`Optional variable not set: ${varName}`, 'warn');
      }
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    result.errors.push(`Failed to validate process.env: ${errorMessage}`);
    result.valid = false;
    log(`Failed to validate process.env: ${errorMessage}`, 'error');
  }

  return result;
}

/**
 * Validate environment variables from a .env file (for local development)
 */
function validateEnvFile(envPath: string): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  };

  try {
    // Check if file exists
    if (!fs.existsSync(envPath)) {
      result.errors.push(`Environment file not found: ${envPath}`);
      result.valid = false;
      return result;
    }

    log(`Validating environment file: ${envPath}`, 'info');

    // Load environment variables
    const envConfig = dotenv.config({ path: envPath });
    
    if (envConfig.error) {
      result.errors.push(`Failed to parse environment file: ${envConfig.error.message}`);
      result.valid = false;
      log(`Failed to parse environment file: ${envConfig.error.message}`, 'error');
      return result;
    }

    const env = envConfig.parsed || {};

    // Check required variables
    for (const varName of requiredVars) {
      const value = env[varName];
      
      if (!value || value.trim() === '') {
        result.errors.push(`Missing required variable: ${varName}`);
        result.valid = false;
        log(`Missing required variable: ${varName}`, 'error');
      } else {
        // Validate format
        const trimmedValue = value.trim();
        
        // Check for newlines
        if (trimmedValue.includes('\n') || trimmedValue.includes('\r')) {
          result.errors.push(`Variable contains newline characters: ${varName}`);
          result.valid = false;
          log(`Variable contains newline characters: ${varName}`, 'error');
        }
        
        // Check for trailing/leading whitespace
        if (value !== trimmedValue) {
          result.warnings.push(`Variable has whitespace: ${varName}`);
          log(`Variable has whitespace: ${varName}`, 'warn');
        }
        
        // Validate URLs
        if (varName.includes('URL')) {
          try {
            const url = new URL(trimmedValue);
            
            // Check for Supabase URL format
            if (varName === 'NEXT_PUBLIC_SUPABASE_URL') {
              if (!url.hostname.endsWith('.supabase.co')) {
                result.warnings.push(`Supabase URL doesn't match expected format: ${varName}`);
                log(`Supabase URL doesn't match expected format: ${varName}`, 'warn');
              }
              if (url.protocol !== 'https:') {
                result.errors.push(`Supabase URL must use HTTPS: ${varName}`);
                result.valid = false;
                log(`Supabase URL must use HTTPS: ${varName}`, 'error');
              }
            }
          } catch (error) {
            result.errors.push(`Invalid URL format in ${varName}`);
            result.valid = false;
            log(`Invalid URL format in ${varName}`, 'error');
          }
        }
        
        // Validate JWT tokens
        if (varName.includes('KEY')) {
          // Check for proper JWT format (basic check)
          const jwtParts = trimmedValue.split('.');
          if (varName.includes('ANON_KEY') || varName.includes('SERVICE_ROLE_KEY')) {
            if (jwtParts.length !== 3) {
              result.errors.push(`Invalid JWT format in ${varName}`);
              result.valid = false;
              log(`Invalid JWT format in ${varName}`, 'error');
            }
          }
        }
        
        // Check for placeholder values
        if (trimmedValue.includes('your-') || trimmedValue.includes('YOUR-') || trimmedValue === 'your_value_here') {
          result.errors.push(`Variable contains placeholder value: ${varName}`);
          result.valid = false;
          log(`Variable contains placeholder value: ${varName}`, 'error');
        }
      }
    }

    // Check optional variables
    for (const varName of optionalVars) {
      const value = env[varName];
      if (!value || value.trim() === '') {
        result.warnings.push(`Optional variable not set: ${varName}`);
        log(`Optional variable not set: ${varName}`, 'warn');
      }
    }

    // Check for common mistakes in all variables
    for (const [key, value] of Object.entries(env)) {
      if (typeof value === 'string') {
        // Check for quotes in values (common mistake)
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          result.warnings.push(`Variable value contains quotes: ${key}`);
          log(`Variable value contains quotes: ${key}`, 'warn');
        }
      }
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    result.errors.push(`Error during environment file validation: ${errorMessage}`);
    result.valid = false;
    log(`Error during environment file validation: ${errorMessage}`, 'error');
  }

  return result;
}

function printResults(source: string, results: ValidationResult): void {
  const separator = isLocal ? '='.repeat(50) : '----------------------------------------';
  
  log(`\nValidation results for: ${source}`, 'info');
  log(separator, 'info');

  if (results.valid) {
    log(`${colors.green}✓ Environment variables are valid${colors.reset}`, 'info');
  } else {
    log(`${colors.red}✗ Environment validation failed${colors.reset}`, 'error');
  }

  if (results.errors.length > 0) {
    log(`\n${colors.red}Errors (${results.errors.length}):${colors.reset}`, 'error');
    results.errors.forEach(error => {
      log(`  ${colors.red}✗${colors.reset} ${error}`, 'error');
    });
  }

  if (results.warnings.length > 0) {
    log(`\n${colors.yellow}Warnings (${results.warnings.length}):${colors.reset}`, 'warn');
    results.warnings.forEach(warning => {
      log(`  ${colors.yellow}⚠${colors.reset} ${warning}`, 'warn');
    });
  }

  log('', 'info');
}

function main(): void {
  const startTime = Date.now();
  
  try {
    log(`${colors.blue}Environment Variable Validator${colors.reset}`, 'info');
    log(`Environment: ${isVercel ? 'Vercel/CI' : 'Local Development'}`, 'info');
    
    const separator = isLocal ? '='.repeat(50) : '----------------------------------------';
    log(separator, 'info');

    let hasErrors = false;
    let totalWarnings = 0;

    if (isVercel) {
      // In Vercel/CI environment: validate process.env directly
      log('Running in Vercel/CI environment - validating process.env', 'info');
      
      const results = validateProcessEnv();
      printResults('process.env', results);
      
      if (!results.valid) {
        hasErrors = true;
      }
      totalWarnings += results.warnings.length;
      
    } else {
      // In local environment: check .env files
      log('Running in local environment - checking .env files', 'info');
      
      const envFiles = [
        '.env.local',
        '.env.production',
        '.env.production.local',
        '.env', // Add .env as fallback
      ];

      let foundFiles = 0;

      for (const envFile of envFiles) {
        const envPath = path.join(process.cwd(), envFile);
        if (fs.existsSync(envPath)) {
          foundFiles++;
          const results = validateEnvFile(envPath);
          printResults(envFile, results);
          
          if (!results.valid) {
            hasErrors = true;
          }
          totalWarnings += results.warnings.length;
        } else {
          log(`${colors.yellow}Skipping: ${envFile} (not found)${colors.reset}`, 'warn');
        }
      }

      if (foundFiles === 0) {
        log(`${colors.yellow}No environment files found. Falling back to process.env validation.${colors.reset}`, 'warn');
        // Fallback to process.env validation in local environment
        const results = validateProcessEnv();
        printResults('process.env (fallback)', results);
        
        if (!results.valid) {
          hasErrors = true;
        }
        totalWarnings += results.warnings.length;
      }
    }

    // Summary
    const duration = Date.now() - startTime;
    log(separator, 'info');
    
    if (hasErrors) {
      log(`${colors.red}✗ Validation failed. Please fix errors before deployment.${colors.reset}`, 'error');
      log(`Validation completed in ${duration}ms with errors`, 'error');
      
      // Ensure we exit with proper code
      process.exitCode = 1;
      
      // Force exit after a brief delay to ensure logs are flushed
      setTimeout(() => {
        process.exit(1);
      }, 100);
      
    } else {
      log(`${colors.green}✓ All environment variables validated successfully!${colors.reset}`, 'info');
      if (totalWarnings > 0) {
        log(`${colors.yellow}Note: ${totalWarnings} warnings found (non-blocking)${colors.reset}`, 'warn');
      }
      log(`${colors.blue}Ready for deployment.${colors.reset}`, 'info');
      log(`Validation completed in ${duration}ms`, 'info');
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    log(`Critical error during validation: ${errorMessage}`, 'error');
    
    // Log stack trace in local environment for debugging
    if (isLocal && error instanceof Error && error.stack) {
      log(`Stack trace: ${error.stack}`, 'error');
    }
    
    process.exitCode = 1;
    
    // Force exit after a brief delay to ensure logs are flushed
    setTimeout(() => {
      process.exit(1);
    }, 100);
  }
}

// Run validation
if (require.main === module) {
  main();
}