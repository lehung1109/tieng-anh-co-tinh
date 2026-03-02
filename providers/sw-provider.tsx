"use client";

import { registerSW } from "@/lib/register-sw";
import { createContext, useEffect, useMemo, useState } from "react";

export const SWContext = createContext<{
  registration: ServiceWorkerRegistration | null;
  isReady: boolean;
}>({ registration: null, isReady: false });

export function SWProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    registerSW().then(setRegistration);
    navigator.serviceWorker.ready.then(() => setIsReady(true));
  }, []);

  const value = useMemo(
    () => ({ registration, isReady }),
    [registration, isReady]
  );

  return <SWContext value={value}>{children}</SWContext>;
}
