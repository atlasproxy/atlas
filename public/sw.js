importScripts('/cdn/uv.bundle.js');
importScripts('/cdn/uv.config.js');
importScripts(__uv$config.sw || '/cdn/uv.sw.js');
importScripts("https://unpkg.com/@mercuryworkshop/epoxy-transport@2.0.1/dist/index.js")
importScripts("https://unpkg.com/@mercuryworkshop/libcurl-transport@1.3.1/dist/index.js")

const uv = new UVServiceWorker();

self.addEventListener('fetch', event => {
  event.respondWith(
    (async () => {
      if (uv.route(event)) {
        return await uv.fetch(event);
      }
      return await fetch(event.request);
    })()
  );
});