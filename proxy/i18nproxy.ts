import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'
import {
  fallbackLng,
  languages,
  cookieName,
  headerName
} from '@/lib/i18n/settings'
import { ChainableProxy } from '@/lib/chainProxy'

acceptLanguage.languages(languages)

export function i18nProxy(proxy: ChainableProxy): ChainableProxy {
  return async (request, event) => {
    let lng;

    // Try to get language from cookie
    if (request.cookies.has(cookieName))
      lng = acceptLanguage.get(request.cookies.get(cookieName)?.value)

    // If no cookie, check the Accept-Language header
    if (!lng) lng = acceptLanguage.get(request.headers.get('Accept-Language'))

    // Default to fallback language if still undefined
    if (!lng) lng = fallbackLng

    // Check if the language is already in the path
    const lngInPath = languages.find((loc) =>
      request.nextUrl.pathname.startsWith(`/${loc}`)
    )

    const headers = new Headers(request.headers)
    headers.set(headerName, lngInPath || lng)

    // If the language is not in the path, redirect to include it
    if (!lngInPath && !request.nextUrl.pathname.startsWith('/_next')) {
      return NextResponse.redirect(
        new URL(`/${lng}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
      );
    }

    const nextResponse = await proxy(request, event);

    // If a referer exists, try to detect the language from there and set the cookie accordingly
    const referer = request.headers.get('referer');
    if (referer) {
      const refererUrl = new URL(referer)
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`)
      )

      if (lngInReferer) nextResponse.cookies.set(cookieName, lngInReferer);
    }

    return nextResponse;
  };
}