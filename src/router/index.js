import { createRouter, createWebHistory } from 'vue-router'
import { useCaseStore } from '@/stores/caseStore'

const routes = [
  { path: '/', name: 'entry', component: () => import('@/views/EntryView.vue') },
  { path: '/status', name: 'status', component: () => import('@/views/StatusView.vue'), meta: { requiresCase: true } },
  {
    path: '/checklist',
    name: 'checklist',
    component: () => import('@/views/ChecklistView.vue'),
    meta: { requiresCase: true },
  },
  {
    path: '/upload/:requirementId',
    name: 'upload',
    component: () => import('@/views/UploadView.vue'),
    meta: { requiresCase: true },
  },
  {
    path: '/confirmation',
    name: 'confirmation',
    component: () => import('@/views/ConfirmationView.vue'),
    meta: { requiresCase: true },
  },
  { path: '/help', name: 'help', component: () => import('@/views/HelpView.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to) => {
  const caseStore = useCaseStore()
  if (to.meta.requiresCase && !caseStore.isAuthenticated) {
    return { name: 'entry', query: { redirect: to.fullPath } }
  }
})

export default router
