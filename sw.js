const CACHE_NAME = 'lily-cache-v1';
const STATIC_ASSETS = [
  '/', 
  '/index.html', 
  '/dashboard.html',
  '/style.css', 
  '/main.js', 
  '/functions/brain.js',
  '/manifest.json', 
  '/lilylogo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(request)
        .then(cached => cached || fetch(request))
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then(response => response)
      .catch(() => caches.match(request))
  );
});
