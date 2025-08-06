// Service Worker for Wild West Construction
// Implements caching strategies for optimal Core Web Vitals

const CACHE_NAME = "wildwest-construction-v1";
const STATIC_CACHE_NAME = "wildwest-static-v1";
const DYNAMIC_CACHE_NAME = "wildwest-dynamic-v1";

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
            cacheName !== DYNAMIC_CACHE_NAME
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

  // Skip cross-origin requests (except for fonts and images)
  if (
    url.origin !== location.origin &&
    !url.pathname.includes("fonts") &&
    !request.destination.includes("image")
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
    request.url.includes("/api/") ||
    request.url.includes("analytics") ||
    request.url.includes("gtag")
  );
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
