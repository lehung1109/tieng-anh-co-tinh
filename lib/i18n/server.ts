import i18next from 'i18next'
import { defaultNS, fallbackLng, headerName } from './settings'
import { headers } from 'next/headers'
import i18nextPromise from './i18next'

export async function getT(ns?: string, keyPrefix?: string) {
  const headerList = await headers()
  const lng = headerList.get(headerName)

  await i18nextPromise;

  if (lng && i18next.resolvedLanguage !== lng) {
    await i18next.changeLanguage(lng)
  }

  if (ns && !i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns)
  }

  return {
    t: i18next.getFixedT(
      lng ?? i18next.resolvedLanguage ?? fallbackLng,
      ns ?? defaultNS,
      keyPrefix
    ),
    i18n: i18next
  }
}