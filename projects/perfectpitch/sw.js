/**
 * Service worker: offline app shell and practice reminders.
 *
 * The cache is deliberately conservative -- it serves the shell so the app
 * opens without a network, and lets everything else fall through. Aggressively
 * caching hashed build assets would only duplicate what the browser's own HTTP
 * cache already does well.
 */

const CACHE = "perfect-practice-v1";

/**
 * Everything is resolved against the directory this worker is served from
 * rather than the origin root: the app is deployed under a subdirectory on the
 * portfolio site, and a root-absolute path would reach outside its own scope.
 */
const ROOT = new URL("./", self.location.href);
const at = (path) => new URL(path, ROOT).href;

const SHELL = [at("./"), at("index.html"), at("manifest.json"), at("favicon.svg")];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      // Individually, so one missing file does not fail the whole install.
      .then((cache) => Promise.allSettled(SHELL.map((path) => cache.add(path))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never cache transcription calls: they are large, one-shot, and stateless.
  if (url.href.startsWith(at("api/"))) return;

  // Navigations: network first so a deployed update is picked up, falling back
  // to the cached shell when offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          void caches.open(CACHE).then((cache) => cache.put(at("index.html"), copy));
          return response;
        })
        .catch(() => caches.match(at("index.html")).then((cached) => cached ?? Response.error())),
    );
    return;
  }

  // Everything else: cache first, then network.
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ??
        fetch(request).then((response) => {
          if (response.ok && response.type === "basic") {
            const copy = response.clone();
            void caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "dismiss") return;

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      // Focus an open tab rather than opening a duplicate.
      for (const client of clients) {
        if ("focus" in client) return client.focus();
      }
      return self.clients.openWindow(at("./"));
    }),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "show-reminder") {
    void self.registration.showNotification("Perfect Practice", {
      body: event.data.body ?? "Ready for your daily practice?",
      icon: at("icon-192.png"),
      badge: at("badge-72.png"),
      tag: "practice-reminder",
      actions: [
        { action: "practice", title: "Practice Now" },
        { action: "dismiss", title: "Later" },
      ],
    });
  }
});
