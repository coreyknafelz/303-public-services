# Build Plan: ClearCase — Vite + Vue

**Companion to:** `BRIEF.md`
**Stack:** Vite 8 · Vue 3 (Composition API) · Vue Router 4 · Pinia 4 · vue-i18n 9
**Target:** Mobile-first PWA, 375px–430px primary viewport

## Current implementation status

The planned prototype is implemented and deployed at https://303-public-services.vercel.app/.

- The app is a root-level Vite project; there is no nested `clearcase/` application directory.
- Core routes are implemented: entry, status, checklist, upload, confirmation, and help.
- English and Spanish translations are implemented in independent JSON bundles. New locales can be registered in `src/main.js` and exposed through `useLocale.js`.
- Authenticated routes have fixed bottom navigation for Status, Checklist, and Help.
- Vercel SPA rewrites support direct navigation and refreshes on client-side routes.
- Authentication, case data, uploads, SMS opt-in, and callback requests remain local prototype simulations.
- A production build passes with `npm run build`.

---

## 1. Tech Stack Rationale

| Layer | Choice | Why |
|---|---|---|
| Bundler | Vite 8 | Near-instant HMR, native ESM, excellent Vue plugin ecosystem |
| Framework | Vue 3 (Composition API + `<script setup>`) | Fine-grained reactivity fits status-polling and upload-state management; SFCs keep component concerns co-located |
| Routing | Vue Router 4 | First-class Vue 3 support; navigation guards handle case-code auth without a full auth library |
| State | Pinia | Lightweight, devtools-friendly; replaces Vuex boilerplate for case state, upload queue, and i18n locale |
| Styling | CSS custom properties + scoped component styles | No build-time CSS framework dependency; custom properties support the EN/ES toggle and status-color theming |
| i18n | vue-i18n 9 | Composable `useI18n()` with independent English and Spanish JSON bundles |
| PWA | vite-plugin-pwa | Workbox-based service worker; enables offline status caching (stretch goal) |

---

## 2. Project Bootstrap

```bash
# Scaffold
npm create vite@latest clearcase -- --template vue
cd clearcase

# Core dependencies
npm install vue-router@4 pinia

# i18n
npm install vue-i18n@9

# PWA (optional, for stretch goals)
npm install -D vite-plugin-pwa

# Dev utilities
npm install -D @vitejs/plugin-vue
```

### `vite.config.js`

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /\/api\/case\//,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'case-status-cache' }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  }
})
```

---

## 3. Directory Structure

```
./
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── tokens.css          # Color, type, spacing custom properties
│   │       └── global.css          # Reset, body, focus ring
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppHeader.vue       # Logo + language toggle
│   │   │   ├── AppBottomNav.vue    # Fixed authenticated route navigation
│   │   │   ├── StatusBadge.vue     # Reusable status pill (Action Needed / On Track / etc.)
│   │   │   ├── ProgressBar.vue     # Upload progress, timeline steps
│   │   │   └── HelpDrawer.vue      # Slide-up help panel, accessible
│   │   ├── charts/
│   │   │   └── TimelineSteps.vue       # Case timeline — custom CSS step chart
│   │   ├── entry/
│   │   │   ├── CaseCodeInput.vue
│   │   │   └── SignInForm.vue
│   │   ├── status/
│   │   │   ├── StatusOverview.vue
│   │   │   ├── ProgramCard.vue         # Per-program status tile
│   │   │   └── CaseworkerInfo.vue
│   │   ├── checklist/
│   │   │   ├── RequirementsList.vue
│   │   │   └── RequirementItem.vue
│   │   ├── upload/
│   │   │   ├── UploadTrigger.vue       # Camera / file picker
│   │   │   ├── PhotoPreview.vue
│   │   │   ├── QualityCheck.vue        # Brightness/contrast heuristic
│   │   │   └── UploadProgress.vue
│   │   └── confirmation/
│   │       ├── SubmissionSummary.vue
│   │       └── SmsOptIn.vue
│   ├── views/
│   │   ├── EntryView.vue
│   │   ├── StatusView.vue
│   │   ├── ChecklistView.vue
│   │   ├── UploadView.vue
│   │   ├── ConfirmationView.vue
│   │   └── HelpView.vue
│   ├── stores/
│   │   ├── caseStore.js            # Application status, program states, caseworker
│   │   ├── uploadStore.js          # Queue, progress, retry state
│   │   └── uiStore.js              # Locale, low-bandwidth mode, help drawer open
│   ├── composables/
│   │   ├── useUpload.js            # Camera capture, file compression, POST logic
│   │   ├── useQualityCheck.js      # Canvas-based brightness analysis
│   │   ├── useBandwidth.js         # navigator.connection + fetch timing probe
│   │   └── useLocale.js            # Language toggle, persisted to localStorage
│   ├── locales/
│   │   ├── en.json
│   │   └── es.json
│   ├── data/
│   │   └── rosaCase.js             # Hardcoded fixture: Rosa's case, documents, timeline
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   └── main.js
├── index.html
├── vercel.json                     # SPA fallback rewrites
├── vite.config.js
└── package.json
```

---

## 4. Routing

```js
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useCaseStore } from '@/stores/caseStore'

const routes = [
  { path: '/',          name: 'entry',        component: () => import('@/views/EntryView.vue') },
  { path: '/status',    name: 'status',       component: () => import('@/views/StatusView.vue'),       meta: { requiresCase: true } },
  { path: '/checklist', name: 'checklist',    component: () => import('@/views/ChecklistView.vue'),    meta: { requiresCase: true } },
  { path: '/upload/:requirementId', name: 'upload', component: () => import('@/views/UploadView.vue'), meta: { requiresCase: true } },
  { path: '/confirmation', name: 'confirmation', component: () => import('@/views/ConfirmationView.vue'), meta: { requiresCase: true } },
  { path: '/help',      name: 'help',         component: () => import('@/views/HelpView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

// Navigation guard — redirect to entry if no active case
router.beforeEach((to) => {
  const caseStore = useCaseStore()
  if (to.meta.requiresCase && !caseStore.isAuthenticated) {
    return { name: 'entry', query: { redirect: to.fullPath } }
  }
})

export default router
```

All non-entry routes are code-split via dynamic `import()`. The initial bundle ships only what Entry needs.

---

## 5. State: Pinia Stores

### `caseStore.js` — The core application state

```js
// src/stores/caseStore.js
import { defineStore } from 'pinia'
import { rosaCase } from '@/data/rosaCase'

export const useCaseStore = defineStore('case', {
  state: () => ({
    isAuthenticated: false,
    caseCode: null,
    applicant: null,
    programs: [],          // Array of { id, nameKey, status }
    overallStatus: null,   // 'action_needed' | 'in_review' | 'approved' | ...
    requirements: [],      // Array of { id, labelKey, descriptionKey, deadline, fulfilled }
    caseworker: null,
    timeline: [],          // Array of { date, event, completed }
    submittedDocs: []
  }),
  getters: {
    pendingRequirements: (state) => state.requirements.filter(r => !r.fulfilled),
    hasActionNeeded: (state) => state.overallStatus === 'action_needed'
  },
  actions: {
    authenticateWithCode(code) {
      // Simulate API call; swap rosaCase fixture for real fetch in production
      if (code === rosaCase.caseCode) {
        this.$patch({ ...rosaCase, isAuthenticated: true, caseCode: code })
        return true
      }
      return false
    },
    markRequirementFulfilled(id) {
      const req = this.requirements.find(r => r.id === id)
      if (req) req.fulfilled = true
      if (this.requirements.every(r => r.fulfilled)) {
        this.overallStatus = 'in_review'
      }
    },
    addSubmittedDoc(doc) {
      this.submittedDocs.push(doc)
    }
  }
})
```

### `uploadStore.js` — Upload queue and retry

```js
// src/stores/uploadStore.js
import { defineStore } from 'pinia'

export const useUploadStore = defineStore('upload', {
  state: () => ({
    currentFile: null,        // { blob, dataUrl, requirementId }
    qualityResult: null,      // 'pass' | 'warn' | null
    status: 'idle',           // 'idle' | 'previewing' | 'checking' | 'uploading' | 'success' | 'error'
    progress: 0,
    error: null,              // { code, message, recoveryAction }
    savedSession: null        // For save-and-resume stretch goal
  }),
  actions: {
    setFile(blob, dataUrl, requirementId) {
      this.$patch({ currentFile: { blob, dataUrl, requirementId }, status: 'previewing', qualityResult: null })
    },
    setQualityResult(result) {
      this.qualityResult = result
      this.status = 'previewing'
    },
    async uploadFile() {
      this.status = 'uploading'
      this.progress = 0
      this.error = null
      try {
        // Simulated upload with XHR for progress events
        await simulateUpload((p) => { this.progress = p })
        this.status = 'success'
        this.progress = 100
      } catch (err) {
        this.status = 'error'
        this.error = mapUploadError(err)
      }
    },
    reset() {
      this.$patch({ currentFile: null, qualityResult: null, status: 'idle', progress: 0, error: null })
    }
  }
})
```

### `uiStore.js` — Locale and UI chrome

```js
// src/stores/uiStore.js
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    locale: localStorage.getItem('clearcase-locale') || 'en',
    helpDrawerOpen: false,
    lowBandwidth: false
  }),
  actions: {
    toggleLocale() {
      this.locale = this.locale === 'en' ? 'es' : 'en'
      localStorage.setItem('clearcase-locale', this.locale)
    },
  }
})
```

---

## 6. Key Composables

### `useUpload.js` — Camera capture + file prep

```js
// src/composables/useUpload.js
import { useUploadStore } from '@/stores/uploadStore'

export function useUpload() {
  const uploadStore = useUploadStore()

  async function captureFromCamera() {
    // Uses <input type="file" accept="image/*" capture="environment">
    // Returns a blob; downstream: compress → preview → quality check
  }

  async function compressImage(blob, maxSizeKB = 800) {
    return new Promise((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(blob)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const scale = Math.min(1, Math.sqrt((maxSizeKB * 1024) / blob.size))
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(resolve, 'image/jpeg', 0.82)
        URL.revokeObjectURL(url)
      }
      img.src = url
    })
  }

  return { captureFromCamera, compressImage }
}
```

### `useQualityCheck.js` — Brightness heuristic

```js
// src/composables/useQualityCheck.js
export function useQualityCheck() {
  function analyze(blob) {
    return new Promise((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(blob)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
        let total = 0
        for (let i = 0; i < data.length; i += 4) {
          total += (data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114)
        }
        const avg = total / (data.length / 4)
        URL.revokeObjectURL(url)
        // avg < 40: too dark; avg > 230: likely washed out / blank
        resolve(avg < 40 || avg > 230 ? 'warn' : 'pass')
      }
      img.src = url
    })
  }
  return { analyze }
}
```

### `useBandwidth.js` — Low-bandwidth detection

```js
// src/composables/useBandwidth.js
import { useUiStore } from '@/stores/uiStore'

export function useBandwidth() {
  const uiStore = useUiStore()

  function detect() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (conn) {
      const slow = conn.effectiveType === '2g' || conn.saveData
      uiStore.lowBandwidth = slow
      conn.addEventListener('change', () => {
        uiStore.lowBandwidth = conn.effectiveType === '2g' || conn.saveData
      })
    }
  }

  return { detect }
}
```

---

## 7. Fixture Data: Rosa's Case

```js
// src/data/rosaCase.js
export const rosaCase = {
  caseCode: 'NNW-482931',
  applicant: { name: 'Rosa M.', language: 'es' },
  overallStatus: 'action_needed',
  programs: [
    { id: 'nnw', nameKey: 'nourishNow', status: 'action_needed' },
    { id: 'cah', nameKey: 'coverAllHealth', status: 'in_review' }
  ],
  caseworker: { name: 'Elena Vargas', phone: '(555) 204-8812', ext: '214' },
  timeline: [
    { date: '2026-09-10', event: 'Application submitted', completed: true },
    { date: '2026-09-13', event: 'Identity verified', completed: true },
    { date: '2026-09-15', event: 'Document review', completed: false, current: true },
    { date: null,         event: 'Eligibility determination', completed: false },
    { date: null,         event: 'Decision issued', completed: false }
  ],
  requirements: [
    {
      id: 'req-001',
      label: 'Proof of income',
      description: 'A pay stub, award letter, or self-employment statement from the past 30 days.',
      deadline: '2026-09-28',
      urgent: true,
      fulfilled: false
    },
    {
      id: 'req-002',
      label: 'Proof of address',
      description: 'A utility bill, lease agreement, or official mail showing your current address.',
      deadline: '2026-09-28',
      urgent: false,
      fulfilled: false
    }
  ],
  submittedDocs: []
}
```

---

## 8. Internationalisation (vue-i18n 9)

```js
// src/main.js (addition)
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'

const i18n = createI18n({
  legacy: false,           // Composition API mode
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en },
  // Spanish loaded lazily on first toggle
})
```

```js
// src/composables/useLocale.js
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/uiStore'

export function useLocale() {
  const { locale, setLocaleMessage } = useI18n()
  const uiStore = useUiStore()

  async function toggle() {
    const next = locale.value === 'en' ? 'es' : 'en'
    if (next === 'es' && !setLocaleMessage.value?.es) {
      const es = await import('@/locales/es.json')
      setLocaleMessage('es', es.default)
    }
    locale.value = next
    uiStore.toggleLocale()
  }

  return { toggle }
}
```

Spanish locale is a lazy import — zero bytes on the initial load for English-primary users.

---

## 9. Styling: CSS Custom Properties

```css
/* src/assets/styles/tokens.css */
:root {
  /* Base palette */
  --color-bg:            #F7F6F4;  /* off-white, warm tint */
  --color-surface:       #FFFFFF;
  --color-border:        #E2E0DC;
  --color-text-primary:  #1A1916;
  --color-text-secondary:#5C5A56;
  --color-text-muted:    #9A9793;

  /* Status colors — always paired with icon, never color alone */
  --color-status-action: #C4620F;  /* amber-warm */
  --color-status-action-bg: #FEF3E8;
  --color-status-track:  #1A7A5E;  /* teal */
  --color-status-track-bg: #E8F5F1;
  --color-status-hold:   #6B5CA5;  /* muted violet */
  --color-status-hold-bg:#F0EEF8;
  --color-status-denied: #B42C2C;
  --color-status-denied-bg:#FDECEA;

  /* Type scale */
  --font-family:         'Inter', system-ui, sans-serif;
  --text-xs:   0.75rem;  /* 12px */
  --text-sm:   0.875rem; /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg:   1.125rem; /* 18px */
  --text-xl:   1.25rem;  /* 20px */
  --text-2xl:  1.5rem;   /* 24px */
  --text-3xl:  1.875rem; /* 30px */

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* Layout */
  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --max-w-mobile: 430px;

  /* Touch targets */
  --touch-min: 44px;
}
```

No utility framework. Component styles are scoped. The token file is the single source of truth for any value used across more than one component.

---

## 10. Build Phases

### Phase 0 — Foundation (Days 1–2)

- Vite project scaffold, plugin config, alias setup
- CSS tokens file and global reset
- Pinia stores wired up with fixture data
- Vue Router with navigation guard
- vue-i18n setup with EN locale; Spanish skeleton
- `AppHeader.vue` with language toggle

**Checkpoint:** Running dev server, router navigates between empty views, Pinia devtools show Rosa's case data.

### Phase 1 — Entry + Status (Days 3–5)

- `EntryView.vue`: case code input with validation, sign-in alt link
- `StatusView.vue`: status badge, program cards, timeline steps, caseworker block
- `StatusBadge.vue` reusable component
- `ProgramCard.vue` with all 7 status states styled
- Low-bandwidth detection wired to `uiStore`; simplified status layout for `lowBandwidth === true`

**Checkpoint:** Rosa can enter her case code and land on a fully styled status screen.

### Phase 2 — Checklist + Upload (Days 6–9)

- `ChecklistView.vue`: requirement list, deadline urgency, tap-to-upload routing
- `RequirementItem.vue`: fulfilled vs. pending states
- `UploadView.vue`: camera trigger, preview, quality check, progress bar
- `useUpload.js` composable: capture, compress, simulate POST
- `useQualityCheck.js` composable: canvas brightness analysis
- Upload error states: each named error code maps to a specific recovery message

**Checkpoint:** Rosa can tap a requirement, take a photo (or select file), see quality feedback, and simulate an upload.

### Phase 3 — Confirmation + Help (Days 10–11)

- `ConfirmationView.vue`: submission summary, SMS opt-in, back to case
- `HelpView.vue`: FAQ accordion, callback request form, office locator
- `HelpDrawer.vue`: accessible slide-up panel from persistent help button

**Checkpoint:** Full primary flow navigable end to end.

### Phase 4 — Removed Data Story Layer

The optional data-story chart layer was removed from the current prototype so the product stays focused on the applicant's core workflow.

### Phase 5 — Stretch Goals + Polish (Days 15–18)

- Spanish locale: full translation of EN JSON; lazy load confirmed working
- Save-and-resume: `uploadStore.savedSession` persisted to `sessionStorage`; resume prompt on re-entry
- Low-bandwidth state: text-only status layout, deferred image loading
- Accessibility pass: keyboard nav, focus ring visibility, ARIA roles on status badges and upload states, `prefers-reduced-motion` respected
- Cross-browser test: Chrome Android, Safari iOS, Firefox Android

### Phase 6 — QA + Handoff (Days 19–20)

- Lighthouse mobile audit (target: Performance ≥ 85, Accessibility ≥ 95)
- Bundle analysis (`vite-bundle-visualizer`) — identify and trim any unexpected heavy imports
- README with run instructions, fixture case code, and current navigation docs
- Optional: `vite build` → deploy to Netlify or Vercel preview URL for stakeholder review

---

## 11. Performance Targets

| Metric | Target |
|---|---|
| First Contentful Paint (3G) | < 2.0s |
| Time to Interactive (3G) | < 3.5s |
| Initial JS bundle (gzipped) | < 120KB |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Performance | ≥ 85 |
| Touch targets | 100% ≥ 44×44px |

---

## 12. Open Technical Questions

- **Simulated upload:** Use `setTimeout`-based fake progress or a local service worker intercepting a real `fetch`? The latter is more realistic for demonstrating low-bandwidth behavior.
- **Quality check threshold:** Tune the brightness heuristic against real phone photos before locking in values — 40/230 are starting points.
- **SMS opt-in:** Mock only, or hook into a Twilio sandbox for live demo?
- **vue-i18n date/number formatting:** Rosa's deadlines should format correctly in both locales (`2026-09-28` → `September 28, 2026` EN / `28 de septiembre de 2026` ES).

---

*Plan version 1.0 — ready for sprint planning.*
*Last updated: September 2026*
