const CACHE_NAME = "guaiapp-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./logo-guaiapp.png"
];

// Instalación: cache mínimo
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activación
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Fetch: primero cache, luego red
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
