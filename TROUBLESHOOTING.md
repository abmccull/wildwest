# Troubleshooting Guide - Wild West Construction Deployment

## Common Build Errors and Solutions

### 1. Invalid URL Error with Supabase

**Error Message:**
```
TypeError: Invalid URL
https://your-project.supabase.co
```

**Causes:**
- Newline characters in environment variables
- Missing protocol (http:// or https://)
- Malformed URL structure
- Copy-paste errors from documentation

**Solutions:**
1. **Remove newlines from environment variables:**
   ```bash
   # Check for newlines
   cat -e .env.production | grep SUPABASE_URL
   
   # Should NOT show any $ at the end of the value
   # Bad:  NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co$
   # Good: NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co
   ```

2. **Validate URL format:**
   ```bash
   # Run validation script
   npm run validate:env
   ```

3. **In Vercel Dashboard:**
   - Go to Settings > Environment Variables
   - Edit each Supabase variable
   - Delete and re-type the value (don't paste)
   - Ensure no trailing spaces or newlines

### 2. Build Succeeds but Runtime Fails

**Error Message:**
```
Error: Missing Supabase environment variables
```

**Causes:**
- Environment variables not available at build time
- Wrong variable scope in Vercel
- Typos in variable names

**Solutions:**
1. **Check variable availability:**
   ```javascript
   // Add to next.config.ts for debugging
   console.log('Build-time env check:', {
     url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
     anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
   });
   ```

2. **Vercel variable scope:**
   - All `NEXT_PUBLIC_*` variables must be available in all environments
   - Service keys should only be in Production

3. **Force rebuild in Vercel:**
   ```bash
   # Clear cache and rebuild
   vercel --force
   ```

### 3. Static Page Generation Fails

**Error Message:**
```
Error occurred prerendering page "/[slug]"
```

**Causes:**
- Database connection issues
- Invalid data in database
- Timeout during build

**Solutions:**
1. **Test database connection:**
   ```bash
   # Create test script
   npx tsx scripts/test-db.ts
   ```

2. **Increase timeout:**
   ```javascript
   // In page component
   export const revalidate = 3600; // 1 hour
   export const dynamicParams = true;
   ```

3. **Fallback to dynamic rendering:**
   ```javascript
   // Add to problematic pages
   export const dynamic = 'force-dynamic';
   ```

### 4. API Routes Return 500 Errors

**Error Message:**
```
Internal Server Error
```

**Causes:**
- Missing service role key
- Incorrect CORS configuration
- Database permission issues

**Solutions:**
1. **Check service role key:**
   ```javascript
   // In API route
   if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
     console.error('Service role key missing');
     return NextResponse.json(
       { error: 'Configuration error' },
       { status: 500 }
     );
   }
   ```

2. **Add error handling:**
   ```javascript
   try {
     // Your API logic
   } catch (error) {
     console.error('API Error:', error);
     return NextResponse.json(
       { error: 'Internal server error' },
       { status: 500 }
     );
   }
   ```

### 5. Deployment Hangs or Times Out

**Causes:**
- Large bundle size
- Too many static pages
- Memory issues

**Solutions:**
1. **Optimize bundle:**
   ```bash
   # Analyze bundle
   npm run build:analyze
   ```

2. **Reduce static generation:**
   ```javascript
   // Limit static params
   export async function generateStaticParams() {
     const pages = await getPages();
     return pages.slice(0, 100); // Limit to 100 pages
   }
   ```

3. **Use ISR instead:**
   ```javascript
   export const revalidate = 60; // Revalidate every minute
   ```

## Environment Variable Debugging

### Check Current Environment
```bash
# Local
echo $NODE_ENV

# In application
console.log('Environment:', process.env.NODE_ENV);
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + '...');
```

### Validate All Variables
```bash
# Run validation
npm run validate:env

# Manual check
node -e "require('dotenv').config(); console.log(process.env)"
```

## Vercel-Specific Issues

### 1. Function Size Limit Exceeded
**Solution:** 
- Enable output file tracing
- Use dynamic imports
- Split large API routes

### 2. Build Cache Issues
**Solution:**
```bash
# Clear build cache
vercel env pull
vercel build --force
vercel deploy --prebuilt
```

### 3. Domain Not Working
**Solution:**
- Check DNS propagation
- Verify SSL certificate
- Clear browser cache

## Database Connection Issues

### Test Supabase Connection
```javascript
// test-supabase.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase
    .from('pages')
    .select('count')
    .limit(1);
    
  if (error) {
    console.error('Connection failed:', error);
  } else {
    console.log('Connection successful');
  }
}

test();
```

## Performance Issues

### 1. Slow Initial Load
**Solutions:**
- Enable Next.js compression
- Optimize images
- Use CDN for static assets

### 2. High Memory Usage
**Solutions:**
- Limit concurrent builds
- Use incremental static regeneration
- Optimize database queries

## Quick Fixes

### Force Fresh Deployment
```bash
# Delete .next and node_modules
rm -rf .next node_modules

# Reinstall and build
npm install
npm run build
```

### Reset Environment Variables
```bash
# Pull from Vercel
vercel env pull .env.production.local

# Validate
npm run validate:env

# Rebuild
npm run build
```

### Check Build Output
```bash
# Detailed build log
NEXT_TELEMETRY_DEBUG=1 npm run build
```

## Getting Help

1. **Check logs:**
   - Vercel Functions logs
   - Build logs
   - Browser console

2. **Enable debug mode:**
   ```javascript
   // In next.config.ts
   const nextConfig = {
     ...config,
     reactStrictMode: true,
     swcMinify: true,
     experimental: {
       verbose: true,
     },
   };
   ```

3. **Contact support:**
   - Vercel Support: https://vercel.com/support
   - Supabase Support: https://supabase.com/support
   - GitHub Issues: Create issue with error details

## Prevention Checklist

Before each deployment:
- [ ] Run `npm run validate:env`
- [ ] Test build locally with `npm run build`
- [ ] Check for console errors
- [ ] Verify database connection
- [ ] Review recent changes
- [ ] Create backup of working `.env` files
- [ ] Test critical user flows after deployment