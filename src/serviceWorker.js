// 创建 Service Worker 文件
const CACHE_NAME = 'screen-awake-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// 保持后台活跃
self.addEventListener('message', (event) => {
  if (event.data === 'keepAwake') {
    setInterval(() => {
      self.registration.active.postMessage('still-awake');
    }, 1000);
  }
}); 