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
    '/',
    '/login',
    '/signup',
    '/about',
    '/contact',
    '/pricing',
  ]
  
  // Check exact match
  if (publicRoutes.includes(pathname)) {
    return true
  }
  
  // Check wildcard patterns (optional)
  const publicPatterns = [
    '/blog',      // Matches /blog/*
    '/docs',      // Matches /docs/*
    '/public',    // Matches /public/*
  ]
  
  return publicPatterns.some(pattern => pathname.startsWith(pattern))
}
