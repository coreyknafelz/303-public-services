<script setup>
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['file-selected'])
const { t } = useI18n()

function onFileChange(event) {
  const file = event.target.files?.[0]
  if (file) emit('file-selected', file)
  event.target.value = ''
}
</script>

<template>
  <div class="upload-trigger">
    <label class="upload-trigger__btn upload-trigger__btn--primary">
      {{ t('upload.takePhoto') }}
      <input type="file" accept="image/*" capture="environment" class="upload-trigger__input" @change="onFileChange" />
    </label>
    <label class="upload-trigger__btn upload-trigger__btn--secondary">
      {{ t('upload.chooseFile') }}
      <input type="file" accept="image/*,.pdf" class="upload-trigger__input" @change="onFileChange" />
    </label>
  </div>
</template>

<style scoped>
.upload-trigger {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.upload-trigger__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: var(--radius-md);
  padding: var(--space-4);
  font-weight: 700;
  font-size: var(--text-base);
}

.upload-trigger__btn--primary {
  background: var(--color-primary);
  color: white;
}

.upload-trigger__btn--secondary {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
}

.upload-trigger__input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  overflow: hidden;
}
</style>
