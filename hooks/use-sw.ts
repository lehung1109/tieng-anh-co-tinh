import { SWContext } from "@/providers/sw-provider";
import { useContext } from "react";

export const useSW = () => {
  const sw = useContext<{
    registration: ServiceWorkerRegistration | null;
    isReady: boolean;
  }>(SWContext);

  if (!sw) {
    throw new Error("Service Worker context not found");
  }

  return sw;
};
