<script setup>
import { useI18n } from 'vue-i18n'
import QualityCheck from '@/components/upload/QualityCheck.vue'

const props = defineProps({
  dataUrl: { type: String, required: true },
  isImage: { type: Boolean, default: true },
  qualityStatus: { type: String, default: null }, // 'checking' | 'pass' | 'warn' | null
})

const emit = defineEmits(['retake', 'confirm'])
const { t } = useI18n()
</script>

<template>
  <div class="photo-preview">
    <div class="photo-preview__frame">
      <img v-if="isImage" :src="dataUrl" alt="" class="photo-preview__image" />
      <div v-else class="photo-preview__file-icon" aria-hidden="true">📄</div>
    </div>

    <QualityCheck v-if="qualityStatus" :status="qualityStatus" />

    <div class="photo-preview__actions">
      <button type="button" class="photo-preview__btn photo-preview__btn--secondary" @click="emit('retake')">
        {{ t('upload.retake') }}
      </button>
      <button
        type="button"
        class="photo-preview__btn photo-preview__btn--primary"
        :disabled="qualityStatus === 'checking'"
        @click="emit('confirm')"
      >
        {{ t('upload.confirmUpload') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.photo-preview {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.photo-preview__frame {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--color-surface);
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-preview__image {
  width: 100%;
  max-height: 320px;
  object-fit: contain;
}

.photo-preview__file-icon {
  font-size: 48px;
}

.photo-preview__actions {
  display: flex;
  gap: var(--space-3);
}

.photo-preview__btn {
  flex: 1;
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-weight: 700;
}

.photo-preview__btn--primary {
  background: var(--color-primary);
  color: white;
  border: none;
}

.photo-preview__btn--primary:disabled {
  opacity: 0.6;
}

.photo-preview__btn--secondary {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
}
</style>
