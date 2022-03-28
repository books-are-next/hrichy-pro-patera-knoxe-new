/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-67a3d4e';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./hrichy_pro_patera_knoxe_002.html","./hrichy_pro_patera_knoxe_005.html","./hrichy_pro_patera_knoxe_006.html","./hrichy_pro_patera_knoxe_007.html","./hrichy_pro_patera_knoxe_008.html","./hrichy_pro_patera_knoxe_009.html","./hrichy_pro_patera_knoxe_010.html","./hrichy_pro_patera_knoxe_011.html","./hrichy_pro_patera_knoxe_012.html","./hrichy_pro_patera_knoxe_013.html","./hrichy_pro_patera_knoxe_014.html","./hrichy_pro_patera_knoxe_015.html","./hrichy_pro_patera_knoxe_016.html","./hrichy_pro_patera_knoxe_017.html","./hrichy_pro_patera_knoxe_018.html","./hrichy_pro_patera_knoxe_019.html","./hrichy_pro_patera_knoxe_020.html","./hrichy_pro_patera_knoxe_021.html","./hrichy_pro_patera_knoxe_022.html","./hrichy_pro_patera_knoxe_023.html","./hrichy_pro_patera_knoxe_024.html","./hrichy_pro_patera_knoxe_025.html","./hrichy_pro_patera_knoxe_026.html","./hrichy_pro_patera_knoxe_027.html","./hrichy_pro_patera_knoxe_028.html","./hrichy_pro_patera_knoxe_029.html","./hrichy_pro_patera_knoxe_030.html","./hrichy_pro_patera_knoxe_031.html","./hrichy_pro_patera_knoxe_032.html","./hrichy_pro_patera_knoxe_033.html","./hrichy_pro_patera_knoxe_034.html","./hrichy_pro_patera_knoxe_035.html","./index.html","./manifest.json","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png","./resources/10.jpg","./resources/11.jpg","./resources/12.jpg","./resources/13.jpg","./resources/14.jpg","./resources/15.jpg","./resources/16.jpg","./resources/17.jpg","./resources/18.jpg","./resources/19.jpg","./resources/2.jpg","./resources/20.jpg","./resources/21.jpg","./resources/22.jpg","./resources/23.jpg","./resources/24.jpg","./resources/25.jpg","./resources/26.jpg","./resources/3.jpg","./resources/4.jpg","./resources/5.jpg","./resources/6.jpg","./resources/7.jpg","./resources/8.jpg","./resources/9.jpg","./resources/image001.jpg","./resources/obalka.jpg","./resources/skip.jpg","./resources/upoutavka_eknihy.jpg"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
