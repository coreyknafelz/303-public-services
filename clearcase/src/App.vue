<script setup>
import { onMounted } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import { useLocale } from '@/composables/useLocale'
import { useBandwidth } from '@/composables/useBandwidth'
import AppHeader from '@/components/common/AppHeader.vue'
import HelpDrawer from '@/components/common/HelpDrawer.vue'

const uiStore = useUiStore()
const { setLocale } = useLocale()
const { detect } = useBandwidth()

onMounted(() => {
  if (uiStore.locale === 'es') setLocale('es')
  detect()
})
</script>

<template>
  <AppHeader />
  <main class="app-main">
    <RouterView />
  </main>
  <HelpDrawer />
</template>

<style scoped>
.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: var(--space-8);
}
</style>
