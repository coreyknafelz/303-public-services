<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (v) =>
      ['received', 'in_review', 'action_needed', 'decision_pending', 'approved', 'denied', 'on_hold'].includes(v),
  },
  size: { type: String, default: 'md' }, // 'md' | 'lg'
})

const { t } = useI18n()

const STYLE_MAP = {
  received: { color: 'var(--shadow-grey-600)', bg: 'var(--shadow-grey-100)', icon: '●' },
  in_review: { color: 'var(--shadow-grey-600)', bg: 'var(--shadow-grey-100)', icon: '↻' },
  action_needed: { color: 'var(--color-status-action)', bg: 'var(--color-status-action-bg)', icon: '⚠' },
  decision_pending: { color: 'var(--shadow-grey-600)', bg: 'var(--shadow-grey-100)', icon: '◷' },
  approved: { color: 'var(--color-status-track)', bg: 'var(--color-status-track-bg)', icon: '✓' },
  denied: { color: 'var(--color-status-denied)', bg: 'var(--color-status-denied-bg)', icon: '✕' },
  on_hold: { color: 'var(--color-status-hold)', bg: 'var(--color-status-hold-bg)', icon: '‖' },
}

const style = computed(() => STYLE_MAP[props.status])
const label = computed(() => t(`statusLabel.${props.status}`))
</script>

<template>
  <span
    class="status-badge"
    :class="`status-badge--${size}`"
    :style="{ color: style.color, backgroundColor: style.bg }"
  >
    <span class="status-badge__icon" aria-hidden="true">{{ style.icon }}</span>
    <span class="status-badge__label">{{ label }}</span>
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  border-radius: 999px;
  font-weight: 600;
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-sm);
}

.status-badge--lg {
  font-size: var(--text-lg);
  padding: var(--space-2) var(--space-4);
}

.status-badge__icon {
  font-size: 1em;
  line-height: 1;
}
</style>
