<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const phone = ref('')
const confirmed = ref(false)

function handleSubmit() {
  if (!phone.value) return
  confirmed.value = true
}
</script>

<template>
  <div class="sms-opt-in">
    <h2 class="sms-opt-in__heading">{{ t('confirmation.smsHeading') }}</h2>
    <p v-if="confirmed" class="sms-opt-in__confirmed">{{ t('confirmation.smsConfirmed') }}</p>
    <form v-else class="sms-opt-in__form" @submit.prevent="handleSubmit">
      <input
        v-model="phone"
        type="tel"
        class="sms-opt-in__field"
        :placeholder="t('confirmation.smsPlaceholder')"
        autocomplete="tel"
      />
      <button type="submit" class="sms-opt-in__submit">{{ t('confirmation.smsSubmit') }}</button>
    </form>
  </div>
</template>

<style scoped>
.sms-opt-in__heading {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-2);
}

.sms-opt-in__form {
  display: flex;
  gap: var(--space-2);
}

.sms-opt-in__field {
  flex: 1;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  background: var(--color-surface);
}

.sms-opt-in__submit {
  background: var(--color-secondary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  font-weight: 700;
  white-space: nowrap;
}

.sms-opt-in__confirmed {
  background: var(--color-status-track-bg);
  color: var(--color-status-track);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-weight: 600;
}
</style>
