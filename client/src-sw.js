const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
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

// TODO: Implement asset caching

registerRoute( // register route for asset caching
  ({ request }) => // check if request destination is style, script, or worker
    ['style', 'script', 'worker'].includes(request.destination), 
  new StaleWhileRevalidate({ // use stale while revalidate strategy 
    cacheName: 'asset-cache', // cache name for assets 
    plugins: [ // array of plugins for asset caching 
      new CacheableResponsePlugin({ // cacheable response plugin 
        statuses: [0, 200], // cacheable statuses for response plugin 
      }),
    ],
  })
);
