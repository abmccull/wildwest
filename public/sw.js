// Service Worker for Wild West Construction
// Implements caching strategies for optimal Core Web Vitals
// Enhanced with third-party script optimization

const CACHE_NAME = "wildwest-construction-v3";
const STATIC_CACHE_NAME = "wildwest-static-v3";
const DYNAMIC_CACHE_NAME = "wildwest-dynamic-v3";
const ANALYTICS_CACHE_NAME = "wildwest-analytics-v2";
const THIRD_PARTY_CACHE_NAME = "wildwest-third-party-v1";

// Assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/images/icon-192x192.png",
  "/images/icon-512x512.png",
];

// Install event - cache critical assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    }),
  );
  self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName !== STATIC_CACHE_NAME &&
            cacheName !== DYNAMIC_CACHE_NAME &&
            cacheName !== ANALYTICS_CACHE_NAME &&
            cacheName !== THIRD_PARTY_CACHE_NAME
          ) {
            console.log("Service Worker: Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Handle third-party analytics scripts with caching strategy
  if (isAnalyticsScript(request)) {
    event.respondWith(handleAnalyticsRequest(request));
    return;
  }

  // Skip other cross-origin requests (except for fonts and images)
  if (
    url.origin !== location.origin &&
    !url.pathname.includes("fonts") &&
    !request.destination.includes("image") &&
    !isAnalyticsScript(request)
  ) {
    return;
  }

  event.respondWith(
    (async () => {
      // Strategy 1: Cache First for static assets
      if (isStaticAsset(request)) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(STATIC_CACHE_NAME);
          cache.put(request, response.clone());
        }
        return response;
      }

      // Strategy 2: Network First for HTML pages and API calls
      if (isNetworkFirst(request)) {
        try {
          const response = await fetch(request);
          if (response.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, response.clone());
          }
          return response;
        } catch (error) {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Return offline page for HTML requests
          if (request.destination === "document") {
            return (
              caches.match("/offline.html") ||
              new Response("Offline", { status: 503 })
            );
          }
          throw error;
        }
      }

      // Strategy 3: Stale While Revalidate for images and other resources
      const cachedResponse = await caches.match(request);
      const fetchPromise = fetch(request).then((response) => {
        if (response.ok) {
          const cache = caches.open(DYNAMIC_CACHE_NAME);
          cache.then((c) => c.put(request, response.clone()));
        }
        return response;
      });

      return cachedResponse || fetchPromise;
    })(),
  );
});

// Helper functions
function isStaticAsset(request) {
  return (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "manifest" ||
    request.url.includes("/_next/static/") ||
    request.url.includes("/fonts/") ||
    request.url.includes(".woff") ||
    request.url.includes(".woff2")
  );
}

function isNetworkFirst(request) {
  return (
    request.destination === "document" ||
    request.url.includes("/api/")
  );
}

// Analytics script detection
function isAnalyticsScript(request) {
  const url = new URL(request.url);
  return (
    url.hostname.includes("googletagmanager.com") ||
    url.hostname.includes("google-analytics.com") ||
    url.hostname.includes("connect.facebook.net") ||
    url.hostname.includes("facebook.com") ||
    url.hostname.includes("doubleclick.net") ||
    url.hostname.includes("google.com/recaptcha") ||
    url.pathname.includes("gtag/js") ||
    url.pathname.includes("fbevents.js") ||
    url.pathname.includes("/tr")
  );
}

// Optimized analytics request handling with extended caching
async function handleAnalyticsRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Check if we have a cached version
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      // Check cache age
      const cachedDate = new Date(cachedResponse.headers.get('date'));
      const cacheAge = Date.now() - cachedDate.getTime();
      const maxAge = getMaxAgeForScript(url);
      
      // If cache is still fresh, return it immediately
      if (cacheAge < maxAge) {
        return cachedResponse;
      }
      
      // Cache is stale, update in background
      const fetchPromise = fetch(request)
        .then(response => {
          if (response.ok) {
            const responseToCache = response.clone();
            const modifiedResponse = new Response(responseToCache.body, {
              status: responseToCache.status,
              statusText: responseToCache.statusText,
              headers: new Headers(responseToCache.headers)
            });
            
            // Add custom cache headers
            modifiedResponse.headers.set('sw-cache-date', new Date().toISOString());
            modifiedResponse.headers.set('cache-control', `max-age=${maxAge / 1000}`);
            
            caches.open(ANALYTICS_CACHE_NAME)
              .then(cache => cache.put(request, modifiedResponse));
          }
          return response;
        })
        .catch(error => {
          console.log('Analytics script background update failed:', error);
        });
      
      // Return stale cache while updating
      return cachedResponse;
    }
    
    // No cache, fetch and cache
    const response = await fetch(request);
    if (response.ok) {
      const responseToCache = response.clone();
      const modifiedResponse = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: new Headers(responseToCache.headers)
      });
      
      // Add custom cache headers
      const maxAge = getMaxAgeForScript(url);
      modifiedResponse.headers.set('sw-cache-date', new Date().toISOString());
      modifiedResponse.headers.set('cache-control', `max-age=${maxAge / 1000}`);
      
      const cache = await caches.open(ANALYTICS_CACHE_NAME);
      cache.put(request, modifiedResponse);
    }
    return response;
    
  } catch (error) {
    // Return cached version if network fails
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // For analytics, fail silently to not break the page
    return new Response('', { status: 204 });
  }
}

// Get appropriate cache duration for different scripts
function getMaxAgeForScript(url) {
  // Facebook scripts - cache for 24 hours
  if (url.hostname.includes('facebook') || url.pathname.includes('fbevents')) {
    return 24 * 60 * 60 * 1000; // 24 hours
  }
  
  // Google Tag Manager - cache for 1 hour
  if (url.hostname.includes('googletagmanager')) {
    return 60 * 60 * 1000; // 1 hour
  }
  
  // Google Analytics - cache for 2 hours
  if (url.hostname.includes('google-analytics')) {
    return 2 * 60 * 60 * 1000; // 2 hours
  }
  
  // Default cache for 12 hours
  return 12 * 60 * 60 * 1000; // 12 hours
}

// Background sync for form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "lead-form-sync") {
    event.waitUntil(syncLeadForms());
  }
});

async function syncLeadForms() {
  // Implement background sync for lead forms
  console.log("Service Worker: Syncing lead forms...");
}

// Push notification handler
self.addEventListener("push", (event) => {
  if (event.data) {
    const options = {
      body: event.data.text(),
      icon: "/images/icon-192x192.png",
      badge: "/images/icon-72x72.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: "1",
      },
      actions: [
        {
          action: "explore",
          title: "Get Quote",
          icon: "/images/checkmark.png",
        },
        {
          action: "close",
          title: "Close",
          icon: "/images/xmark.png",
        },
      ],
    };

    event.waitUntil(
      self.registration.showNotification("Wild West Construction", options),
    );
  }
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/quote"));
  }
});

// Performance monitoring
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "PERFORMANCE_METRIC") {
    console.log("Performance metric received:", event.data.metric);
  }
});
