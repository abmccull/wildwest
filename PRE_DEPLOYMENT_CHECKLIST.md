# Pre-Deployment Checklist for Wild West Construction

## Build Issues to Resolve

### 1. TypeScript Errors (MUST FIX)

- [ ] Fix type error in `/app/api/chat/route.ts` (line 79)
  - The response type mismatch between tokensUsed and fallback properties
  - Solution: Ensure consistent return type in the chat API handler

### 2. Warnings (Optional but Recommended)

- [ ] ESLint warning in `/components/forms/FileUpload.tsx` (line 171)
  - Replace `<img>` with Next.js `<Image>` component
- [ ] React Hook dependency warning in `/components/ui/TurnstileWidget.tsx` (line 124)
  - Add `widgetId` to useEffect dependency array
- [ ] Missing `drizzle-orm` dependency warning
  - This is from rate-limiter-flexible package, not critical

## Environment Variables Setup

### Required in Vercel Dashboard

1. **Supabase**
   - [ ] NEXT_PUBLIC_SUPABASE_URL
   - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
   - [ ] SUPABASE_SERVICE_ROLE_KEY

2. **Third-Party APIs**
   - [ ] OPENAI_API_KEY
   - [ ] SLACK_WEBHOOK_URL
   - [ ] RESEND_API_KEY

3. **Analytics & Security**
   - [ ] NEXT_PUBLIC_GA_MEASUREMENT_ID
   - [ ] NEXT_PUBLIC_TURNSTILE_SITE_KEY
   - [ ] TURNSTILE_SECRET_KEY

4. **Site Configuration**
   - [ ] NEXT_PUBLIC_SITE_URL = https://wildwestslc.com

## GitHub Repository Setup

### Secrets for GitHub Actions

- [ ] VERCEL_TOKEN
- [ ] VERCEL_ORG_ID
- [ ] VERCEL_PROJECT_ID
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY

## Pre-Deployment Steps

1. **Fix Critical Build Errors**

   ```bash
   # Fix TypeScript errors first
   # Then run:
   npm run build
   npm run type-check
   npm test
   ```

2. **Verify Local Build**

   ```bash
   npm run build && npm start
   # Test at http://localhost:3000
   ```

3. **Update Production Environment File**
   - Fill in actual values in `.env.production`
   - Never commit sensitive values

4. **Database Setup**
   - [ ] Ensure Supabase project is created
   - [ ] Run migrations in production
   - [ ] Verify RLS policies are enabled
   - [ ] Test database connection

5. **Domain Configuration**
   - [ ] Verify domain ownership
   - [ ] Configure DNS records
   - [ ] Set up SSL certificate (automatic with Vercel)

## Quick Fix for Build Error

To fix the immediate TypeScript error in chat route, the return type needs to be consistent. The handler should always return the same shape of response.

```typescript
// In /app/api/chat/route.ts
// Ensure all return statements have consistent type:
type ChatResponse = {
  message: string;
  sessionId: string;
  tokensUsed?: number;
  fallback?: boolean;
};
```

## Deployment Commands

Once build issues are resolved:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# Or link to existing project
vercel link
vercel --prod
```
