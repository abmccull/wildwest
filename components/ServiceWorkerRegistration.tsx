"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      process.env.NODE_ENV === "production"
    ) {
      // Register service worker
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered successfully:",
            registration.scope,
          );

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed") {
                  if (navigator.serviceWorker.controller) {
                    // New update available
                    showUpdateNotification();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data && event.data.type === "CACHE_UPDATED") {
          console.log("Cache has been updated");
        }
      });

      // Send performance metrics to service worker
      if ("PerformanceObserver" in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                  type: "PERFORMANCE_METRIC",
                  metric: {
                    name: entry.name,
                    value:
                      "value" in entry
                        ? (entry as PerformanceEntry & { value: number }).value
                        : entry.duration,
                    startTime: entry.startTime,
                    entryType: entry.entryType,
                  },
                });
              }
            }
          });

          observer.observe({
            entryTypes: ["navigation", "paint", "largest-contentful-paint"],
          });
        } catch (error) {
          console.warn("PerformanceObserver initialization failed:", error);
        }
      }
    }
  }, []);

  return null;
}

function showUpdateNotification() {
  // Show a subtle update notification
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Wild West Construction Update", {
      body: "A new version is available. Refresh to update.",
      icon: "/images/icon-192x192.png",
      tag: "app-update",
    });
  } else {
    // Show in-app notification as fallback
    const notification = document.createElement("div");
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1e3a8a;
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: system-ui, -apple-system, sans-serif;
        max-width: 300px;
      ">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>New version available!</span>
          <button onclick="location.reload()" style="
            background: #dc2626;
            color: white;
            border: none;
            padding: 4px 12px;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 12px;
          ">
            Refresh
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 10000);
  }
}
