<script setup>
import { useI18n } from 'vue-i18n'
import { useCaseStore } from '@/stores/caseStore'
import RequirementItem from '@/components/checklist/RequirementItem.vue'

const { t } = useI18n()
const caseStore = useCaseStore()
</script>

<template>
  <div class="requirements-list">
    <template v-if="caseStore.requirements.length">
      <RequirementItem v-for="requirement in caseStore.requirements" :key="requirement.id" :requirement="requirement" />
    </template>
    <div v-else class="requirements-list__empty">
      <h3>{{ t('checklist.allDoneHeading') }}</h3>
      <p>{{ t('checklist.allDoneMessage') }}</p>
    </div>
  </div>
</template>

<style scoped>
.requirements-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.requirements-list__empty {
  text-align: center;
  padding: var(--space-8) var(--space-4);
  color: var(--color-text-secondary);
}
</style>
