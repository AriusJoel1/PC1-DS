import { useMutation } from '@tanstack/react-query'
import { downloadGtfsFiles, exportGtfs } from '../services/gtfs'

// Pide el feed GTFS y dispara la descarga de los archivos.
export function useGtfsExport() {
  return useMutation({
    mutationFn: async () => {
      const feed = await exportGtfs()
      downloadGtfsFiles(feed)
    },
  })
}
