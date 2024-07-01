const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies'); // Add the StaleWhileRevalidate strategy
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implement asset caching
registerRoute(({ request }) => // check if the request destination is one of the following
  ['style', 'script', 'worker'].includes(request.destination), // check if the request destination is one of the following

  new StaleWhileRevalidate({ // create a new StaleWhileRevalidate strategy
    cacheName: 'asset-cache', // set the cache name to 'asset-cache'
    plugins: [ // add the following plugins to the strategy
      new CacheableResponsePlugin({ // create a new CacheableResponsePlugin
        statuses: [0, 200], // set the statuses to 0 and 200
      }),
    ],
  })
);
