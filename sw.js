// Service worker: membuat aplikasi bisa dipasang dan tetap terbuka saat sinyal lemah.
const CACHE = 'lapangan-v1';
const SHELL = ['./', 'index.html', 'config.js', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  if (url.hostname.endsWith('googleapis.com') && !url.hostname.startsWith('fonts')) return; // data Firestore: jangan di-cache
  const sameOrigin = url.origin === location.origin;
  const isPage = req.mode === 'navigate' || (sameOrigin && /(\/|index\.html|config\.js)$/.test(url.pathname));
  if (isPage) { // network first: selalu ambil versi terbaru bila online
    e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
    return;
  }
  if (sameOrigin || /gstatic\.com|fonts\.googleapis\.com|cdnjs\.cloudflare\.com/.test(url.hostname)) { // cache first
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === 'opaque') { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
      return r;
    })));
  }
});
