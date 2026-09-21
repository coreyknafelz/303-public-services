<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'
import { useCaseStore } from '@/stores/caseStore'

const { t } = useI18n()
const router = useRouter()
const uiStore = useUiStore()
const caseStore = useCaseStore()

function goToHelp() {
  uiStore.closeHelpDrawer()
  router.push({ name: 'help' })
}
</script>

<template>
  <div v-if="uiStore.helpDrawerOpen" class="help-drawer__backdrop" @click.self="uiStore.closeHelpDrawer()">
    <div class="help-drawer" role="dialog" aria-modal="true" :aria-label="t('help.heading')">
      <div class="help-drawer__handle" aria-hidden="true" />
      <h2 class="help-drawer__title">{{ t('help.heading') }}</h2>

      <a v-if="caseStore.caseworker" class="help-drawer__link" :href="`tel:${caseStore.caseworker.phone}`">
        {{ t('status.callButton') }} {{ caseStore.caseworker.name }} ({{ caseStore.caseworker.phone }})
      </a>

      <button type="button" class="help-drawer__link help-drawer__link--btn" @click="goToHelp">
        {{ t('help.faqHeading') }}
      </button>

      <button type="button" class="help-drawer__close" @click="uiStore.closeHelpDrawer()">
        {{ t('common.close') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.help-drawer__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(24, 19, 32, 0.4);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 50;
}

.help-drawer {
  width: 100%;
  max-width: var(--max-w-mobile);
  background: var(--color-surface);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  padding: var(--space-4) var(--space-4) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.help-drawer__handle {
  width: 40px;
  height: 4px;
  border-radius: 999px;
  background: var(--color-border);
  margin: 0 auto var(--space-2);
}

.help-drawer__title {
  font-size: var(--text-xl);
  font-weight: 700;
}

.help-drawer__link {
  display: block;
  width: 100%;
  text-align: left;
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
  color: var(--color-text-primary);
  text-decoration: none;
}

.help-drawer__link--btn {
  font: inherit;
}

.help-drawer__close {
  margin-top: var(--space-2);
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  font-weight: 600;
}
</style>
