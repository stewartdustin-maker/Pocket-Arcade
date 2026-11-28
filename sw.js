/* Pocket Arcade service worker: lets the app install and open with no connection. Online it always fetches the newest copy first; the saved copy is only the fallback. */
var C='pa-v105';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(function(res){if(res&&res.status===200){var cp=res.clone();caches.open(C).then(function(c){return c.put(r,cp)}).catch(function(){})}return res}).catch(function(){return caches.match(r).then(function(m){return m||caches.match('index.html')})}))});
