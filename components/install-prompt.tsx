"use client";

import { useEffect } from "react";

function InstallPrompt() {
  const isIOS =
    globalThis.window !== undefined &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !globalThis.window.MSStream;
  const isStandalone = globalThis.window?.matchMedia(
    "(display-mode: standalone)"
  ).matches;

  useEffect(() => {
    globalThis.window.addEventListener("beforeinstallprompt", (event) => {
      alert("beforeinstallprompt");
    });
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>

      <p>{isIOS ? "is IOS" : "is not IOS"}</p>
      <p>{isStandalone ? "is Standalone" : "is not Standalone"}</p>
    </div>
  );
}

export default InstallPrompt;
