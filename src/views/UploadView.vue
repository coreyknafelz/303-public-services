<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useCaseStore } from '@/stores/caseStore'
import { useUploadStore } from '@/stores/uploadStore'
import { useUpload } from '@/composables/useUpload'
import { useQualityCheck } from '@/composables/useQualityCheck'
import UploadTrigger from '@/components/upload/UploadTrigger.vue'
import PhotoPreview from '@/components/upload/PhotoPreview.vue'
import UploadProgress from '@/components/upload/UploadProgress.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const caseStore = useCaseStore()
const uploadStore = useUploadStore()
const { compressImage, blobToDataUrl } = useUpload()
const { analyze } = useQualityCheck()

const isImage = ref(true)
const qualityStatus = ref(null) // 'checking' | 'pass' | 'warn' | null

const requirement = computed(() => caseStore.requirements.find((r) => r.id === route.params.requirementId))

onBeforeMount(() => {
  if (!requirement.value) {
    router.replace({ name: 'checklist' })
    return
  }
  uploadStore.reset()
})

async function handleFileSelected(file) {
  isImage.value = file.type.startsWith('image/')
  const processed = isImage.value ? await compressImage(file) : file
  const dataUrl = await blobToDataUrl(processed)
  uploadStore.setFile(processed, dataUrl, requirement.value.id)

  if (isImage.value) {
    qualityStatus.value = 'checking'
    const result = await analyze(processed)
    uploadStore.setQualityResult(result)
    qualityStatus.value = result
  } else {
    qualityStatus.value = null
  }
}

function handleRetake() {
  uploadStore.reset()
  qualityStatus.value = null
}

async function handleConfirm() {
  await uploadStore.uploadFile()
  if (uploadStore.status === 'success') {
    caseStore.markRequirementFulfilled(requirement.value.id)
    caseStore.addSubmittedDoc({
      requirementId: requirement.value.id,
      labelKey: requirement.value.labelKey,
      submittedAt: new Date().toISOString(),
    })
  }
}

function handleContinue() {
  router.push({ name: 'confirmation' })
}

function handleTryAgain() {
  uploadStore.uploadFile()
}
</script>

<template>
  <div v-if="requirement" class="upload-view">
    <RouterLink :to="{ name: 'checklist' }" class="upload-view__back">{{ t('upload.backToChecklist') }}</RouterLink>

    <h1 class="upload-view__heading">{{ t('upload.heading', { label: t(`requirements.${requirement.labelKey}`) }) }}</h1>

    <div class="upload-view__why">
      <p class="upload-view__why-label">{{ t('upload.why') }}</p>
      <p>{{ t(`requirements.${requirement.descriptionKey}`) }}</p>
    </div>

    <template v-if="uploadStore.status === 'idle'">
      <p class="upload-view__hint">{{ t('upload.formatHint') }}</p>
      <UploadTrigger @file-selected="handleFileSelected" />
    </template>

    <template v-else-if="uploadStore.status === 'previewing'">
      <PhotoPreview
        :data-url="uploadStore.currentFile.dataUrl"
        :is-image="isImage"
        :quality-status="qualityStatus"
        @retake="handleRetake"
        @confirm="handleConfirm"
      />
    </template>

    <template v-else-if="uploadStore.status === 'uploading'">
      <UploadProgress :progress="uploadStore.progress" />
    </template>

    <template v-else-if="uploadStore.status === 'success'">
      <div class="upload-view__result upload-view__result--success">
        <h2>{{ t('upload.successHeading') }}</h2>
        <p>{{ t('upload.successMessage') }}</p>
        <button type="button" class="upload-view__continue" @click="handleContinue">{{ t('upload.continue') }}</button>
      </div>
    </template>

    <template v-else-if="uploadStore.status === 'error'">
      <div class="upload-view__result upload-view__result--error">
        <h2>{{ t('upload.errorHeading') }}</h2>
        <p>{{ t(`upload.errors.${uploadStore.error.code}.message`) }}</p>
        <p class="upload-view__recovery">{{ t(`upload.errors.${uploadStore.error.code}.recoveryAction`) }}</p>
        <button type="button" class="upload-view__continue" @click="handleTryAgain">{{ t('upload.tryAgain') }}</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.upload-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4);
}

.upload-view__back {
  color: var(--color-secondary);
  font-weight: 600;
  text-decoration: none;
  font-size: var(--text-sm);
}

.upload-view__heading {
  font-size: var(--text-xl);
  font-weight: 700;
}

.upload-view__why {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
}

.upload-view__why-label {
  font-weight: 700;
  font-size: var(--text-sm);
  margin-bottom: var(--space-1);
}

.upload-view__hint {
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

.upload-view__result {
  border-radius: var(--radius-md);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.upload-view__result--success {
  background: var(--color-status-track-bg);
  color: var(--color-status-track);
}

.upload-view__result--error {
  background: var(--color-status-denied-bg);
  color: var(--color-status-denied);
}

.upload-view__recovery {
  font-weight: 600;
}

.upload-view__continue {
  align-self: flex-start;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-5);
  font-weight: 700;
}
</style>
