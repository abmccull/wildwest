#!/usr/bin/env node

/**
 * Core Web Vitals Performance Test
 * Tests the optimizations implemented for Wild West Construction
 */

const https = require('https');
const { performance } = require('perf_hooks');

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint (ms)
  TTI: 3800, // Time to Interactive (ms)
  TBT: 300,  // Total Blocking Time (ms)
};

// Performance optimization checklist
const OPTIMIZATION_CHECKLIST = {
  'Font Loading Optimization': {
    description: 'Inter font with proper fallbacks and size-adjust',
    check: () => checkFontOptimization()
  },
  'Critical CSS Inlining': {
    description: 'Above-the-fold styles inlined in head',
    check: () => checkCriticalCSS()
  },
  'Image Preloading': {
    description: 'Critical images preloaded with fetchpriority',
    check: () => checkImagePreloading()
  },
  'Resource Hints': {
    description: 'Preconnect and dns-prefetch for external resources',
    check: () => checkResourceHints()
  },
  'JavaScript Bundle Size': {
    description: 'Code splitting and lazy loading implemented',
    check: () => checkJSOptimization()
  },
  'Third-Party Script Optimization': {
    description: 'Analytics and tracking scripts deferred',
    check: () => checkThirdPartyScripts()
  }
};

async function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let html = '';
      res.on('data', chunk => html += chunk);
      res.on('end', () => resolve(html));
    }).on('error', reject);
  });
}

async function checkFontOptimization() {
  try {
    const html = await fetchHTML(SITE_URL);
    const checks = {
      hasPreloadFont: html.includes('rel="preload"') && html.includes('font/woff2'),
      hasOptimalFallbacks: html.includes('ui-sans-serif') || html.includes('system-ui'),
      hasSizeAdjust: html.includes('size-adjust'),
      hasFontDisplay: html.includes('font-display:swap')
    };
    
    const passed = Object.values(checks).filter(Boolean).length;
    return {
      score: passed / Object.keys(checks).length,
      details: checks,
      passed: passed >= 3
    };
  } catch (error) {
    return { score: 0, error: error.message, passed: false };
  }
}

async function checkCriticalCSS() {
  try {
    const html = await fetchHTML(SITE_URL);
    const checks = {
      hasInlineStyles: html.includes('<style') && html.includes('</style>'),
      hasOptimizedCSS: html.includes('contain:layout') || html.includes('contain: layout'),
      hasCriticalStyles: html.includes('hero-gradient') || html.includes('min-h-hero'),
      hasAsyncCSS: html.includes('media="print"') || html.includes('onload=')
    };
    
    const passed = Object.values(checks).filter(Boolean).length;
    return {
      score: passed / Object.keys(checks).length,
      details: checks,
      passed: passed >= 2
    };
  } catch (error) {
    return { score: 0, error: error.message, passed: false };
  }
}

async function checkImagePreloading() {
  try {
    const html = await fetchHTML(SITE_URL);
    const checks = {
      hasImagePreload: html.includes('rel="preload"') && html.includes('as="image"'),
      hasFetchPriority: html.includes('fetchpriority="high"'),
      hasWebPSupport: html.includes('type="image/webp"'),
      hasResponsiveImages: html.includes('srcset') || html.includes('sizes')
    };
    
    const passed = Object.values(checks).filter(Boolean).length;
    return {
      score: passed / Object.keys(checks).length,
      details: checks,
      passed: passed >= 2
    };
  } catch (error) {
    return { score: 0, error: error.message, passed: false };
  }
}

async function checkResourceHints() {
  try {
    const html = await fetchHTML(SITE_URL);
    const checks = {
      hasPreconnect: html.includes('rel="preconnect"'),
      hasDnsPrefetch: html.includes('rel="dns-prefetch"'),
      hasGoogleFontsPreconnect: html.includes('fonts.googleapis.com'),
      hasAnalyticsPreconnect: html.includes('googletagmanager.com') || html.includes('connect.facebook.net')
    };
    
    const passed = Object.values(checks).filter(Boolean).length;
    return {
      score: passed / Object.keys(checks).length,
      details: checks,
      passed: passed >= 3
    };
  } catch (error) {
    return { score: 0, error: error.message, passed: false };
  }
}

async function checkJSOptimization() {
  try {
    const html = await fetchHTML(SITE_URL);
    const checks = {
      hasLazyLoading: html.includes('lazy(') || html.includes('Suspense'),
      hasCodeSplitting: html.includes('_next/static/chunks/'),
      hasMinifiedJS: html.includes('.min.js') || !html.includes('console.log'),
      hasAsyncScripts: html.includes('strategy="lazyOnload"') || html.includes('defer')
    };
    
    const passed = Object.values(checks).filter(Boolean).length;
    return {
      score: passed / Object.keys(checks).length,
      details: checks,
      passed: passed >= 2
    };
  } catch (error) {
    return { score: 0, error: error.message, passed: false };
  }
}

async function checkThirdPartyScripts() {
  try {
    const html = await fetchHTML(SITE_URL);
    const checks = {
      hasAnalyticsDefer: html.includes('lazyOnload') && html.includes('gtag'),
      hasFacebookPixelDefer: html.includes('fbq') && html.includes('setTimeout'),
      hasRequestIdleCallback: html.includes('requestIdleCallback'),
      hasInteractionBasedLoading: html.includes('mousedown') || html.includes('touchstart')
    };
    
    const passed = Object.values(checks).filter(Boolean).length;
    return {
      score: passed / Object.keys(checks).length,
      details: checks,
      passed: passed >= 2
    };
  } catch (error) {
    return { score: 0, error: error.message, passed: false };
  }
}

function formatScore(score) {
  if (score >= 0.8) return `✅ ${(score * 100).toFixed(1)}%`;
  if (score >= 0.6) return `⚠️  ${(score * 100).toFixed(1)}%`;
  return `❌ ${(score * 100).toFixed(1)}%`;
}

function generateRecommendations(results) {
  const recommendations = [];
  
  Object.entries(results).forEach(([test, result]) => {
    if (!result.passed) {
      switch (test) {
        case 'Font Loading Optimization':
          recommendations.push('Consider adding size-adjust property and optimizing font fallbacks');
          break;
        case 'Critical CSS Inlining':
          recommendations.push('Inline more critical above-the-fold styles in the <head>');
          break;
        case 'Image Preloading':
          recommendations.push('Add fetchpriority="high" to critical images and use WebP format');
          break;
        case 'Resource Hints':
          recommendations.push('Add more preconnect and dns-prefetch hints for external resources');
          break;
        case 'JavaScript Bundle Size':
          recommendations.push('Implement more aggressive code splitting and lazy loading');
          break;
        case 'Third-Party Script Optimization':
          recommendations.push('Defer third-party scripts with interaction-based or idle loading');
          break;
      }
    }
  });
  
  return recommendations;
}

async function runPerformanceTest() {
  console.log('🚀 Wild West Construction - Core Web Vitals Optimization Test');
  console.log('=' .repeat(70));
  console.log(`Testing: ${SITE_URL}`);
  console.log('');

  const results = {};
  const startTime = performance.now();

  // Run all optimization checks
  for (const [testName, testConfig] of Object.entries(OPTIMIZATION_CHECKLIST)) {
    process.stdout.write(`Testing ${testName}... `);
    try {
      results[testName] = await testConfig.check();
      console.log(formatScore(results[testName].score));
    } catch (error) {
      results[testName] = { score: 0, error: error.message, passed: false };
      console.log(`❌ Error: ${error.message}`);
    }
  }

  const endTime = performance.now();
  console.log('');
  console.log('📊 Performance Optimization Summary:');
  console.log('-' .repeat(50));

  let totalScore = 0;
  let totalTests = 0;

  Object.entries(results).forEach(([test, result]) => {
    console.log(`${test}: ${formatScore(result.score)}`);
    if (result.details && Object.keys(result.details).length > 0) {
      Object.entries(result.details).forEach(([check, passed]) => {
        console.log(`  ${passed ? '✓' : '✗'} ${check}`);
      });
    }
    if (result.error) {
      console.log(`  Error: ${result.error}`);
    }
    totalScore += result.score;
    totalTests++;
    console.log('');
  });

  const overallScore = totalScore / totalTests;
  console.log('🎯 Overall Optimization Score:');
  console.log(`${formatScore(overallScore)} (${(overallScore * 100).toFixed(1)}/100)`);
  console.log('');

  // Core Web Vitals expectations
  console.log('🎯 Core Web Vitals Targets:');
  console.log(`• LCP (Largest Contentful Paint): < ${THRESHOLDS.LCP}ms`);
  console.log(`• FID (First Input Delay): < ${THRESHOLDS.FID}ms`);
  console.log(`• CLS (Cumulative Layout Shift): < ${THRESHOLDS.CLS}`);
  console.log('');

  // Generate recommendations
  const recommendations = generateRecommendations(results);
  if (recommendations.length > 0) {
    console.log('💡 Recommendations:');
    recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec}`);
    });
    console.log('');
  }

  // Performance summary
  console.log(`⚡ Test completed in ${(endTime - startTime).toFixed(2)}ms`);
  
  if (overallScore >= 0.8) {
    console.log('🎉 Excellent! Your site is well-optimized for Core Web Vitals.');
  } else if (overallScore >= 0.6) {
    console.log('👍 Good optimization level. Consider implementing the recommendations above.');
  } else {
    console.log('⚠️  Site needs significant optimization work for better Core Web Vitals.');
  }

  // Exit with appropriate code
  process.exit(overallScore >= 0.6 ? 0 : 1);
}

// Run the test
runPerformanceTest().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});