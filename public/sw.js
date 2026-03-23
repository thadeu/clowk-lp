const IMAGE_CACHE = 'images-v1';
const MEDIA_CACHE = 'media-v1';
const CACHE_NAMES = [IMAGE_CACHE, MEDIA_CACHE];

const IMAGE_EXTENSIONS = /\.(?:png|jpe?g)$/i;
const VIDEO_EXTENSIONS = /\.(?:mp4|webm)$/i;

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(cacheNames.filter(name => !CACHE_NAMES.includes(name)).map(name => caches.delete(name)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  const isImage = request.destination === 'image' || IMAGE_EXTENSIONS.test(url.pathname);
  const isVideo = request.destination === 'video' || VIDEO_EXTENSIONS.test(url.pathname);

  if (!isImage && !isVideo) return;

  if (isVideo && request.headers.has('range')) {
    event.respondWith(handleVideoRangeRequest(event));

    return;
  }

  event.respondWith(cacheFirst(request, isVideo ? MEDIA_CACHE : IMAGE_CACHE));
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await fetch(request);

  if (networkResponse.ok && networkResponse.type !== 'opaque') {
    await cache.put(request, networkResponse.clone());
  }

  return networkResponse;
}

async function handleVideoRangeRequest(event) {
  const { request } = event;
  const cache = await caches.open(MEDIA_CACHE);
  const cacheKey = request.url;
  const cachedResponse = await cache.match(cacheKey);

  if (cachedResponse) {
    return createPartialResponse(request, cachedResponse);
  }

  event.waitUntil(primeFullVideo(cache, cacheKey));

  return fetch(request);
}

async function primeFullVideo(cache, cacheKey) {
  try {
    const fullResponse = await fetch(cacheKey);

    if (fullResponse.ok && fullResponse.type !== 'opaque') {
      await cache.put(cacheKey, fullResponse);
    }
  } catch {
    // Ignore failed background cache warmup.
  }
}

async function createPartialResponse(request, response) {
  const rangeHeader = request.headers.get('range');

  if (!rangeHeader) {
    return response;
  }

  const buffer = await response.arrayBuffer();
  const size = buffer.byteLength;
  const match = /bytes=(\d+)-(\d+)?/.exec(rangeHeader);

  if (!match) {
    return new Response(null, {
      status: 416,
      headers: {
        'Content-Range': `bytes */${size}`,
      },
    });
  }

  const start = Number.parseInt(match[1], 10);
  const end = match[2] ? Number.parseInt(match[2], 10) : size - 1;

  if (Number.isNaN(start) || Number.isNaN(end) || start >= size || end >= size || start > end) {
    return new Response(null, {
      status: 416,
      headers: {
        'Content-Range': `bytes */${size}`,
      },
    });
  }

  const slicedBuffer = buffer.slice(start, end + 1);
  const headers = new Headers(response.headers);

  headers.set('Content-Length', String(slicedBuffer.byteLength));
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Accept-Ranges', 'bytes');

  return new Response(slicedBuffer, {
    status: 206,
    statusText: 'Partial Content',
    headers,
  });
}
