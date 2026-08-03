const CACHE = 'zimix-v1';
const ASSETS = [
  '/zimix/',
  '/zimix/index.html',
  '/zimix/manifest.json',
  '/zimix/icon-192.png',
  '/zimix/icon-512.png',
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.11.0/dist/tabler-icons.min.css'
];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}));self.clients.claim();});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request);}));});
