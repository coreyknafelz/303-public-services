import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/uiStore'

const loadedLocales = new Set(['en'])

/** Toggles the active locale, lazily importing the Spanish bundle on first use. */
export function useLocale() {
  const { locale, setLocaleMessage } = useI18n()
  const uiStore = useUiStore()

  async function setLocale(next) {
    if (next === 'es' && !loadedLocales.has('es')) {
      const es = await import('@/locales/es.json')
      setLocaleMessage('es', es.default)
      loadedLocales.add('es')
    }
    locale.value = next
    uiStore.setLocale(next)
  }

  async function toggle() {
    await setLocale(locale.value === 'en' ? 'es' : 'en')
  }

  return { toggle, setLocale }
}
