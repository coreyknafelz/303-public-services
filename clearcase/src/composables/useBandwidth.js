import { useUiStore } from '@/stores/uiStore'

/** Detects a slow connection via the Network Information API, where supported. */
export function useBandwidth() {
  const uiStore = useUiStore()

  function detect() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (!conn) return

    const evaluate = () => {
      uiStore.lowBandwidth = conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g' || !!conn.saveData
    }
    evaluate()
    conn.addEventListener('change', evaluate)
  }

  return { detect }
}
