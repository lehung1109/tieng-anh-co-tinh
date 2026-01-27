'use client'

import i18next from 'i18next'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useTranslation, UseTranslationOptions } from 'react-i18next'

export function useT(ns: string, options?: UseTranslationOptions<string>) {
  const locale = useParams()?.locale;

  if (typeof locale !== 'string')
    throw new Error('useT is only available inside /app/[lng]')

  useEffect(() => {
    if (locale && locale !== i18next.resolvedLanguage) {
      i18next.changeLanguage(locale)
    }

  }, [locale])

  return useTranslation(ns, options)
}