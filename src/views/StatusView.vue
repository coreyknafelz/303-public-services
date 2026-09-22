<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useCaseStore } from '@/stores/caseStore'
import { useUiStore } from '@/stores/uiStore'
import StatusOverview from '@/components/status/StatusOverview.vue'
import CaseworkerInfo from '@/components/status/CaseworkerInfo.vue'
import TimelineSteps from '@/components/charts/TimelineSteps.vue'

const { t } = useI18n()
const router = useRouter()
const caseStore = useCaseStore()
const uiStore = useUiStore()
</script>

<template>
  <div class="status-view">
    <StatusOverview
      :overall-status="caseStore.overallStatus"
      :programs="caseStore.programs"
      :case-code="caseStore.caseCode"
    />

    <button
      v-if="caseStore.hasActionNeeded"
      type="button"
      class="status-view__checklist-cta"
      @click="router.push({ name: 'checklist' })"
    >
      {{ t('status.viewChecklist') }}
    </button>

    <template v-if="!uiStore.lowBandwidth">
      <TimelineSteps :timeline="caseStore.timeline" />
      <CaseworkerInfo v-if="caseStore.caseworker" :caseworker="caseStore.caseworker" />
    </template>

  </div>
</template>

<style scoped>
.status-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: 0 var(--space-4) var(--space-6);
}

.status-view__checklist-cta {
  background: var(--color-status-action);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-weight: 700;
  font-size: var(--text-base);
}

</style>
