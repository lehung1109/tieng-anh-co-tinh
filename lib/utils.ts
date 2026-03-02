import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const verifyRecaptcha = async (token: string) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  const response = await fetch(verifyUrl, { method: "POST" });
  const data = await response.json();

  return data;
};

export const isPublicRoute = (pathname: string): boolean => {
  const publicRoutes = [
    "/",
    "/signin",
    "/signup",
    "/about",
    "/contact",
    "/pricing",
  ];

  // Check exact match
  if (publicRoutes.some((route) => pathname.includes(route))) {
    return true;
  }

  // Check wildcard patterns (optional)
  const publicPatterns = [
    "/blog", // Matches /blog/*
    "/docs", // Matches /docs/*
    "/public", // Matches /public/*
  ];

  return publicPatterns.some((pattern) => pathname.startsWith(pattern));
};

// generate nonce to use for google id token sign-in
export const generateNonce = async (): Promise<string[]> => {
  const nonce = btoa(
    String.fromCodePoint(...crypto.getRandomValues(new Uint8Array(32)))
  );
  const encoder = new TextEncoder();
  const encodedNonce = encoder.encode(nonce);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedNonce = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return [nonce, hashedNonce];
};

export const isAppleDesktop = (): boolean => {
  // check if it's a mac
  const userAgent = navigator.userAgent.toLowerCase();
  if (navigator.maxTouchPoints || !new RegExp(/macintosh/).exec(userAgent))
    return false;

  // check safari version >= 17
  const version = /version\/(\d{2})\./.exec(userAgent);

  if (!version?.[1] || Number.parseInt(version[1]) < 17) return false;

  // hacky way to detect Sonoma
  const audioCheck = !!document
    .createElement("audio")
    .canPlayType('audio/wav; codecs="1"');
  const webGLCheck = !!new OffscreenCanvas(1, 1).getContext("webgl");

  return audioCheck && webGLCheck;
};
