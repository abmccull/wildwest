# 🔄 Migration Guide: Transitioning to the New Design System

## Quick Start

This guide helps you migrate from the existing components to the new enhanced design system with minimal disruption.

## Migration Overview

### Phase 1: Parallel Implementation (Recommended)

Run both old and new components side-by-side during transition:

1. **Keep existing components** in place
2. **Add new components** with "Enhanced" prefix
3. **Gradually migrate** pages one at a time
4. **Remove old components** after full migration

### Phase 2: Component Mapping

| Old Component          | New Component                  | Key Changes                                          |
| ---------------------- | ------------------------------ | ---------------------------------------------------- |
| `HomepageTemplate`     | `EnhancedHomepageTemplate`     | Progressive forms, activity ticker, urgency elements |
| `CityPageTemplate`     | `EnhancedCityPageTemplate`     | Local SEO, emergency banner, office hours            |
| `CategoryPageTemplate` | `EnhancedCategoryPageTemplate` | Cost calculator, comparison table, process timeline  |
| `ServicePageTemplate`  | `EnhancedServicePageTemplate`  | Exit intent, urgency timer, progress bar             |
| `LeadForm`             | `ProgressiveForm`              | Multi-step, validation, phone-first                  |
| `ServiceCard`          | `Card` + `Button`              | Variants, hover effects, badges                      |

## Step-by-Step Migration

### Step 1: Install Dependencies

```bash
npm install web-vitals
```

### Step 2: Update Tailwind Config

The Tailwind config has been enhanced with new design tokens. The existing styles remain compatible.

### Step 3: Update Individual Pages

#### Homepage Migration

**Before:**

```tsx
// app/page.tsx
import HomepageTemplate from '@/components/templates/HomepageTemplate';

export default function Home() {
  return <HomepageTemplate {...props} />;
}
```

**After:**

```tsx
// app/page.tsx
import { EnhancedHomepageTemplate } from '@/components/templates';

export default function Home() {
  return <EnhancedHomepageTemplate {...props} />;
}
```

#### City Page Migration

**Before:**

```tsx
// app/[city-ut]/page.tsx
import CityPageTemplate from '@/components/templates/CityPageTemplate';

export default function CityPage({ params }) {
  const cityData = getCityData(params.city);
  return <CityPageTemplate city={cityData} services={services} />;
}
```

**After:**

```tsx
// app/[city-ut]/page.tsx
import { EnhancedCityPageTemplate } from '@/components/templates';

export default function CityPage({ params }) {
  const cityData = getCityData(params.city);
  const nearbyCities = getNearbyCities(cityData.id);

  return (
    <EnhancedCityPageTemplate
      city={cityData}
      services={services}
      categories={categories}
      nearbyCities={nearbyCities}
      population={cityData.population}
    />
  );
}
```

### Step 4: Update Form Components

#### Lead Form Migration

**Before:**

```tsx
import LeadForm from '@/components/forms/LeadForm';

<LeadForm onSubmit={handleSubmit} fields={['name', 'phone', 'email', 'service']} />;
```

**After:**

```tsx
import { ProgressiveForm } from '@/components/ui';

<ProgressiveForm
  steps={[
    {
      id: 'service',
      title: 'Select Service',
      fields: [
        {
          name: 'service',
          label: 'Service Type',
          type: 'radio',
          options: serviceOptions,
          required: true,
        },
      ],
    },
    {
      id: 'contact',
      title: 'Contact Info',
      fields: [
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'tel',
          required: true,
        },
      ],
    },
  ]}
  onSubmit={handleSubmit}
/>;
```

### Step 5: Add Performance Monitoring

Add to your root layout (`app/layout.tsx`):

```tsx
import dynamic from 'next/dynamic';

const WebVitalsReporter = dynamic(() => import('@/components/performance/WebVitalsReporter'), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <WebVitalsReporter />
      </body>
    </html>
  );
}
```

## Component Usage Examples

### Using New UI Components

```tsx
import { Button, Card, Badge, TrustIndicator } from '@/components/ui';

// Button with urgency
<Button variant="urgent" size="lg" animate>
  Limited Offer - Save $500
</Button>

// Card with hover effect
<Card variant="elevated" hover>
  <h3>Service Details</h3>
  <p>Content...</p>
</Card>

// Badge with pulse
<Badge variant="success" pulse>
  Available Now
</Badge>

// Trust indicator
<TrustIndicator
  type="rating"
  value="4.9★"
  label="(127 Reviews)"
/>
```

### Mobile-Specific Components

```tsx
import { StickyMobileCTA } from '@/components/ui';

// Add to any page for mobile conversions
<StickyMobileCTA primaryPhone="18016914065" showQuickForm={true} />;
```

## Data Structure Updates

### Service Data Enhancement

Add these optional fields to your service data:

```typescript
interface EnhancedServiceData {
  // Existing fields
  service: string;
  slug: string;
  category: string;

  // New optional fields
  popular?: boolean; // Shows "Popular" badge
  averagePrice?: number; // Display pricing
  duration?: string; // Timeline estimate
  savings?: number; // Discount amount
  urgency?: boolean; // Shows urgency timer
}
```

### City Data Enhancement

```typescript
interface EnhancedCityData {
  // Existing fields
  name: string;
  slug: string;

  // New optional fields
  population?: number; // For trust signals
  established?: string; // Years in business
  stats?: {
    projectsCompleted: number;
    averageRating: number;
    reviewCount: number;
  };
}
```

## Testing Your Migration

### Checklist

- [ ] **Visual Regression**: Compare old vs new pages
- [ ] **Form Submission**: Test all forms work correctly
- [ ] **Mobile Experience**: Test on actual devices
- [ ] **Performance**: Run Lighthouse audit
- [ ] **Analytics**: Verify tracking works
- [ ] **SEO**: Check meta tags and structured data

### Testing Commands

```bash
# Type checking
npm run type-check

# Build test
npm run build

# Lighthouse CLI
npx lighthouse http://localhost:3000 --view

# Test forms
npm test
```

## Rollback Plan

If issues arise, you can quickly rollback:

1. **Components are isolated**: Old components remain untouched
2. **Import switch**: Change imports back to old components
3. **No data changes**: Data structures are backward compatible

```tsx
// Quick rollback - just change imports
// From:
import { EnhancedHomepageTemplate } from '@/components/templates';

// To:
import HomepageTemplate from '@/components/templates/HomepageTemplate';
```

## Common Issues & Solutions

### Issue: Type errors with new components

**Solution:** Install missing types:

```bash
npm install --save-dev @types/react @types/node
```

### Issue: Styles not applying

**Solution:** Ensure Tailwind config is updated and CSS is imported:

```tsx
// app/globals.css
@import '../styles/design-system.css';
```

### Issue: Forms not submitting

**Solution:** Check Progressive Form expects different structure:

```tsx
// Old: Single object
onSubmit={(data) => console.log(data))

// New: Returns all step data
onSubmit={(data) => {
  // data = { service: '...', name: '...', phone: '...' }
})
```

### Issue: Performance metrics not showing

**Solution:** Ensure WebVitalsReporter is added to layout and web-vitals is installed.

## Timeline Recommendation

### Week 1: Setup & Testing

- Install dependencies
- Update configs
- Test on staging

### Week 2: Gradual Migration

- Migrate homepage
- Monitor metrics
- Gather feedback

### Week 3: Complete Migration

- Migrate remaining pages
- Update documentation
- Remove old components

### Week 4: Optimization

- A/B test variations
- Fine-tune based on data
- Document learnings

## Support

### Resources

- [Design System Documentation](./DESIGN_SYSTEM_IMPLEMENTATION.md)
- [Component Examples](./app/example-implementation.tsx)
- [Performance Guide](./lib/performance.ts)

### Getting Help

- Check existing implementations in `/components/templates/`
- Review type definitions in component files
- Test components in isolation first

## Success Metrics

Monitor these after migration:

### Immediate (Day 1)

- ✅ No console errors
- ✅ Forms submit successfully
- ✅ Analytics tracking works
- ✅ Mobile CTAs visible

### Short-term (Week 1)

- 📈 Conversion rate improvement
- 📉 Bounce rate reduction
- ⚡ Core Web Vitals passing
- 📱 Mobile engagement up

### Long-term (Month 1)

- 💰 +40% form completion
- 📞 +30% phone calls
- ⭐ Higher quality scores
- 🚀 Better SEO rankings

## Final Notes

The new design system is built to be:

- **Backward compatible**: Existing code continues to work
- **Incrementally adoptable**: Migrate at your own pace
- **Performance focused**: Every component optimized
- **Conversion driven**: Design decisions backed by data

Remember: You don't need to migrate everything at once. Start with high-traffic pages and expand from there.

---

_Migration Guide Version: 1.0.0_
_Last Updated: January 2025_
