<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useCaseStore } from '@/stores/caseStore'
import CaseCodeInput from '@/components/entry/CaseCodeInput.vue'
import SignInForm from '@/components/entry/SignInForm.vue'
import agencyLogo from '@/assets/MCC_DOHS_logo.svg?raw'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const caseStore = useCaseStore()

const mode = ref('code') // 'code' | 'signin'
const errorMessage = ref('')

const ERROR_KEYS = {
  invalid_format: 'entry.errorInvalidFormat',
  expired: 'entry.errorExpired',
  not_found: 'entry.errorNotFound',
  invalid_credentials: 'entry.errorInvalidCredentials',
}

function goToCase() {
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/status'
  router.push(redirect)
}

function handleCodeSubmit(code) {
  const result = caseStore.authenticateWithCode(code)
  if (result.ok) {
    errorMessage.value = ''
    goToCase()
  } else {
    errorMessage.value = t(ERROR_KEYS[result.reason])
  }
}

function handleSignIn({ email, password }) {
  const result = caseStore.signInWithEmail(email, password)
  if (result.ok) {
    errorMessage.value = ''
    goToCase()
  } else {
    errorMessage.value = t(ERROR_KEYS[result.reason])
  }
}

function switchMode(next) {
  mode.value = next
  errorMessage.value = ''
}
</script>

<template>
  <div class="entry-view">
    <div class="entry-view__brand" v-html="agencyLogo" role="img" aria-label="Meridian County Department of Human Services" />

    <h1 class="entry-view__heading">{{ t('entry.heading') }}</h1>
    <p class="entry-view__subheading">{{ t('entry.subheading') }}</p>

    <CaseCodeInput v-if="mode === 'code'" :error-message="errorMessage" @submit="handleCodeSubmit" />
    <SignInForm v-else :error-message="errorMessage" @submit="handleSignIn" @back="switchMode('code')" />

    <div v-if="mode === 'code'" class="entry-view__alt">
      <span class="entry-view__divider">{{ t('entry.orDivider') }}</span>
      <button type="button" class="entry-view__link" @click="switchMode('signin')">
        {{ t('entry.signInLink') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.entry-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6) var(--space-4);
}

.entry-view__brand {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--space-5) var(--space-4);
  margin: calc(var(--space-6) * -1) calc(var(--space-4) * -1) 0;
}

.entry-view__brand :deep(svg) {
  width: 100%;
  max-width: 260px;
  height: auto;
}

.entry-view__brand :deep(path) {
  fill: white;
}

.entry-view__heading {
  font-size: var(--text-2xl);
  font-weight: 700;
}

.entry-view__subheading {
  color: var(--color-text-secondary);
}

.entry-view__alt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.entry-view__divider {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.entry-view__link {
  background: transparent;
  border: none;
  color: var(--color-secondary);
  font-weight: 600;
  text-decoration: underline;
}
</style>
