import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import en from './locales/en.json'
import es from './locales/es.json'
import './assets/styles/global.css'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, es },
  datetimeFormats: {
    en: { short: { year: 'numeric', month: 'long', day: 'numeric' } },
    es: { short: { year: 'numeric', month: 'long', day: 'numeric' } },
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
