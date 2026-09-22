<script setup>
import { useI18n } from 'vue-i18n'
import StatusBadge from '@/components/common/StatusBadge.vue'

defineProps({
  program: { type: Object, required: true }, // { id, name, status, statusLabel }
})

const { t } = useI18n()
</script>

<template>
  <div class="program-card">
    <span class="program-card__name">{{ t(`programs.${program.nameKey}`) }}</span>
    <StatusBadge :status="program.status" />
  </div>
</template>

<style scoped>
.program-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.program-card__name {
  font-weight: 600;
}
</style>
