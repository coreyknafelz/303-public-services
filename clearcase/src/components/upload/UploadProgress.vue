<script setup>
import { useI18n } from 'vue-i18n'
import ProgressBar from '@/components/common/ProgressBar.vue'

defineProps({
  progress: { type: Number, required: true },
})

const { t } = useI18n()
</script>

<template>
  <div class="upload-progress">
    <ProgressBar :value="progress" :label="t('upload.uploading', { progress })" />
  </div>
</template>
