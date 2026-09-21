<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const props = defineProps({
  requirement: { type: Object, required: true }, // { id, label, description, deadline, urgent, fulfilled }
})

const { t, d } = useI18n()
const router = useRouter()

const formattedDeadline = computed(() => d(new Date(`${props.requirement.deadline}T00:00:00`), 'short'))

function goToUpload() {
  router.push({ name: 'upload', params: { requirementId: props.requirement.id } })
}
</script>

<template>
  <div class="requirement-item" :class="{ 'is-fulfilled': requirement.fulfilled }">
    <div class="requirement-item__main">
      <div class="requirement-item__header">
        <h3 class="requirement-item__label">{{ requirement.label }}</h3>
        <span v-if="requirement.fulfilled" class="requirement-item__badge requirement-item__badge--done">
          {{ t('checklist.fulfilledBadge') }}
        </span>
        <span v-else-if="requirement.urgent" class="requirement-item__badge requirement-item__badge--urgent">
          {{ t('checklist.urgentBadge') }}
        </span>
      </div>
      <p class="requirement-item__description">{{ requirement.description }}</p>
      <p class="requirement-item__deadline">{{ t('checklist.deadlineLabel') }} {{ formattedDeadline }}</p>
    </div>
    <button v-if="!requirement.fulfilled" type="button" class="requirement-item__cta" @click="goToUpload">
      {{ t('checklist.uploadCta') }}
    </button>
  </div>
</template>

<style scoped>
.requirement-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.requirement-item.is-fulfilled {
  opacity: 0.7;
}

.requirement-item__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.requirement-item__header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.requirement-item__label {
  font-size: var(--text-base);
  font-weight: 700;
}

.requirement-item__badge {
  font-size: var(--text-xs);
  font-weight: 700;
  padding: 2px var(--space-2);
  border-radius: 999px;
}

.requirement-item__badge--urgent {
  background: var(--color-status-action-bg);
  color: var(--color-status-action);
}

.requirement-item__badge--done {
  background: var(--color-status-track-bg);
  color: var(--color-status-track);
}

.requirement-item__description {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

.requirement-item__deadline {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}

.requirement-item__cta {
  flex-shrink: 0;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-4);
  font-weight: 600;
}
</style>
