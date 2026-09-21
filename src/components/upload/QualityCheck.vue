<script setup>
defineProps({
  status: { type: String, required: true }, // 'checking' | 'pass' | 'warn'
})
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="quality-check" :class="`quality-check--${status}`" role="status">
    <span v-if="status === 'checking'" class="quality-check__spinner" aria-hidden="true" />
    <span v-else class="quality-check__icon" aria-hidden="true">{{ status === 'pass' ? '✓' : '⚠' }}</span>
    <span class="quality-check__text">
      {{ status === 'checking' ? t('upload.qualityChecking') : status === 'pass' ? t('upload.qualityPass') : t('upload.qualityWarn') }}
    </span>
  </div>
</template>

<style scoped>
.quality-check {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 600;
}

.quality-check--checking {
  background: var(--shadow-grey-100);
  color: var(--shadow-grey-700);
}

.quality-check--pass {
  background: var(--color-status-track-bg);
  color: var(--color-status-track);
}

.quality-check--warn {
  background: var(--color-status-action-bg);
  color: var(--color-status-action);
}

.quality-check__spinner {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
