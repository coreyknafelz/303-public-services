<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  errorMessage: { type: String, default: '' },
})
const emit = defineEmits(['submit'])

const { t } = useI18n()
const code = ref('')

function handleSubmit() {
  emit('submit', code.value)
}
</script>

<template>
  <form class="case-code-input" @submit.prevent="handleSubmit">
    <label class="case-code-input__label" for="case-code">{{ t('entry.caseCodeLabel') }}</label>
    <input
      id="case-code"
      v-model="code"
      class="case-code-input__field"
      type="text"
      inputmode="text"
      autocomplete="off"
      :placeholder="t('entry.caseCodePlaceholder')"
      :aria-describedby="props.errorMessage ? 'case-code-error' : 'case-code-hint'"
    />
    <p id="case-code-hint" class="case-code-input__hint">{{ t('entry.caseCodeHint') }}</p>
    <p v-if="props.errorMessage" id="case-code-error" class="case-code-input__error" role="alert">
      {{ props.errorMessage }}
    </p>
    <button type="submit" class="case-code-input__submit">{{ t('entry.submit') }}</button>
  </form>
</template>

<style scoped>
.case-code-input {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.case-code-input__label {
  font-weight: 600;
}

.case-code-input__field {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-size: var(--text-lg);
  background: var(--color-surface);
  color: var(--color-text-primary);
}

.case-code-input__hint {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.case-code-input__error {
  font-size: var(--text-sm);
  color: var(--color-status-denied);
  font-weight: 600;
}

.case-code-input__submit {
  margin-top: var(--space-2);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-size: var(--text-base);
  font-weight: 600;
}

.case-code-input__submit:hover {
  background: var(--color-primary-hover);
}
</style>
