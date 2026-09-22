<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  timeline: { type: Array, required: true }, // [{ date, event, completed, current }]
})

const { t, d } = useI18n()

function formatDate(dateStr) {
  if (!dateStr) return ''
  return d(new Date(`${dateStr}T00:00:00`), 'short')
}
</script>

<template>
  <div class="timeline-steps">
    <h2 class="timeline-steps__heading">{{ t('status.timelineHeading') }}</h2>
    <ol class="timeline-steps__list">
      <li
        v-for="step in timeline"
        :key="step.eventKey"
        class="timeline-steps__item"
        :class="{
          'is-completed': step.completed,
          'is-current': step.current,
        }"
      >
        <span class="timeline-steps__dot" aria-hidden="true" />
        <div class="timeline-steps__content">
          <p class="timeline-steps__event">{{ t(`timeline.events.${step.eventKey}`) }}</p>
          <p v-if="step.date" class="timeline-steps__date">{{ formatDate(step.date) }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.timeline-steps__heading {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-3);
}

.timeline-steps__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.timeline-steps__item {
  display: flex;
  gap: var(--space-3);
  padding-bottom: var(--space-4);
  position: relative;
}

.timeline-steps__item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 16px;
  bottom: -4px;
  width: 2px;
  background: var(--color-border);
}

.timeline-steps__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-border);
  margin-top: 4px;
  flex-shrink: 0;
}

.timeline-steps__item.is-completed .timeline-steps__dot {
  background: var(--color-status-track);
}

.timeline-steps__item.is-current .timeline-steps__dot {
  background: var(--color-status-action);
  box-shadow: 0 0 0 4px var(--color-status-action-bg);
}

.timeline-steps__event {
  font-weight: 600;
}

.timeline-steps__item:not(.is-completed):not(.is-current) .timeline-steps__event {
  color: var(--color-text-muted);
  font-weight: 400;
}

.timeline-steps__date {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
</style>
