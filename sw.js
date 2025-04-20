self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("lily-cache").then(cache => {
      return cache.addAll([
        "dashboard.html",
        "style.css",
        "main.js",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
