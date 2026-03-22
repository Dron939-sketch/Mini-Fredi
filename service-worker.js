// ============================================
// SERVICE WORKER ДЛЯ PUSH-УВЕДОМЛЕНИЙ
// Версия 1.0
// ============================================

const CACHE_NAME = 'fredi-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/static/styles.css',
    '/static/app.js',
    '/static/api.js',
    '/static/dashboard.js',
    '/static/psychometric.js',
    '/static/challenges.js',
    '/static/animated-avatar.js',
    '/icon-192.png',
    '/icon-512.png'
];

// ============================================
// УСТАНОВКА
// ============================================

self.addEventListener('install', (event) => {
    console.log('📦 Service Worker установлен');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('🔧 Кэширование файлов');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.error('Ошибка кэширования:', error);
            })
    );
    
    self.skipWaiting();
});

// ============================================
// АКТИВАЦИЯ
// ============================================

self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker активирован');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Удаление старого кэша:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    self.clients.claim();
});

// ============================================
// ОБРАБОТКА ЗАПРОСОВ (ОФФЛАЙН)
// ============================================

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                
                return fetch(event.request)
                    .then((response) => {
                        if (!response || response.status !== 200) {
                            return response;
                        }
                        
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    });
            })
            .catch(() => {
                // Оффлайн-страница
                if (event.request.destination === 'document') {
                    return caches.match('/offline.html');
                }
                return new Response('Вы оффлайн', {
                    status: 503,
                    statusText: 'Service Unavailable'
                });
            })
    );
});

// ============================================
// PUSH-УВЕДОМЛЕНИЯ
// ============================================

self.addEventListener('push', (event) => {
    console.log('📨 Получено push-уведомление:', event);
    
    let data = {
        title: '🔔 Фреди',
        body: 'Новое уведомление',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        data: {}
    };
    
    if (event.data) {
        try {
            const parsed = event.data.json();
            data = { ...data, ...parsed };
        } catch (e) {
            data.body = event.data.text();
        }
    }
    
    const options = {
        body: data.body,
        icon: data.icon,
        badge: data.badge,
        vibrate: [200, 100, 200],
        data: data.data,
        actions: [
            {
                action: 'open',
                title: '📱 Открыть'
            },
            {
                action: 'dismiss',
                title: '❌ Закрыть'
            }
        ],
        tag: data.tag || 'fredi-notification',
        renotify: true,
        requireInteraction: data.requireInteraction || false
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// ============================================
// КЛИК ПО УВЕДОМЛЕНИЮ
// ============================================

self.addEventListener('notificationclick', (event) => {
    console.log('🔔 Клик по уведомлению:', event);
    
    event.notification.close();
    
    const action = event.action;
    const notificationData = event.notification.data;
    
    if (action === 'dismiss') {
        return;
    }
    
    // Открываем приложение
    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then((clientList) => {
            // Если уже есть открытое окно, фокусируем его
            for (const client of clientList) {
                if (client.url.includes('/') && 'focus' in client) {
                    return client.focus();
                }
            }
            // Иначе открываем новое
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
    
    // Обработка специальных действий
    if (notificationData && notificationData.type) {
        // Здесь можно добавить навигацию по типам уведомлений
        console.log('Тип уведомления:', notificationData.type);
    }
});

// ============================================
// ОБНОВЛЕНИЕ КЭША
// ============================================

self.addEventListener('message', (event) => {
    if (event.data === 'skipWaiting') {
        self.skipWaiting();
    }
    
    if (event.data === 'clearCache') {
        caches.delete(CACHE_NAME);
        console.log('🧹 Кэш очищен');
    }
});

console.log('✅ Service Worker загружен');
