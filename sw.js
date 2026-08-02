// Minimal service worker for "ታውን ንግድ እና አፓርትመንት አክሲዮን ማኅበር".
//
// Its only job is to make the site installable ("Add to Home Screen" behaves
// like a real app, with its own icon and no browser address bar).
//
// It deliberately does NOT cache pages, scripts, or data: this app shows
// live financial records from Firebase, so serving anything from a cache
// could show an admin or shareholder stale/incorrect numbers. Every request
// is simply passed straight to the network. If there's truly no connection,
// the browser's normal offline page is shown instead of a fake cached copy.

const VERSION = 'town-apartment-v1';

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() =>
            new Response(
                '<!DOCTYPE html><html lang="am"><head><meta charset="UTF-8">' +
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
                '<title>ግንኙነት የለም</title></head>' +
                '<body style="font-family:sans-serif;background:#0a1628;color:white;' +
                'display:flex;align-items:center;justify-content:center;height:100vh;' +
                'margin:0;text-align:center;padding:20px;">' +
                '<div><h2>🔌 የኢንተርኔት ግንኙነት የለም</h2>' +
                '<p>እባክዎ ኢንተርኔትዎን ያረጋግጡ እና እንደገና ይሞክሩ።</p></div></body></html>',
                { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
            )
        )
    );
});
