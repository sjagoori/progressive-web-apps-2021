const offlinePage = 'offline.html'
const cacheName = 'cache-v1'
const cacheURLs = [
  './funny.html',
  './gaming.html',
  './index.html',
  './music.html',
  './pics.html',
  './askreddit.html',
  './offline.html',
  './css/homepage.css',
  './css/detailpage.css'
]


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js', {
    scope: '.' // <--- THIS BIT IS REQUIRED
  }).then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    initialCache();
  }, function (err) {
    // registration failed :(
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
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
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

// self.addEventListener('fetch', async (e) =>{
//   const req = e.request;
//   const url = new URL(req.url)

//   const cache = await caches.open(cacheName)
//   cache.addAll(cacheURLs)

//   if (url.orgin == location.origin){
//     e.respondWith(cacheFirst(req))
//   } else {
//     e.respondWith(networkAndCache(req))
//   }
// })

// async function cacheFirst(req){
//   const cache = await caches.open(cacheName)
//   const cached = await cache.match(req)
//   return cached || fetch(req)
// }

// async function networkAndCache(req){
//   const cache = await caches.open(cacheName)
//   try{
//     const fresh = await fetch(req)
//     await cache.put(req, fresh.clone())
//     return fresh
//   }catch (e){
//     const cached = await cache.match(req)
//     return cached
//   }
// }

