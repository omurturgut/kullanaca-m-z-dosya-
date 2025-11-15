// Advanced Service Worker for Posthumane
// Version: 2.0.0
// Enterprise-grade caching with multiple strategies

const CACHE_VERSION = 'v2.0.0';
const CACHE_NAMES = {
  static: `posthumane-static-${CACHE_VERSION}`,
  dynamic: `posthumane-dynamic-${CACHE_VERSION}`,
  images: `posthumane-images-${CACHE_VERSION}`,
  fonts: `posthumane-fonts-${CACHE_VERSION}`
};

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/js/translations.js',
  '/js/monitoring.js',
  '/js/feature-detection.js',
  '/manifest.json',
  '/offline.html'
];

const CACHE_TIMEOUT = 3000; // 3 seconds timeout for network requests

// ========== INSTALL EVENT ==========
self.addEventListener('install', event => {
  console.log('[SW] Installing service worker v2.0.0...');

  event.waitUntil(
    caches.open(CACHE_NAMES.static)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(url => {
          // Skip non-existent files
          return !url.includes('monitoring.js') && !url.includes('feature-detection.js') && !url.includes('offline.html');
        })).catch(err => {
          console.warn('[SW] Some assets failed to cache:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// ========== ACTIVATE EVENT ==========
self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker v2.0.0...');

  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              // Delete old caches
              return cacheName.startsWith('posthumane-') &&
                     !Object.values(CACHE_NAMES).includes(cacheName);
            })
            .map(cacheName => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// ========== FETCH EVENT WITH ADVANCED STRATEGIES ==========
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests (except fonts and images from CDN)
  if (url.origin !== location.origin &&
      !url.hostname.includes('fonts.gstatic.com') &&
      !url.hostname.includes('i.ibb.co')) {
    return;
  }

  // Strategy: Cache-First for fonts
  if (request.destination === 'font' || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(cacheFirst(request, CACHE_NAMES.fonts));
    return;
  }

  // Strategy: Cache-First for images
  if (request.destination === 'image' || url.hostname.includes('i.ibb.co')) {
    event.respondWith(cacheFirst(request, CACHE_NAMES.images));
    return;
  }

  // Strategy: Stale-While-Revalidate for CSS/JS
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(staleWhileRevalidate(request, CACHE_NAMES.static));
    return;
  }

  // Strategy: Network-First with timeout for HTML
  if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirstWithTimeout(request, CACHE_NAMES.dynamic));
    return;
  }

  // Default: Network-First
  event.respondWith(networkFirstWithTimeout(request, CACHE_NAMES.dynamic));
});

// ========== CACHING STRATEGIES ==========

// Cache-First Strategy (best for static assets)
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache-First failed:', error);
    throw error;
  }
}

// Stale-While-Revalidate Strategy (best for CSS/JS)
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  // Fetch new version in background
  const fetchPromise = fetch(request)
    .then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(err => {
      console.warn('[SW] Background fetch failed:', err);
      return null;
    });

  // Return cached version immediately, or wait for network
  return cachedResponse || fetchPromise;
}

// Network-First with Timeout Strategy (best for HTML/API)
async function networkFirstWithTimeout(request, cacheName, timeout = CACHE_TIMEOUT) {
  const cache = await caches.open(cacheName);

  try {
    // Race between fetch and timeout
    const response = await Promise.race([
      fetch(request),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), timeout)
      )
    ]);

    // Cache successful responses
    if (response.ok) {
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    console.warn('[SW] Network request failed/timeout:', error.message);

    // Try to serve from cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving from cache (offline mode)');
      return cachedResponse;
    }

    // If it's a document request, serve offline page
    if (request.destination === 'document') {
      const offlinePage = await cache.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }

    // If timeout, return 504 Gateway Timeout
    if (error.message === 'timeout') {
      return new Response('Network timeout', {
        status: 504,
        statusText: 'Gateway Timeout',
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Network error
    return new Response('Network error', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// ========== BACKGROUND SYNC ==========
self.addEventListener('sync', event => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'sync-analytics') {
    event.waitUntil(syncAnalytics());
  }

  if (event.tag === 'sync-forms') {
    event.waitUntil(syncFormData());
  }
});

async function syncAnalytics() {
  console.log('[SW] Syncing analytics...');
  // Implement analytics sync from IndexedDB
  try {
    // Placeholder for analytics sync logic
    return Promise.resolve();
  } catch (error) {
    console.error('[SW] Analytics sync failed:', error);
    throw error;
  }
}

async function syncFormData() {
  console.log('[SW] Syncing form data...');
  // Implement form data sync from IndexedDB
  try {
    // Placeholder for form sync logic
    return Promise.resolve();
  } catch (error) {
    console.error('[SW] Form sync failed:', error);
    throw error;
  }
}

// ========== PUSH NOTIFICATIONS ==========
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};

  const options = {
    body: data.body || 'New update from Posthumane',
    icon: '/images/icon-192x192.png',
    badge: '/images/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: data.id || 1,
      url: data.url || '/'
    },
    actions: [
      {
        action: 'open',
        title: 'View',
        icon: '/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/xmark.png'
      }
    ],
    requireInteraction: false,
    tag: data.tag || 'posthumane-notification'
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Posthumane', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'open') {
    const urlToOpen = event.notification.data?.url || '/';
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUnmatched: true })
        .then(clientList => {
          // Focus existing window if available
          for (let client of clientList) {
            if (client.url === urlToOpen && 'focus' in client) {
              return client.focus();
            }
          }
          // Open new window
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
    );
  }
});

// ========== MESSAGE HANDLER ==========
self.addEventListener('message', event => {
  console.log('[SW] Message received:', event.data);

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }

  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
});

console.log('[SW] Advanced Service Worker v2.0.0 loaded successfully');
