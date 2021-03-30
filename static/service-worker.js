const offlinePage = 'offline.html'
const cacheName = 'cache-v1'
const cacheURLs = [
  './service-worker.js',
  './manifest.json',
  './funny.html',
  './gaming.html',
  './index.html',
  './music.html',
  './pics.html',
  './askreddit.html',
  './offline.html',
  './css/homepage.css',
  './css/detailpage.css',
  './scripts/main.js'
]

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js', {
    scope: '.'
  }).then(function (registration) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    initialCache();
  }, function (err) {
    console.log('ServiceWorker registration failed: ', err);
  });
}

async function initialCache() {
  console.log('init')
  const cache = await caches.open(cacheName)

  cacheURLs.map(key => cache.add(key));
}

self.ononline = function () {
  console.log('Your worker is now online');
}

self.onoffline = function (e) {
  console.log('Your worker is now offline');
}


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
      }).catch(error => {
        return caches.match(offlinePage);
      })
  );
});

self.addEventListener('activate', e => {
  self.clients.claim();
  self.skipWaiting();
})
