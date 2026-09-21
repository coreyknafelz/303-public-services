<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  errorMessage: { type: String, default: '' },
})
const emit = defineEmits(['submit', 'back'])

const { t } = useI18n()
const email = ref('')
const password = ref('')

function handleSubmit() {
  emit('submit', { email: email.value, password: password.value })
}
</script>

<template>
  <form class="sign-in-form" @submit.prevent="handleSubmit">
    <h2 class="sign-in-form__heading">{{ t('entry.signInHeading') }}</h2>

    <label class="sign-in-form__label" for="email">{{ t('entry.emailLabel') }}</label>
    <input id="email" v-model="email" class="sign-in-form__field" type="email" autocomplete="email" required />

    <label class="sign-in-form__label" for="password">{{ t('entry.passwordLabel') }}</label>
    <input
      id="password"
      v-model="password"
      class="sign-in-form__field"
      type="password"
      autocomplete="current-password"
      required
    />

    <p v-if="props.errorMessage" class="sign-in-form__error" role="alert">{{ props.errorMessage }}</p>

    <button type="submit" class="sign-in-form__submit">{{ t('entry.signInSubmit') }}</button>
    <button type="button" class="sign-in-form__back" @click="emit('back')">{{ t('entry.backToCaseCode') }}</button>
  </form>
</template>

<style scoped>
.sign-in-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sign-in-form__heading {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-2);
}

.sign-in-form__label {
  font-weight: 600;
}

.sign-in-form__field {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  background: var(--color-surface);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.sign-in-form__error {
  font-size: var(--text-sm);
  color: var(--color-status-denied);
  font-weight: 600;
}

.sign-in-form__submit {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-weight: 600;
}

.sign-in-form__back {
  background: transparent;
  border: none;
  color: var(--color-secondary);
  font-weight: 600;
  padding: var(--space-2);
}
</style>
