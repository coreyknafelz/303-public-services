import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import {
  Chart as ChartJS,
  ArcElement,
  DoughnutController,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

import App from './App.vue'
import router from './router'
import en from './locales/en.json'
import './assets/styles/global.css'

// Register only the Chart.js building blocks actually used, to keep the bundle lean.
ChartJS.register(
  ArcElement,
  DoughnutController,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler,
  Tooltip,
  Legend,
)

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en },
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
