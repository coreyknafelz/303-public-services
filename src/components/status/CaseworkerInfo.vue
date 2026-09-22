<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  caseworker: { type: Object, required: true }, // { name, phone, ext }
})

const { t } = useI18n()
</script>

<template>
  <div class="caseworker-info">
    <h2 class="caseworker-info__heading">{{ t('status.caseworkerHeading') }}</h2>
    <div class="caseworker-info__row">
      <div class="caseworker-info__avatar" aria-hidden="true">{{ caseworker.name.charAt(0) }}</div>
      <div>
        <p class="caseworker-info__name">{{ caseworker.name }}</p>
        <p class="caseworker-info__phone">{{ caseworker.phone }} {{ t('common.extension') }} {{ caseworker.ext }}</p>
      </div>
      <a class="caseworker-info__call" :href="`tel:${caseworker.phone}`">{{ t('status.callButton') }}</a>
    </div>
  </div>
</template>

<style scoped>
.caseworker-info__heading {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-2);
}

.caseworker-info__row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.caseworker-info__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--shadow-grey-200);
  color: var(--shadow-grey-800);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.caseworker-info__name {
  font-weight: 600;
}

.caseworker-info__phone {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.caseworker-info__call {
  margin-left: auto;
  background: var(--color-primary);
  color: white;
  border-radius: var(--radius-sm);
  padding: var(--space-2) var(--space-4);
  text-decoration: none;
  font-weight: 600;
}
</style>
