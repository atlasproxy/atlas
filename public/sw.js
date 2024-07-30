importScripts('/cdn/uv.bundle.js');
importScripts('/cdn/uv.config.js');
importScripts(__uv$config.sw || '/cdn/uv.sw.js');

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