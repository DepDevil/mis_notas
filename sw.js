self.addEventListener('install', event => {
  console.log('Service Worker instalado');
});

self.addEventListener('fetch', event => {
  // Para funcionar como app, aunque no hace caché aún
});