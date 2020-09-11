const staticCacheName = "site-static-v7"
const assets = [
    "/",
    "/index.html",
    "/native.js",
    "/app.js",
    "/request.js",
    "/style.css",
    "/img/cloud.svg",
    "/img/day_image.svg",
    "/img/night_image.svg",
    "/img/up.svg",
    "/img/down.svg",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
    "https://fonts.googleapis.com/css2?family=Raleway:wght@100;400;700;800;900&display=swap"
];

//install service worker
self.addEventListener("install", evt => {

    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log("caching shell assets");
            cache.addAll(assets);
        }) 
    ) 
})

//activate event
self.addEventListener("activate", evt => {
    // console.log("service worker has been activated")
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys)
            return Promise.all(keys
                    .filter(key => key !== staticCacheName)
                    .map(key => caches.delete(key))
                )
        })
    )
})

//fetch events
self.addEventListener("fetch", evt => {
    // console.log("Event has been fetched", evt)
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request)
        })
    )
})