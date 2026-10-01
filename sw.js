// This app moved to https://kanaparthysaisreekar.github.io/guides/ccarp/#moved
// Replaces the old offline worker: deletes its cache, unregisters, and sends any open window to the new address.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  const ks = await caches.keys();
  await Promise.all(ks.filter(k => k.startsWith("ccarp-fc-")).map(k => caches.delete(k)));
  await self.clients.claim();
  const wins = await self.clients.matchAll({ type: 'window' });
  await self.registration.unregister();
  await Promise.all(wins.map(w => w.navigate("/guides/ccarp/#moved").catch(() => null)));
})()));
