/* Service worker for the phone build. It only ever sees this folder's pages.
   The shell (page, styles, encrypted bundle) is kept per build. Pictures and
   clips are kept until the set of them changes. This file carries no list of
   their names: it keeps whatever the app asks for. Clips stay encrypted in the
   cache, as they are on the server. */
var BUILD = "v59p-59178e0a";
var SHELL = "ile-shell-" + BUILD, MEDIA = "ile-media-ab95b3504a";
var PRE = ["./", "phone.css?v59p-59178e0a", "app.enc?v59p-59178e0a", "manifest.webmanifest", "icons/icon-192.png", "icons/apple-touch-icon.png", "../styles.css?v59"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(SHELL).then(function (c) {
    return c.addAll(PRE.map(function (u) { return new Request(u, { cache: "reload" }); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return (k.indexOf("ile-shell-") === 0 && k !== SHELL) || (k.indexOf("ile-media-") === 0 && k !== MEDIA); }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function timeout(ms) { return new Promise(function (_, no) { setTimeout(function () { no(new Error("slow")); }, ms); }); }

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || req.cache === "no-store") { return; }
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) { return; }

  /* pictures and clips: the copy on the phone first */
  if (url.pathname.indexOf("/img/") >= 0) {
    var key = url.origin + url.pathname;
    e.respondWith(caches.open(MEDIA).then(function (c) {
      return c.match(key).then(function (hit) {
        if (hit) { return hit; }
        return fetch(req).then(function (res) {
          if (res && res.ok) { var copy = res.clone(); e.waitUntil(c.put(key, copy).catch(function () {})); }
          return res;
        });
      });
    }));
    return;
  }

  /* opening the app: the network if it answers quickly, the saved page if not */
  if (req.mode === "navigate") {
    e.respondWith(Promise.race([fetch(req), timeout(4000)]).catch(function () {
      return caches.open(SHELL).then(function (c) { return c.match("./"); }).then(function (hit) { return hit || fetch(req); });
    }));
    return;
  }

  /* the rest of the shell: saved copy first, and keep whatever is fetched */
  e.respondWith(caches.open(SHELL).then(function (c) {
    return c.match(req).then(function (hit) {
      if (hit) { return hit; }
      return fetch(req).then(function (res) {
        if (res && res.ok && res.type === "basic") { var copy = res.clone(); e.waitUntil(c.put(req, copy).catch(function () {})); }
        return res;
      });
    });
  }));
});
