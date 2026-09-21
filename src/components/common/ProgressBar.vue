<script setup>
defineProps({
  value: { type: Number, required: true }, // 0-100
  label: { type: String, default: '' },
  color: { type: String, default: 'var(--color-upload-progress)' },
})
</script>

<template>
  <div class="progress-bar" role="progressbar" :aria-valuenow="value" aria-valuemin="0" aria-valuemax="100">
    <div class="progress-bar__track">
      <div class="progress-bar__fill" :style="{ width: `${value}%`, backgroundColor: color }" />
    </div>
    <span v-if="label" class="progress-bar__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.progress-bar {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.progress-bar__track {
  height: 10px;
  border-radius: 999px;
  background: var(--color-border);
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.2s ease;
}

.progress-bar__label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
</style>
