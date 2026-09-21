import { defineStore } from 'pinia'

/** Fake upload with progress events, standing in for a real XHR/fetch call. */
function simulateUpload(onProgress) {
  return new Promise((resolve, reject) => {
    let progress = 0
    const fail = Math.random() < 0.1 // occasional simulated failure for the error-state UI
    const timer = setInterval(() => {
      progress += Math.random() * 22 + 8
      if (progress >= 100) {
        clearInterval(timer)
        onProgress(100)
        if (fail) reject(new Error('network'))
        else resolve()
        return
      }
      onProgress(Math.round(progress))
    }, 220)
  })
}

const ERROR_MAP = {
  network: {
    code: 'network',
    message: 'Your connection dropped partway through the upload.',
    recoveryAction: 'Check your signal and try again.',
  },
  default: {
    code: 'unknown',
    message: 'Something went wrong on our end while saving your file.',
    recoveryAction: 'Try again — your photo has not been lost.',
  },
}

function mapUploadError(err) {
  return ERROR_MAP[err?.message] || ERROR_MAP.default
}

export const useUploadStore = defineStore('upload', {
  state: () => ({
    currentFile: null, // { blob, dataUrl, requirementId }
    qualityResult: null, // 'pass' | 'warn' | null
    status: 'idle', // 'idle' | 'previewing' | 'checking' | 'uploading' | 'success' | 'error'
    progress: 0,
    error: null, // { code, message, recoveryAction }
    savedSession: null,
  }),
  actions: {
    setFile(blob, dataUrl, requirementId) {
      this.$patch({ currentFile: { blob, dataUrl, requirementId }, status: 'previewing', qualityResult: null })
    },
    setQualityResult(result) {
      this.qualityResult = result
      this.status = 'previewing'
    },
    async uploadFile() {
      this.status = 'uploading'
      this.progress = 0
      this.error = null
      try {
        await simulateUpload((p) => {
          this.progress = p
        })
        this.status = 'success'
        this.progress = 100
      } catch (err) {
        this.status = 'error'
        this.error = mapUploadError(err)
      }
    },
    reset() {
      this.$patch({ currentFile: null, qualityResult: null, status: 'idle', progress: 0, error: null })
    },
  },
})
