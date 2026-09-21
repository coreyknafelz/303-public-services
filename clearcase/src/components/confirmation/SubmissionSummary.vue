<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  docs: { type: Array, required: true }, // [{ requirementId, label, submittedAt }]
  caseCode: { type: String, required: true },
})

const { t, d } = useI18n()

function formatTimestamp(iso) {
  return d(new Date(iso), 'short')
}
</script>

<template>
  <div class="submission-summary">
    <h2 class="submission-summary__heading">{{ t('confirmation.submittedHeading') }}</h2>
    <ul class="submission-summary__list">
      <li v-for="doc in docs" :key="doc.requirementId" class="submission-summary__item">
        <p class="submission-summary__doc">{{ doc.label }}</p>
        <p class="submission-summary__meta">{{ t('confirmation.submittedAt') }}: {{ formatTimestamp(doc.submittedAt) }}</p>
        <p class="submission-summary__meta">{{ t('confirmation.attachedTo') }}: {{ caseCode }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.submission-summary__heading {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-2);
}

.submission-summary__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.submission-summary__item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  background: var(--color-surface);
}

.submission-summary__doc {
  font-weight: 600;
}

.submission-summary__meta {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
</style>
