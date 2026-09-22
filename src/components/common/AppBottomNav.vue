<script setup>
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t } = useI18n()

const items = [
  { name: 'status', label: 'status' },
  { name: 'checklist', label: 'checklist' },
  { name: 'help', label: 'help' },
]

function isActive(name) {
  if (name === 'checklist') return ['checklist', 'upload'].includes(route.name)
  return route.name === name
}
</script>

<template>
  <nav v-if="route.name !== 'entry'" class="app-bottom-nav" :aria-label="t('navigation.label')">
    <RouterLink
      v-for="item in items"
      :key="item.name"
      :to="{ name: item.name }"
      class="app-bottom-nav__link"
      :class="{ 'is-active': isActive(item.name) }"
      :aria-current="isActive(item.name) ? 'page' : undefined"
    >
      <span class="app-bottom-nav__icon" aria-hidden="true">
        {{ item.name === 'status' ? '◉' : item.name === 'checklist' ? '✓' : '?' }}
      </span>
      <span>{{ t(`navigation.${item.label}`) }}</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.app-bottom-nav {
  position: fixed;
  z-index: 30;
  right: 0;
  bottom: 0;
  left: 50%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: min(100%, var(--max-w-mobile));
  padding: var(--space-2) var(--space-3) calc(var(--space-2) + env(safe-area-inset-bottom));
  transform: translateX(-50%);
  border-top: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 94%, transparent);
  box-shadow: 0 -4px 16px rgb(24 19 32 / 8%);
  backdrop-filter: blur(12px);
}

.app-bottom-nav__link {
  display: flex;
  min-height: var(--touch-min);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
  font-size: var(--text-xs);
  font-weight: 600;
  text-decoration: none;
}

.app-bottom-nav__link.is-active {
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.app-bottom-nav__icon {
  font-size: var(--text-lg);
  line-height: 1;
}
</style>