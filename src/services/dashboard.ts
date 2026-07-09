import { api, toQuery } from './http'

export interface Kpi {
  title: string
  value: number
  delta?: string
  subtitle?: string
  accent: string
}

export interface AvailabilityPoint {
  day: string
  operativa: number
  mantenimiento: number
}

export interface RouteComplianceItem {
  name: string
  value: number
  color: string
}

export interface RecentAlert {
  id: string
  title: string
  text: string
  time: string // ISO timestamp -> formatear en el front
  tone: 'danger' | 'warning'
}

export const getKpis = () => api<Kpi[]>('/dashboard/kpis')

export const getAvailability = (range: 'week' | 'month' = 'week') =>
  api<AvailabilityPoint[]>(`/dashboard/availability${toQuery({ range })}`)

export const getRouteCompliance = () => api<RouteComplianceItem[]>('/dashboard/route-compliance')

// Adherencia por ruta: buses programados vs en operacion (RF-15).
export interface AdherenceItem {
  routeCode: string
  scheduled: number
  running: number
  adherence: number
}

export const getAdherence = () => api<AdherenceItem[]>('/dashboard/adherence')

export const getRecentAlerts = (limit = 3) => api<RecentAlert[]>(`/dashboard/alerts${toQuery({ limit })}`)
