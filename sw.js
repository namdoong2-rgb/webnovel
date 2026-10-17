// 앱 화면 파일을 핸드폰에 저장해 두어 인터넷 없이도 열리게 합니다. (글 내용은 여기서 다루지 않음)
const CACHE="webnovel-v1";
const CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  // 인터넷이 되면 새 버전을 받고, 안 되면 저장해 둔 화면을 씁니다.
  e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r})
    .catch(()=>caches.match(e.request).then(m=>m||caches.match("index.html"))));
});
