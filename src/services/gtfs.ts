import { api } from './http'

// Cada campo es un archivo del feed GTFS en formato CSV (texto).
export interface GtfsFeed {
  'agency.txt': string
  'routes.txt': string
  'stops.txt': string
  'trips.txt': string
  'stop_times.txt': string
}

// Pide el feed GTFS al backend (RF-24).
export const exportGtfs = () => api<GtfsFeed>('/gtfs/export')

// Descarga cada archivo del feed como un .txt en el navegador.
export function downloadGtfsFiles(feed: GtfsFeed): void {
  for (const [name, content] of Object.entries(feed)) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = name
    link.click()
    URL.revokeObjectURL(url)
  }
}
