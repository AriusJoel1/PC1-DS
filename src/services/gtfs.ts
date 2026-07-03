import { api } from './http'

export type GtfsExport = {
  'agency.txt': string
  'routes.txt': string
  'stops.txt': string
  'trips.txt': string
  'stop_times.txt': string
}

export const exportGtfs = () => api<GtfsExport>('/gtfs/export')
