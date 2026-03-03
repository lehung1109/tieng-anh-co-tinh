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
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isMacOS, setIsMacOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const handler = (e: BeforeInstallPromptEvent) => {
    e.preventDefault();
    setDeferredPrompt(e);
    console.log(e);
  };

  const triggerInstall = async () => {
    console.log(deferredPrompt);
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") setIsInstalled(true);

    setDeferredPrompt(null);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsIOS(
      globalThis.window !== undefined &&
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !globalThis.window.MSStream
    );

    setIsMacOS(globalThis.window !== undefined && isAppleDesktop());

    setIsInstalled(
      globalThis.window?.matchMedia("(display-mode: standalone)").matches
    );
  }, []);

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
