import { useMutation } from '@tanstack/react-query'
import { fetchReportCsv } from '../services/reports'

// Argumentos para descargar un reporte en CSV (RF-26). El path es el endpoint
// del reporte y filename el nombre del archivo que vera el usuario.
interface ExportReportArgs {
  path: string
  filename: string
  params?: Record<string, unknown>
}

// Pide el CSV al backend, arma un Blob y dispara la descarga en el cliente.
// Sigue el mismo patron que useExportGtfs.
async function downloadReportCsv({ path, filename, params }: ExportReportArgs) {
  const csv = await fetchReportCsv(path, params)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function useExportReport() {
  return useMutation({ mutationFn: downloadReportCsv })
}
