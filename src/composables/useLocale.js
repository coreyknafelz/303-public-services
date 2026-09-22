import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/uiStore'

/** Toggles the active locale while keeping locale bundles independent. */
export function useLocale() {
  const { locale } = useI18n()
  const uiStore = useUiStore()

  async function setLocale(next) {
    locale.value = next
    uiStore.setLocale(next)
  }

  async function toggle() {
    await setLocale(locale.value === 'en' ? 'es' : 'en')
  }

  return { toggle, setLocale }
}
