const CACHE_NAME = 'pricemaster-v2'; // [Ajuste]: Versão atualizada para forçar novo cache
const ASSETS = [
  './',
  './index.html',
  './script.js',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@0.454.1/dist/lucide.min.js'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // [Ajuste]: Promise.allSettled evita que o cache falhe se um arquivo demorar a responder
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url))
      );
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// [Ajuste]: Estratégia Network-First otimizada
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .catch(() => caches.match(e.request))
  );
});