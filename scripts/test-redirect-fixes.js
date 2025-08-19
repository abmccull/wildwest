#!/usr/bin/env node

const https = require('https');
const http = require('http');

// Test URLs that were causing redirect loops
const TEST_URLS = [
  'https://wildwestslc.com/holladay-ut/',
  'https://wildwestslc.com/millcreek-ut/interior-demolition/',
  'https://wildwestslc.com/sandy-ut/junk-removal-service/',
  'https://wildwestslc.com/draper-ut/flooring-installation/',
  'https://wildwestslc.com/murray-ut/',
  'https://wildwestslc.com/draper-ut/bathroom-remodeling/',
];

function testRedirects(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    const redirectChain = [];
    let currentUrl = url;
    let redirectCount = 0;

    function makeRequest(urlToTest) {
      const urlObj = new URL(urlToTest);
      const client = urlObj.protocol === 'https:' ? https : http;
      
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + urlObj.search,
        method: 'HEAD',
        headers: {
          'User-Agent': 'Redirect Test Script'
        }
      };

      const req = client.request(options, (res) => {
        const info = {
          url: urlToTest,
          statusCode: res.statusCode,
          location: res.headers.location,
          timestamp: new Date().toISOString()
        };
        
        redirectChain.push(info);
        
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          redirectCount++;
          
          if (redirectCount >= maxRedirects) {
            resolve({
              success: false,
              error: 'Too many redirects',
              redirectChain,
              maxRedirects
            });
            return;
          }
          
          // Handle relative redirects
          let nextUrl = res.headers.location;
          if (!nextUrl.startsWith('http')) {
            const baseUrl = new URL(urlToTest);
            nextUrl = new URL(nextUrl, baseUrl).toString();
          }
          
          // Check for redirect loops
          const previousUrls = redirectChain.map(r => r.url);
          if (previousUrls.includes(nextUrl)) {
            resolve({
              success: false,
              error: 'Redirect loop detected',
              redirectChain,
              loopUrl: nextUrl
            });
            return;
          }
          
          setTimeout(() => makeRequest(nextUrl), 100); // Small delay between requests
        } else {
          resolve({
            success: true,
            finalStatusCode: res.statusCode,
            redirectChain,
            totalRedirects: redirectCount
          });
        }
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.end();
    }

    makeRequest(currentUrl);
  });
}

async function runTests() {
  console.log('🔄 Testing redirect behavior after fixes...\n');
  
  let passedTests = 0;
  let failedTests = 0;
  
  for (const url of TEST_URLS) {
    console.log(`Testing: ${url}`);
    
    try {
      const result = await testRedirects(url);
      
      if (result.success) {
        console.log(`✅ PASS - Final status: ${result.finalStatusCode}, Redirects: ${result.totalRedirects}`);
        if (result.totalRedirects > 0) {
          console.log(`   Redirect chain:`);
          result.redirectChain.forEach((step, index) => {
            console.log(`   ${index + 1}. ${step.statusCode} ${step.url} → ${step.location || 'END'}`);
          });
        }
        passedTests++;
      } else {
        console.log(`❌ FAIL - ${result.error}`);
        console.log(`   Redirect chain:`);
        result.redirectChain.forEach((step, index) => {
          console.log(`   ${index + 1}. ${step.statusCode} ${step.url} → ${step.location || 'END'}`);
        });
        if (result.loopUrl) {
          console.log(`   Loop detected at: ${result.loopUrl}`);
        }
        failedTests++;
      }
    } catch (error) {
      console.log(`❌ ERROR - ${error.message}`);
      failedTests++;
    }
    
    console.log(''); // Empty line for readability
  }
  
  console.log(`\n📊 Test Summary:`);
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`📈 Success Rate: ${((passedTests / TEST_URLS.length) * 100).toFixed(1)}%`);
  
  if (failedTests === 0) {
    console.log('\n🎉 All tests passed! Redirect loops have been fixed.');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Please review the redirect logic.');
    process.exit(1);
  }
}

runTests().catch(error => {
  console.error('Script error:', error);
  process.exit(1);
});