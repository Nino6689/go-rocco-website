/* Home Hub site survey - offline shell.
   Bump CACHE on every deploy so phones pick the new version up. */
var CACHE = "hh-survey-v3.0.0";
var SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg", "./icon-180.png", "./icon-512.png"];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      /* Tolerate a single missing asset rather than failing the whole install. */
      return Promise.all(SHELL.map(function(u){
        return c.add(new Request(u, {cache:"reload"})).catch(function(){});
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return k===CACHE ? null : caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;
  var url = new URL(req.url);
  if(url.origin !== self.location.origin) return;

  /* Stale while revalidate: instant load on site, fresh copy next time. */
  e.respondWith(
    caches.open(CACHE).then(function(c){
      return c.match(req, {ignoreSearch:true}).then(function(hit){
        var net = fetch(req).then(function(res){
          if(res && res.ok && res.type === "basic") c.put(req, res.clone());
          return res;
        }).catch(function(){ return hit; });
        return hit || net;
      });
    })
  );
});
