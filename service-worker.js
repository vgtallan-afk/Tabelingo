// Tabelingo V10: service worker desativado para evitar cache antigo fechando o app.
self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    if (self.caches) {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
    }
    await self.clients.claim();
  })());
});
