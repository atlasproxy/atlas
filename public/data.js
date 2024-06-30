importScripts("/lib/scramjet.codecs.js");
importScripts("/lib/scramjet.config.js");
importScripts( __scramjet$config.bundle || "/lib/scramjet.bundle.js")
importScripts( __scramjet$config.worker || "/lib/scramjet.worker.js");
importScripts("https://unpkg.com/@mercuryworkshop/epoxy-transport@2.0.1/dist/index.js")
importScripts("https://unpkg.com/@mercuryworkshop/libcurl-transport@1.3.1/dist/index.js")

const scramjet = new ScramjetServiceWorker();

self.addEventListener("fetch", async (event) => {
    event.respondWith((async() => {
        if (scramjet.route(event)) {
            return await scramjet.fetch(event);
        } else {
            return await fetch(event.request);
        }
    })());
});