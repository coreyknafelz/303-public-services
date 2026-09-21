<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const chartData = computed(() => ({
  labels: ['Mail / fax', 'Portal upload'],
  datasets: [
    {
      data: [100, 60],
      backgroundColor: ['#c9beda', '#604a82'],
      borderRadius: 6,
      barThickness: 22,
    },
  ],
}))

const chartOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { display: false },
    y: { grid: { display: false } },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` relative processing time: ${ctx.parsed.x}`,
      },
    },
  },
}
</script>

<template>
  <div class="processing-time-bar">
    <div class="processing-time-bar__chart-wrap">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
    <p class="processing-time-bar__callout">{{ t('confirmation.dataCallout') }}</p>
  </div>
</template>

<style scoped>
.processing-time-bar {
  background: var(--color-presenter-bg);
  border: 1px solid var(--color-presenter-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.processing-time-bar__chart-wrap {
  height: 80px;
}

.processing-time-bar__callout {
  font-size: var(--text-sm);
  color: var(--color-presenter-text);
  margin: var(--space-3) 0 0;
}
</style>
