<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import StatusBadge from '@/components/common/StatusBadge.vue'
import ProgramCard from '@/components/status/ProgramCard.vue'

const props = defineProps({
  overallStatus: { type: String, required: true },
  programs: { type: Array, required: true },
  caseCode: { type: String, required: true },
})

const { t } = useI18n()

const MESSAGE_KEY = {
  action_needed: 'status.actionNeededMessage',
  in_review: 'status.onTrackMessage',
  received: 'status.onTrackMessage',
  decision_pending: 'status.decisionPendingMessage',
  approved: 'status.onTrackMessage',
  denied: 'status.onHoldMessage',
  on_hold: 'status.onHoldMessage',
}

const message = computed(() => t(MESSAGE_KEY[props.overallStatus] || 'status.onTrackMessage'))
</script>

<template>
  <section class="status-overview">
    <p class="status-overview__case-code">{{ t('status.caseCodeLabel') }}: {{ caseCode }}</p>
    <StatusBadge :status="overallStatus" size="lg" />
    <p class="status-overview__message">{{ message }}</p>

    <h2 class="status-overview__heading">{{ t('status.programsHeading') }}</h2>
    <div class="status-overview__programs">
      <ProgramCard v-for="program in programs" :key="program.id" :program="program" />
    </div>
  </section>
</template>

<style scoped>
.status-overview {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
}

.status-overview__case-code {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.status-overview__message {
  color: var(--color-text-secondary);
  font-size: var(--text-lg);
}

.status-overview__heading {
  margin-top: var(--space-3);
  font-size: var(--text-lg);
  font-weight: 700;
}

.status-overview__programs {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
</style>
