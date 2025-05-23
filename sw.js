self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('lily-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/dashboard.html',
        '/style.css',
        '/main.js',
        '/manifest.json',
        '/icons/lily-logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
