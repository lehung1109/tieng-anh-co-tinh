"use client";

import { useState, useEffect } from "react";

export function useIsMobile(mobileBreakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(globalThis.innerWidth < mobileBreakpoint);

  useEffect(() => {
    const mql = globalThis.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);

    const onChange = () => {
      setIsMobile(globalThis.innerWidth < mobileBreakpoint)
    };

    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange)
  }, [mobileBreakpoint])

  return !!isMobile;
}