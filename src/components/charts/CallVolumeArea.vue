<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const chartData = computed(() => ({
  labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
  datasets: [
    {
      data: [2200, 3100, 3500, 3200],
      borderColor: '#795364',
      backgroundColor: 'rgba(121, 83, 100, 0.18)',
      fill: true,
      tension: 0.35,
      pointRadius: 0,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { grid: { display: false } },
    y: { display: false },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.parsed.y.toLocaleString()} unanswered calls`,
      },
    },
  },
}
</script>

<template>
  <div class="call-volume-area">
    <div class="call-volume-area__chart-wrap">
      <Line :data="chartData" :options="chartOptions" />
    </div>
    <p class="call-volume-area__callout">{{ t('help.dataCallout') }}</p>
  </div>
</template>

<style scoped>
.call-volume-area {
  background: var(--color-presenter-bg);
  border: 1px solid var(--color-presenter-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.call-volume-area__chart-wrap {
  height: 90px;
}

.call-volume-area__callout {
  font-size: var(--text-sm);
  color: var(--color-presenter-text);
  margin: var(--space-3) 0 0;
}
</style>
