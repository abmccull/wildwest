# Immediate SEO Actions - Start Now

## Hour 1-2: 404 Error Discovery

### Action 1: Identify All 404 Pages
```bash
# Run this script to find all 404s
curl -s https://wildwestslc.com/sitemap.xml | \
  grep -oP '(?<=<loc>)[^<]+' | \
  while read url; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    if [ "$status" = "404" ]; then
      echo "$url - 404"
    fi
  done > 404_errors.txt
```

### Expected 404s to Fix:
Based on URL pattern mismatches, likely broken URLs:
1. `/demolition-salt-lake-city` → `/locations/salt-lake-city/demolition`
2. `/junk-removal-draper` → `/locations/draper/junk-removal`
3. `/flooring-sandy` → `/locations/sandy/flooring`
4. Service-only URLs without location context
5. Old blog URLs that have been moved

---

## Hour 2-3: URL Audit & Canonical Setup

### Action 2: Create Canonical Tag Component
```typescript
// /components/CanonicalTag.tsx
export function CanonicalTag({ path }: { path: string }) {
  const canonicalUrl = `https://wildwestslc.com${path}`;
  return (
    <link rel="canonical" href={canonicalUrl} />
  );
}
```

### Action 3: Define URL Structure
**Recommended Structure**:
```
/ (homepage)
/services/[service-slug] (service pages)
/locations/[city] (location hubs)
/locations/[city]/[service] (location-service pages)
/blog/[post-slug] (blog posts)
/about (static pages)
```

---

## Hour 3-4: Meta Description Templates

### Action 4: Create Meta Description Generator
```typescript
// /lib/meta-descriptions.ts
export function generateMetaDescription(type: string, data: any): string {
  const templates = {
    service: `Professional ${data.service} services in Utah. ${data.description}. Free quotes, licensed & insured. Call Wild West Construction today!`,
    location: `${data.service} services in ${data.city}, UT. Local experts, competitive pricing, same-day service available. Wild West Construction - Your trusted partner.`,
    blog: `${data.excerpt}. Read our expert guide on ${data.topic} for Utah homeowners.`,
    static: data.customDescription || `Wild West Construction - Utah's premier demolition, junk removal, and flooring company. Serving Salt Lake City and surrounding areas since 2020.`
  };
  
  return templates[type].substring(0, 160);
}
```

---

## Hour 4-5: Quick Schema Implementation

### Action 5: Add LocalBusiness Schema
```typescript
// /components/schema/LocalBusinessSchema.tsx
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Wild West Construction",
  "image": "https://wildwestslc.com/images/logo.png",
  "url": "https://wildwestslc.com",
  "telephone": "+1-801-xxx-xxxx",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Your Street Address",
    "addressLocality": "Salt Lake City",
    "addressRegion": "UT",
    "postalCode": "84101",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.7608,
    "longitude": -111.8910
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.facebook.com/wildwestconstruction",
    "https://www.instagram.com/wildwestconstruction"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 40.7608,
      "longitude": -111.8910
    },
    "geoRadius": "50000"
  }
};
```

---

## Hour 5-6: Internal Linking Quick Wins

### Action 6: Add Related Services Component
```typescript
// /components/RelatedServices.tsx
export function RelatedServices({ currentService, location }: Props) {
  const relatedServices = {
    'demolition': ['junk-removal', 'flooring'],
    'junk-removal': ['demolition', 'estate-cleanout'],
    'flooring': ['demolition', 'renovation']
  };
  
  return (
    <section className="related-services">
      <h2>Related Services in {location}</h2>
      <ul>
        {relatedServices[currentService].map(service => (
          <li key={service}>
            <Link href={`/locations/${location}/${service}`}>
              {service.replace('-', ' ').toTitleCase()} in {location}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

---

## Day 1 End-of-Day Checklist

### Must Complete:
- [ ] List of all 404 errors documented
- [ ] Redirect map created (old URL → new URL)
- [ ] Canonical tag component ready
- [ ] Meta description templates defined
- [ ] Basic schema markup implemented

### Should Complete:
- [ ] First batch of redirects tested
- [ ] 10 high-value pages with updated meta descriptions
- [ ] Internal linking component created
- [ ] Performance baseline measured

### Nice to Have:
- [ ] Blog post schema added
- [ ] Breadcrumb component started
- [ ] Image optimization audit begun

---

## Quick Deployment Commands

### 1. Test Redirects Locally:
```bash
npm run dev
# Test each redirect from 404_errors.txt
```

### 2. Validate Schema Markup:
```bash
# Copy schema JSON to Google Rich Results Test
# https://search.google.com/test/rich-results
```

### 3. Check Current Indexation:
```bash
# In Google Search Console
site:wildwestslc.com
# Note current count
```

### 4. Submit Updated Sitemap:
```bash
# After fixes, resubmit in GSC
https://wildwestslc.com/sitemaps/index
```

---

## Monitoring Commands

### Check 404s in Real-time:
```bash
tail -f /var/log/nginx/access.log | grep " 404 "
```

### Monitor Googlebot Activity:
```bash
grep "Googlebot" /var/log/nginx/access.log | tail -20
```

### Track Indexation Progress:
```javascript
// Add to page footer temporarily
if (typeof window !== 'undefined') {
  fetch('/api/track-indexation', {
    method: 'POST',
    body: JSON.stringify({
      url: window.location.href,
      timestamp: new Date().toISOString()
    })
  });
}
```

---

## Emergency Rollback Plan

If any changes cause issues:

### 1. Revert Redirects:
```bash
git checkout HEAD~1 middleware.ts
npm run build && npm run deploy
```

### 2. Remove Schema if Errors:
```bash
# Comment out schema in layout.tsx
git commit -m "Temporary schema removal"
git push
```

### 3. Restore Previous Sitemap:
```bash
git checkout HEAD~1 app/sitemaps/
npm run build && npm run deploy
```

---

## Success Indicators (Day 1)

### Green Flags:
- ✅ No new 404s appearing
- ✅ Redirects working (test 5 random ones)
- ✅ Schema validates in Rich Results Test
- ✅ Meta descriptions appearing in view-source
- ✅ No performance degradation

### Red Flags:
- ❌ 500 errors after deployment
- ❌ Dramatic traffic drop
- ❌ Search Console errors spike
- ❌ Core Web Vitals degradation
- ❌ Infinite redirect loops

---

## Next Agent Activation Schedule

### Day 2 Morning (9 AM):
- Activate Content Generation Agent
- Begin location-service page creation
- Start with top 10 cities

### Day 2 Afternoon (2 PM):
- Activate Performance Agent
- Implement image lazy loading
- Optimize JavaScript bundles

### Day 3 Morning (9 AM):
- Scale content generation to 50 cities
- Implement breadcrumbs site-wide
- Add FAQ schema to relevant pages

---

## Contact for Escalation

### Level 1 Issues (Can wait 4 hours):
- Minor 404s discovered
- Single page not indexing
- Small performance dips

### Level 2 Issues (Need attention within 1 hour):
- Multiple redirect failures
- Schema validation errors
- Significant CLS issues

### Level 3 Issues (IMMEDIATE):
- Site down
- Mass deindexation
- Google Search Console manual action
- Complete crawler blocking

---

*Document Created: 2025-08-14*
*First Actions Due: Within 2 hours*
*Full Day 1 Completion: By EOD*
*Success Metric: 50+ pages indexed by Day 3*