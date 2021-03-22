const cacheName = 'cache-v1'
const cacheURLs = [
  './funny.html',
  './gaming.html',
  './index.html',
  './music.html',
  './pics.html',
  './askreddit.html'
]

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js', {
    scope: '.' // <--- THIS BIT IS REQUIRED
  }).then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }, function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

self.addEventListener('install', async (e) =>{
  const cache = await caches.open(cacheName)
  await cache.open(cacheURLs)
  return self.skipWaiting()
})


self.addEventListener('activate', e =>{
  self.clients.claim()
})

self.addEventListener('fetch', async (e) =>{
  const req = e.request;
  const url = new URL(req.url)

  if (url.orgin == location.origin){
    e.respondWith(cacheFirst(req))
  } else {
    e.respondWith(networkAndCache(req))
  }
})

async function cacheFirst(req){
  const cache = await caches.open(cacheName)
  const cached = await cache.match(req)
  return cached || fetch(req)
}

async function networkAndCache(req){
  const cache = await caches.open(cacheName)
  try{
    const fresh = await fetch(req)
    await cache.put(req, fresh.clone())
    return fresh
  }catch (e){
    const cached = await cache.match(req)
    return cached
  }
}

