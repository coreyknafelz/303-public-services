<script setup>
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/uiStore'
import RequirementsList from '@/components/checklist/RequirementsList.vue'

const { t } = useI18n()
const uiStore = useUiStore()
</script>

<template>
  <div class="checklist-view">
    <h1 class="checklist-view__heading">{{ t('checklist.heading') }}</h1>
    <p class="checklist-view__subheading">{{ t('checklist.subheading') }}</p>

    <p v-if="uiStore.presenterMode" class="checklist-view__callout">{{ t('checklist.dataCallout') }}</p>

    <RequirementsList />
  </div>
</template>

<style scoped>
.checklist-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4);
}

.checklist-view__heading {
  font-size: var(--text-2xl);
  font-weight: 700;
}

.checklist-view__subheading {
  color: var(--color-text-secondary);
}

.checklist-view__callout {
  background: var(--color-presenter-bg);
  border: 1px solid var(--color-presenter-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-presenter-text);
}
</style>
