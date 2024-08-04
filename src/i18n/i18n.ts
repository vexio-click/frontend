import { createI18n } from 'vue-i18n'
import type { Locale } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

import pluralRules from './rules/pluralization'

function getLocale(): Locale {
  const sessionLanguage = sessionStorage.getItem('language')
  if (sessionLanguage) return sessionLanguage

  const cookieLanguage = document.cookie
    .split('; ')
    .find((row) => row.startsWith('language='))
    ?.split('=')[1]
  if (cookieLanguage) return cookieLanguage

  const navigatorLanguage = navigator.language.toLowerCase()
  if (navigatorLanguage) return navigatorLanguage

  return import.meta.env.VITE_I18N_LOCALE || 'en'
}

export default createI18n({
  legacy: false,
  locale: getLocale(),
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'en',
  messages,
  pluralRules
})
