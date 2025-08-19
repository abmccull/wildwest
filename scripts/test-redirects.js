#!/usr/bin/env node

// Test redirect logic to identify loops

const SERVICE_REDIRECTS = {
  'hardwood-flooring': 'hardwood-floor-installation',
  'vinyl-flooring': 'vinyl-plank-installation',
  'laminate-flooring': 'laminate-installation',
  'construction-cleanup': 'construction-debris-removal',
  'bathroom-remodel': 'bathroom-remodeling',
  'kitchen-remodel': 'kitchen-remodeling',
};

const VALID_CITIES = [
  'west-valley-city',
  'south-salt-lake',
  'draper',
  'south-jordan',
  'midvale',
  'cottonwood-heights',
  'taylorsville',
  'sandy',
  'riverton',
  'holladay',
  'murray',
  'west-jordan',
  'herriman',
  'bluffdale',
];

function simulateMiddleware(pathname) {
  console.log(`\n=== Testing: ${pathname} ===`);
  const redirects = [];
  let currentPath = pathname;
  let iterations = 0;
  const maxIterations = 10;

  while (iterations < maxIterations) {
    iterations++;
    console.log(`\nIteration ${iterations}: ${currentPath}`);

    // Handle old /locations/ URLs
    const locationsMatch = currentPath.match(/^\/locations\/([a-z-]+)\/([a-z-]+)\/?$/);
    if (locationsMatch) {
      const [, city, service] = locationsMatch;
      const newPath = `/${city}-ut/${service}/`;
      console.log(`  -> Locations redirect to: ${newPath}`);
      redirects.push({ from: currentPath, to: newPath, reason: 'locations pattern' });
      currentPath = newPath;
      continue;
    }

    // Check malformed city URL without -ut suffix
    const malformedMatch = currentPath.match(/^\/([a-z-]+)\/?$/);
    if (malformedMatch) {
      const fullSlug = malformedMatch[1];
      console.log(`  -> Malformed match: ${fullSlug}`);

      // Skip if it already ends with -ut (valid city page)
      if (fullSlug.endsWith('-ut')) {
        console.log(`  -> Already ends with -ut`);
        if (!currentPath.endsWith('/')) {
          const newPath = currentPath + '/';
          console.log(`  -> Add trailing slash: ${newPath}`);
          redirects.push({ from: currentPath, to: newPath, reason: 'add trailing slash to city' });
          currentPath = newPath;
          continue;
        }
        console.log(`  -> Valid city page, NextResponse.next()`);
        break;
      }

      // Check if this matches any valid cities at the start
      for (const city of VALID_CITIES) {
        if (fullSlug.startsWith(city + '-')) {
          const servicePartStart = city.length + 1;
          const servicePart = fullSlug.substring(servicePartStart);
          if (servicePart) {
            const newPath = `/${city}-ut/${servicePart}/`;
            console.log(`  -> Redirect malformed to: ${newPath}`);
            redirects.push({ from: currentPath, to: newPath, reason: 'malformed city-service' });
            currentPath = newPath;
            break;
          }
        }
      }
      if (currentPath !== malformedMatch.input) continue;
    }

    // Check city/service URL pattern with -ut suffix
    const match = currentPath.match(/^\/([a-z-]+-ut)\/([a-z-]+)\/?$/);
    if (match) {
      const [, city, service] = match;
      console.log(`  -> City/service match: ${city} / ${service}`);

      // Check if service needs redirect
      if (SERVICE_REDIRECTS[service] && SERVICE_REDIRECTS[service] !== service) {
        const newPath = `/${city}/${SERVICE_REDIRECTS[service]}/`;
        console.log(`  -> Service redirect to: ${newPath}`);
        redirects.push({ from: currentPath, to: newPath, reason: 'service redirect' });
        currentPath = newPath;
        continue;
      }

      // Ensure trailing slash
      if (!currentPath.endsWith('/')) {
        const newPath = currentPath + '/';
        console.log(`  -> Add trailing slash: ${newPath}`);
        redirects.push({ from: currentPath, to: newPath, reason: 'add trailing slash to service' });
        currentPath = newPath;
        continue;
      }

      console.log(`  -> Valid service page, NextResponse.next()`);
      break;
    }

    console.log(`  -> No pattern matched, NextResponse.next()`);
    break;
  }

  if (iterations >= maxIterations) {
    console.log('\n❌ REDIRECT LOOP DETECTED!');
  }

  if (redirects.length > 0) {
    console.log('\nRedirect chain:');
    redirects.forEach((r, i) => {
      console.log(`  ${i + 1}. ${r.from} -> ${r.to} (${r.reason})`);
    });
  }

  return { redirects, loopDetected: iterations >= maxIterations };
}

// Test cases
const testUrls = [
  '/holladay-ut/',
  '/holladay-ut',
  '/millcreek-ut/interior-demolition/',
  '/millcreek-ut/interior-demolition',
  '/sandy-ut/junk-removal-service/',
  '/sandy-ut/junk-removal-service',
  '/draper-ut/flooring-installation/',
  '/draper-ut/flooring-installation',
  '/sandy-ut/junk-removal/',
  '/draper-ut/flooring/',
  '/millcreek-ut/demolition/',
];

console.log('Testing redirect logic for potential loops...\n');

const results = testUrls.map(url => ({
  url,
  ...simulateMiddleware(url)
}));

console.log('\n\n=== SUMMARY ===');
console.log('URLs with redirect loops:');
results.filter(r => r.loopDetected).forEach(r => {
  console.log(`  ❌ ${r.url}`);
});

console.log('\nURLs without loops:');
results.filter(r => !r.loopDetected).forEach(r => {
  console.log(`  ✅ ${r.url} (${r.redirects.length} redirects)`);
});