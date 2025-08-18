const CACHE_NAME = 'CECyTEQ-cache';
const urlsToCache = [
  '/html/index.html',
  '/html/credencial.html',
  '/html/login.html',
  '/html/privacy.html',
  '/manifest.json',
  '/main.js',
  '/library/icon.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache.map(url => {
          return fetch(url).then(resp => {
            if (!resp.ok) {
              throw new Error(`Fallo al cargar ${url} - Status: ${resp.status}`);
            }
            return url;
          });
        })).then(urls => {
          return cache.addAll(urls);
        });
      })
      .catch(err => {
        console.error('Error al cachear:', err);
      })
  );
});


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
