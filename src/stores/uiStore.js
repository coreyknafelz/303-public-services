import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    locale: localStorage.getItem('clearcase-locale') || 'en',
    helpDrawerOpen: false,
    lowBandwidth: false,
  }),
  actions: {
    setLocale(locale) {
      this.locale = locale
      localStorage.setItem('clearcase-locale', locale)
    },
    openHelpDrawer() {
      this.helpDrawerOpen = true
    },
    closeHelpDrawer() {
      this.helpDrawerOpen = false
    },
  },
})
