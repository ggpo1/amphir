const cacheVersion = 5; // @note для очистки кеша просто поднимите версию
const staticCacheName = `amphir-${cacheVersion}`;
const dynamicCacheName = `${staticCacheName}-dynamic`;
const includeExtensions = [];
const excludeExtensions = [];

const cacheFilterPredicate = (assetName) => (name) => name !== assetName;
const removeCacheByName = (name) => caches.delete(name);
const checkIsIncludeFiles = (url) => {
  const predicate = (key) => url?.endsWith(key) || url?.includes(key);
  const isInclude = includeExtensions.some(predicate);
  const isExclude = excludeExtensions.some(predicate);
  return isInclude && !isExclude;
};
const checkIsInExclude = (url) => {
  return excludeExtensions.some((key) => {
    const urlObject = new URL(url);
    return url?.startsWith(key) || urlObject.pathname.includes(key);
  });
};

self.addEventListener("activate", async () => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter(cacheFilterPredicate(staticCacheName))
      .filter(cacheFilterPredicate(dynamicCacheName))
      .map(removeCacheByName)
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin === location.origin) {
    return event.respondWith(originContentCaching(request));
  }

  event.respondWith(remoteRequestCaching(request));
});

const remoteRequestCaching = async (request) => {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    if (request.method === "POST") return response;
    if (checkIsInExclude(request.url)) return response;
    await cache.put(request, response.clone());
    return response;
  } catch (e) {
    const cached = await cache.match(request);
    return cached;
  }
};

const originContentCaching = async (request) => {
  if (!checkIsIncludeFiles(request.url)) return await fetch(request);

  const cache = await caches.open(staticCacheName);
  const cached = await cache.match(request);

  if (cached) return cached;

  const data = await fetch(request);
  cache.put(request, data.clone());

  return data;
};
