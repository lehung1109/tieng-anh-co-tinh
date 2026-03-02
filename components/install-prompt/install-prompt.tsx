"use client";

import { isAppleDesktop } from "@/lib/utils";
import { useEffect, useState } from "react";
import MacOSPrompt from "./macos-prompt";
import IosPrompt from "./Ios-prompt";
import DefaultPrompt from "./default-prompt";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt: () => Promise<void>;
}

function InstallPrompt() {
  const isIOS =
    globalThis.window !== undefined &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !globalThis.window.MSStream;
  const [isInstalled, setIsInstalled] = useState(
    globalThis.window?.matchMedia("(display-mode: standalone)").matches
  );
  const isMacOS = globalThis.window !== undefined && isAppleDesktop();
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const handler = (e: BeforeInstallPromptEvent) => {
    e.preventDefault();
    setDeferredPrompt(e);
  };

  const triggerInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") setIsInstalled(true);

    setDeferredPrompt(null);
  };

  useEffect(() => {
    globalThis.window.addEventListener(
      "beforeinstallprompt",
      handler as EventListener
    );

    return () => {
      globalThis.window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
    };
  }, []);

  return (
    !isInstalled &&
    (isIOS ? (
      <IosPrompt />
    ) : isMacOS ? (
      <MacOSPrompt />
    ) : (
      <DefaultPrompt triggerInstall={triggerInstall} />
    ))
  );
}

export default InstallPrompt;
