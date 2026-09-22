<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useCaseStore } from '@/stores/caseStore'
import SubmissionSummary from '@/components/confirmation/SubmissionSummary.vue'
import SmsOptIn from '@/components/confirmation/SmsOptIn.vue'

const { t } = useI18n()
const router = useRouter()
const caseStore = useCaseStore()
</script>

<template>
  <div class="confirmation-view">
    <h1 class="confirmation-view__heading">{{ t('confirmation.heading') }}</h1>
    <p class="confirmation-view__expectation">{{ t('confirmation.expectation') }}</p>

    <SubmissionSummary v-if="caseStore.submittedDocs.length" :docs="caseStore.submittedDocs" :case-code="caseStore.caseCode" />

    <SmsOptIn />

    <button type="button" class="confirmation-view__back" @click="router.push({ name: 'status' })">
      {{ t('confirmation.backToCase') }}
    </button>
  </div>
</template>

<style scoped>
.confirmation-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4);
}

.confirmation-view__heading {
  font-size: var(--text-2xl);
  font-weight: 700;
}

.confirmation-view__expectation {
  color: var(--color-text-secondary);
}

.confirmation-view__back {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-weight: 700;
}
</style>
