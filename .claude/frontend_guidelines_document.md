# Wild West Construction — Frontend Guideline Document

## Frontend Architecture

We use a modern, component‐based stack powered by Next.js and React. Pages and layouts are rendered server-side (SSR) for fast first paint and SEO benefits. We manage data loading at build time (Static Generation) where possible, falling back to server-side rendering for dynamic blocks like the unified lead form and AI chatbot.

Key technologies:

- **Next.js** for routing, SSR/SSG, and built-in performance optimizations.
- **React** for UI components and client-side interactivity.
- **Node.js** (in Vercel lambdas) to handle form submissions, Turnstile/reCAPTCHA validation, and CRM/calendar webhooks.
- **Supabase** for file-uploads (photos/videos) and as an optional database for lightweight state.
- **OpenAI GPT-4o Mini** for the AI chatbot.
- **Cloudflare Turnstile & reCAPTCHA v3** for spam protection.
- **GitHub Actions + Vercel** for CI/CD and deployments.

This architecture is:

- **Scalable**: Static pages (≈2,700 service pages + 23 city hubs) are generated from CSVs in Git. New cities or services are added by updating CSV.
- **Maintainable**: Clear folder structure (`/pages`, `/components`, `/layouts`), data driven from CSV/JSON-LD, and reusable UI components.
- **Performant**: Next.js optimizes JS splitting, image loading, and CSS output. We inline critical CSS, defer third-party scripts, and lazy-load below-the-fold assets.

## Design Principles

1. **Usability**: Forms and CTAs are prominent, with clear instructions and visual feedback. We use 44 px tap targets, visible focus outlines, and simple step flows for booking, chatting, and lead capture.
2. **Accessibility (WCAG AA)**: Sufficient color contrast, alt text for all images, aria-labels and roles, error messages announced via ARIA live regions, keyboard navigation for every interactive element.
3. **Responsiveness**: Mobile-first design with flexible layouts using CSS Grid and Flexbox. The header, sticky footer (Call, Chat, Book, Quote), and modals scale smoothly from 320 px to 1920 px.
4. **Consistency**: A single source of truth for colors, typography, and spacing (Tailwind config). Components follow the same patterns, ensuring a familiar experience across flooring, demolition, and junk removal pages.

## Styling and Theming

### Methodology & Tools

- **Tailwind CSS** (utility-first) for rapid styling and consistent spacing. We use JIT mode for minimal CSS output.
- **PostCSS** plugins for autoprefixing and minification.

### Theme & Look

- **Style**: Modern flat design with subtle “Western” accents—clean lines, minimal textures.
- **Color Palette**:
  - Primary: `#7C5035` (Deep Saddle Brown)
  - Secondary: `#C59D5F` (Wheat Gold)
  - Accent: `#D4AF37` (Metallic Gold)
  - Background: `#F7F1E3` (Ivory)
  - Text Dark: `#333333`
  - Text Light: `#FFFFFF`
- **Fonts**:
  - Headings: "Roboto Slab", serif
  - Body: "Roboto", sans-serif  
    (Fallbacks: serif, sans-serif)

### Theming

All theme tokens (colors, fonts, spacing) live in `tailwind.config.js`. We add a dark mode toggle in the future if needed by enabling the `darkMode` option.

## Component Structure

We organize components by feature:

- `/components/ui` – buttons, inputs, modals, form fields.
- `/components/layout` – Header, Footer, Breadcrumb, StickyFooter.
- `/components/pages` – CityHubModules, ServicePageModules, CategoryHubBlocks.

Every component:

- Accepts typed props (TypeScript).
- Has a single responsibility (e.g., `LeadForm` only handles rendering and validation UI; the submit logic lives in a hook).
- Is documented with JSDoc comments and Storybook stories (optional).

This component-based approach:

- Encourages **reuse** (e.g., the same `Button` appears in forms, CTAs, and the booking widget).
- Simplifies **maintenance** (bug fixes or style updates in one place).
- Supports **scalability** by letting teams work on isolated pieces.

## State Management

We keep global state minimal. For most data fetching (CSV-driven content, JSON-LD, recent jobs), we rely on Next.js data functions (`getStaticProps`).

Client-side state:

- **React Context** for theme settings or user preferences.
- **SWR** (Stale-While-Revalidate) for caching and re-fetching dynamic data: chatbot conversations, calendar availability, form submission status.

This keeps state predictable, avoids over-engineering (no Redux), and delivers a smooth UX with cache updates.

## Routing and Navigation

- **Next.js File System Routing**:
  - `/pages/[city-ut]/index.tsx` → City hub pages.
  - `/pages/[city-ut]/[keyword].tsx` → Service pages.
  - `/pages/flooring.tsx`, `/demolition.tsx`, `/junk-removal.tsx` → Category hubs.
- **Linking**: Use `next/link` for client-side transitions and prefetching.
- **Breadcrumb**: `<nav aria-label="Breadcrumb">` with JSON-LD `<BreadcrumbList>` for SEO.
- **Sitewide Navigation**: Header nav with phone, WhatsApp, and Book Now buttons. Sticky footer on mobile with primary CTAs (Call, Chat, Book, Quote).

Users move fluidly between category, city, and service pages with clear back links and CTAs.

## Performance Optimization

1. **Code Splitting**: Next.js automatic splitting; dynamic imports for heavy widgets (chatbot, scheduler).
2. **Critical CSS**: Inline minimal Tailwind utilities for above-the-fold content.
3. **Lazy Loading**: Next.js `<Image>` with `loading="lazy"` for all below-the-fold images in `AVIF`/`WebP` formats.
4. **Asset Optimization**: Minify JS/CSS, compress images at build time.
5. **Third-Party Scripts**: Defer or load on interaction (e.g., scheduler only loads when “Book Now” is clicked).

These measures help us meet Core Web Vitals targets (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1).

## Testing and Quality Assurance

### Unit & Integration

- **Jest** for unit tests of utility functions and small components.
- **React Testing Library** for integration tests of forms, navigation, and key UI flows.

### End-to-End

- **Cypress** for critical user journeys: lead form submission, WhatsApp click, scheduler booking, chatbot lead capture.

### Linting & Formatting

- **ESLint** (with Next.js and TypeScript rules) and **Prettier** for code consistency.
- **Tailwind CSS Linting** (via `eslint-plugin-tailwindcss`) to enforce design tokens.

### CI/CD Checks

- Every PR runs tests, lint checks, and type checks in GitHub Actions before merging. Vercel deploy previews allow manual QA on each branch.

## Conclusion and Overall Frontend Summary

This frontend setup delivers a fast, accessible, and maintainable lead-generation site.

- We leverage Next.js for SEO-friendly SSR/SSG and React’s component model for clear structure.
- Design choices (accessibility, responsiveness, “Western modern” style) align with Wild West Construction’s brand and user expectations.
- A lightweight state solution (React Context + SWR) keeps interactions smooth without unnecessary complexity.
- Performance best practices and a strict testing regime ensure we hit our KPIs for Core Web Vitals and conversion rates.

Unique aspects:

- Data-driven pages sourced directly from CSVs, enabling non-developers to update content.
- Four conversion paths (form, WhatsApp, calendar, AI chatbot) seamlessly integrated.
- Custom scheduling and CRM webhooks for real-time lead management.

With these guidelines, any developer—even without a heavy technical background—can understand, build, and maintain our frontend, ensuring consistency, quality, and speed as we grow.
