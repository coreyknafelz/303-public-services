<script setup>
import { useI18n } from 'vue-i18n'
import RequirementsList from '@/components/checklist/RequirementsList.vue'

const { t } = useI18n()
</script>

<template>
  <div class="checklist-view">
    <h1 class="checklist-view__heading">{{ t('checklist.heading') }}</h1>
    <p class="checklist-view__subheading">{{ t('checklist.subheading') }}</p>

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

</style>
