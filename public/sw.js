importScripts('/cdn/uv.handler.js');
importScripts('/cdn/uv.config.js');
importScripts(__uv$config.sw || '/cdn/uv.sw.js');
importScripts("https://unpkg.com/@mercuryworkshop/epoxy-transport@1.1.0/dist/index.js")

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