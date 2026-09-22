<script setup>
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const chartData = computed(() => ({
  labels: [t('checklist.urgentBadge'), t('statusLabel.in_review')],
  datasets: [
    {
      data: [35, 65],
      backgroundColor: ['#9e7661', '#e4dfec'],
      borderWidth: 0,
      hoverOffset: 4,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '72%',
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.parsed}%`,
      },
    },
  },
}
</script>

<template>
  <div class="delay-donut" role="img" :aria-label="t('charts.delaySummary')">
    <div class="delay-donut__chart-wrap">
      <Doughnut :data="chartData" :options="chartOptions" />
      <div class="delay-donut__center-label" aria-hidden="true">
        <span class="delay-donut__pct">35%</span>
      </div>
    </div>
    <p class="delay-donut__callout">{{ t('status.dataCallout') }}</p>
  </div>
</template>

<style scoped>
.delay-donut {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  background: var(--color-presenter-bg);
  border: 1px solid var(--color-presenter-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.delay-donut__chart-wrap {
  position: relative;
  width: 96px;
  height: 96px;
  flex-shrink: 0;
}

.delay-donut__center-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delay-donut__pct {
  font-weight: 700;
  font-size: var(--text-lg);
  color: var(--color-secondary);
}

.delay-donut__callout {
  font-size: var(--text-sm);
  color: var(--color-presenter-text);
  margin: 0;
}
</style>
