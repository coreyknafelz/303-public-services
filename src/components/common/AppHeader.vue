<script setup>
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/uiStore'
import { useLocale } from '@/composables/useLocale'

const { t } = useI18n()
const uiStore = useUiStore()
const { toggle } = useLocale()
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="app-header__brand">{{ t('app.name') }}</RouterLink>

    <div class="app-header__actions">
      <button type="button" class="app-header__btn" @click="toggle()">
        {{ t('header.languageToggle') }}
      </button>
      <button type="button" class="app-header__btn app-header__btn--help" @click="uiStore.openHelpDrawer()">
        {{ t('header.help') }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 20;
}

.app-header__brand {
  font-weight: 700;
  font-size: var(--text-lg);
  color: var(--color-primary);
  text-decoration: none;
}

.app-header__actions {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.app-header__btn {
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.app-header__btn--help {
  border-color: var(--color-primary);
  color: var(--color-primary);
}
</style>
