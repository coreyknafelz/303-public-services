<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const callbackPhone = ref('')
const callbackConfirmed = ref(false)

function submitCallback() {
  if (!callbackPhone.value) return
  callbackConfirmed.value = true
}

const faqs = ['q1', 'q2', 'q3']
</script>

<template>
  <div class="help-view">
    <h1 class="help-view__heading">{{ t('help.heading') }}</h1>

    <section class="help-view__section">
      <h2 class="help-view__section-heading">{{ t('help.faqHeading') }}</h2>
      <details v-for="key in faqs" :key="key" class="help-view__faq">
        <summary>{{ t(`help.faq.q${key.slice(1)}`) }}</summary>
        <p>{{ t(`help.faq.a${key.slice(1)}`) }}</p>
      </details>
    </section>

    <section class="help-view__section">
      <h2 class="help-view__section-heading">{{ t('help.callbackHeading') }}</h2>
      <p class="help-view__muted">{{ t('help.callbackSubtext') }}</p>
      <p v-if="callbackConfirmed" class="help-view__confirmed">{{ t('help.callbackConfirmed') }}</p>
      <form v-else class="help-view__form" @submit.prevent="submitCallback">
        <input
          v-model="callbackPhone"
          type="tel"
          class="help-view__field"
          :placeholder="t('help.callbackPhoneLabel')"
          autocomplete="tel"
        />
        <button type="submit" class="help-view__submit">{{ t('help.callbackSubmit') }}</button>
      </form>
    </section>

    <section class="help-view__section">
      <h2 class="help-view__section-heading">{{ t('help.officeHeading') }}</h2>
      <p>{{ t('help.officeAddress') }}</p>
      <p class="help-view__muted">{{ t('help.officeAddressLine') }}</p>
      <p class="help-view__muted">{{ t('help.officeHours') }}</p>
    </section>

    <section v-if="locale === 'es'" class="help-view__section help-view__section--language">
      <h2 class="help-view__section-heading">{{ t('help.languageAssistanceHeading') }}</h2>
      <p>{{ t('help.languageAssistanceText') }}</p>
    </section>

  </div>
</template>

<style scoped>
.help-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-4);
}

.help-view__heading {
  font-size: var(--text-2xl);
  font-weight: 700;
}

.help-view__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.help-view__section--language {
  background: var(--color-status-hold-bg);
  border-radius: var(--radius-md);
  padding: var(--space-3);
}

.help-view__section-heading {
  font-size: var(--text-lg);
  font-weight: 700;
}

.help-view__muted {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

.help-view__faq {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  background: var(--color-surface);
}

.help-view__faq summary {
  font-weight: 600;
  cursor: pointer;
}

.help-view__faq p {
  margin-top: var(--space-2);
  color: var(--color-text-secondary);
}

.help-view__form {
  display: flex;
  gap: var(--space-2);
}

.help-view__field {
  flex: 1;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  background: var(--color-surface);
}

.help-view__submit {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  font-weight: 700;
  white-space: nowrap;
}

.help-view__confirmed {
  background: var(--color-status-track-bg);
  color: var(--color-status-track);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-weight: 600;
}
</style>
