/**
 * Camera-first capture + client-side compression before upload.
 * Downstream: capture → compress → preview → quality check → upload.
 */
export function useUpload() {
  function compressImage(blob, maxSizeKB = 800) {
    return new Promise((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(blob)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const scale = Math.min(1, Math.sqrt((maxSizeKB * 1024) / blob.size))
        canvas.width = Math.max(1, Math.round(img.width * scale))
        canvas.height = Math.max(1, Math.round(img.height * scale))
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        canvas.toBlob(
          (compressed) => {
            URL.revokeObjectURL(url)
            resolve(compressed || blob)
          },
          'image/jpeg',
          0.82,
        )
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        resolve(blob)
      }
      img.src = url
    })
  }

  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  return { compressImage, blobToDataUrl }
}
