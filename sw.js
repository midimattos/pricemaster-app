const CACHE_NAME = 'pricemaster-v1';
const ASSETS = [
  './',
  './index.html',
  './script.js',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  // Usando a versão estável da Lucide para evitar erros de redirecionamento no cache
  'https://unpkg.com/lucide@0.454.1/dist/lucide.min.js'
];

self.addEventListener('install', e => {
  self.skipWaiting(); // Força a atualização imediata
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
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
  self.clients.claim(); // Assume o controle do app na hora
});

// Estratégia "Network First": Tenta buscar o código novo no Vercel. 
// Se o cliente estiver sem internet (offline), o Cache assume instantaneamente.
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});