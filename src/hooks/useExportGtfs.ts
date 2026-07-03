import { useMutation } from '@tanstack/react-query'
import JSZip from 'jszip'
import { exportGtfs } from '../services/gtfs'

// Descarga el export GTFS y arma un .zip en el cliente (el backend entrega los CSV sueltos)
async function downloadGtfsZip() {
  const files = await exportGtfs()

  const zip = new JSZip()
  for (const [name, content] of Object.entries(files)) {
    zip.file(name, content)
  }
  const blob = await zip.generateAsync({ type: 'blob' })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `gtfs-metroflota-${new Date().toISOString().slice(0, 10)}.zip`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function useExportGtfs() {
  return useMutation({ mutationFn: downloadGtfsZip })
}
