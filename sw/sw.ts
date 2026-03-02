/// <reference lib="webworker" />

import { add } from "./utils";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("push", function () {
  console.log(add(1, 2));
});

self.addEventListener("fetch", function (event: FetchEvent) {
  event.respondWith(fetch(event.request));
});
