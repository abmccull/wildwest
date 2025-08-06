// Test script for analytics optimization
// This script tests the lazy loading and functionality of optimized analytics

console.log('🧪 Starting Analytics Optimization Test...');

// Test 1: Verify lazy loading behavior
function testLazyLoading() {
  console.log('📊 Test 1: Lazy Loading Behavior');
  
  // Check if scripts are initially not loaded
  const initialGtagCheck = !!window.gtag;
  const initialFbqCheck = !!window.fbq;
  
  console.log('Initial state:');
  console.log(`- gtag exists: ${initialGtagCheck}`);
  console.log(`- fbq exists: ${initialFbqCheck}`);
  
  // Simulate user interaction
  console.log('🖱️ Simulating user interaction...');
  document.dispatchEvent(new Event('mousedown'));
  
  // Wait and check if scripts start loading
  setTimeout(() => {
    const scriptsInHead = document.head.querySelectorAll('script[src*="googletagmanager"], script[src*="fbevents"]');
    console.log(`Scripts found after interaction: ${scriptsInHead.length}`);
    
    setTimeout(() => {
      console.log('Post-load state:');
      console.log(`- gtag exists: ${!!window.gtag}`);
      console.log(`- fbq exists: ${!!window.fbq}`);
    }, 2000);
  }, 500);
}

// Test 2: Verify tracking functionality
function testTrackingFunctionality() {
  console.log('📈 Test 2: Tracking Functionality');
  
  // Wait for scripts to load then test tracking
  setTimeout(() => {
    if (window.gtag) {
      console.log('✅ gtag loaded, testing event tracking...');
      window.gtag('event', 'test_event', {
        event_category: 'Test',
        event_label: 'Optimization Test',
        value: 1
      });
      console.log('✅ gtag event sent');
    } else {
      console.log('❌ gtag not loaded');
    }
    
    if (window.fbq) {
      console.log('✅ fbq loaded, testing event tracking...');
      window.fbq('track', 'CustomEvent', {
        content_name: 'Optimization Test',
        value: 1,
        currency: 'USD'
      });
      console.log('✅ fbq event sent');
    } else {
      console.log('❌ fbq not loaded');
    }
  }, 3000);
}

// Test 3: Performance measurement
function testPerformanceImpact() {
  console.log('⚡ Test 3: Performance Impact');
  
  const startTime = performance.now();
  
  // Measure time to first interaction
  document.addEventListener('mousedown', function measureInteraction() {
    const interactionTime = performance.now();
    console.log(`Time to first interaction: ${(interactionTime - startTime).toFixed(2)}ms`);
    document.removeEventListener('mousedown', measureInteraction);
  }, { once: true });
  
  // Check resource loading
  const checkResourceLoading = () => {
    const entries = performance.getEntriesByType('resource');
    const analyticsEntries = entries.filter(entry => 
      entry.name.includes('googletagmanager') || 
      entry.name.includes('fbevents') ||
      entry.name.includes('connect.facebook.net')
    );
    
    console.log('Analytics resources loaded:');
    analyticsEntries.forEach(entry => {
      console.log(`- ${entry.name}: ${entry.duration.toFixed(2)}ms load time`);
    });
  };
  
  // Check after delay to catch lazy-loaded resources
  setTimeout(checkResourceLoading, 5000);
}

// Test 4: Network optimization
function testNetworkOptimization() {
  console.log('🌐 Test 4: Network Optimization');
  
  // Check preconnect hints
  const preconnects = document.querySelectorAll('link[rel="preconnect"]');
  const dnsPrefetches = document.querySelectorAll('link[rel="dns-prefetch"]');
  
  console.log(`Preconnect hints: ${preconnects.length}`);
  console.log(`DNS prefetch hints: ${dnsPrefetches.length}`);
  
  Array.from(preconnects).forEach(link => {
    console.log(`- Preconnect: ${link.href}`);
  });
  
  Array.from(dnsPrefetches).forEach(link => {
    console.log(`- DNS Prefetch: ${link.href}`);
  });
}

// Test 5: Service Worker caching
function testServiceWorkerCaching() {
  console.log('💾 Test 5: Service Worker Caching');
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      console.log('Service Worker active');
      
      // Test cache after analytics scripts load
      setTimeout(() => {
        caches.keys().then(cacheNames => {
          console.log('Available caches:', cacheNames);
          
          // Check analytics cache specifically
          caches.open('wildwest-analytics-v1').then(cache => {
            cache.keys().then(keys => {
              const analyticsKeys = keys.filter(key => 
                key.url.includes('googletagmanager') || 
                key.url.includes('fbevents') ||
                key.url.includes('connect.facebook.net')
              );
              console.log(`Analytics scripts cached: ${analyticsKeys.length}`);
              analyticsKeys.forEach(key => {
                console.log(`- Cached: ${key.url}`);
              });
            });
          });
        });
      }, 6000);
    });
  } else {
    console.log('Service Worker not supported');
  }
}

// Run all tests
function runAllTests() {
  console.log('🚀 Running all analytics optimization tests...');
  
  testLazyLoading();
  testPerformanceImpact();
  testNetworkOptimization();
  testServiceWorkerCaching();
  
  // Test tracking functionality after delay
  setTimeout(testTrackingFunctionality, 1000);
  
  console.log('📋 Test Summary will appear in 10 seconds...');
  setTimeout(() => {
    console.log('🏁 Analytics Optimization Test Complete!');
    console.log('Check the console logs above for detailed results.');
  }, 10000);
}

// Auto-run tests when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runAllTests);
} else {
  runAllTests();
}

// Export for manual testing
window.analyticsOptimizationTest = {
  runAll: runAllTests,
  testLazyLoading,
  testTrackingFunctionality,
  testPerformanceImpact,
  testNetworkOptimization,
  testServiceWorkerCaching
};

console.log('🛠️ Analytics optimization test utilities available at window.analyticsOptimizationTest');