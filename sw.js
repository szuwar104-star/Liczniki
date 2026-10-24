/* Liczniki — service worker
   Strona główna: najpierw sieć (żeby aktualizacje docierały same), offline z pamięci.
   Pozostałe pliki i czcionki: z pamięci, a gdy ich brak — z sieci. */
const CACHE = "liczniki-v2";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-512-maskable.png"
];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (req.mode === "navigate" && url.origin === self.location.origin) {
    event.respondWith(
      fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put("./index.html", copy));
        }
        return res;
      }).catch(() => caches.match("./index.html"))
    );
    return;
  }

  if (url.origin === self.location.origin || FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.match(req, { ignoreSearch: url.origin === self.location.origin }).then(hit => {
        if (hit) return hit;
        return fetch(req).then(res => {
          if (res && (res.ok || res.type === "opaque")) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy));
          }
          return res;
        });
      })
    );
  }
});
