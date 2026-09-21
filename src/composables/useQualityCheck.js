/** Canvas-based brightness heuristic used to flag likely-unreadable document photos. */
export function useQualityCheck() {
  function analyze(blob) {
    return new Promise((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(blob)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
        let total = 0
        for (let i = 0; i < data.length; i += 4) {
          total += data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
        }
        const avg = total / (data.length / 4)
        URL.revokeObjectURL(url)
        // avg < 40: too dark; avg > 230: likely washed out / blank
        resolve(avg < 40 || avg > 230 ? 'warn' : 'pass')
      }
      img.onerror = () => {
        URL.revokeObjectURL(url)
        resolve('pass')
      }
      img.src = url
    })
  }
  return { analyze }
}
