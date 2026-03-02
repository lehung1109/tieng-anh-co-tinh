import { add } from "./utils";

self.addEventListener("push", function () {
  console.log(add(1, 2));
});
