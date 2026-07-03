import { api, toQuery, type Page } from './http'

export interface Alert {
  id: string
  title: string
  text: string
  tone: 'danger' | 'warning'
  vehicleId: string | null
  routeCode: string | null
  createdAt: string // ISO timestamp -> formatear en el front
  acknowledgedAt: string | null
}

export interface ListAlertsParams {
  tone?: 'danger' | 'warning'
  acknowledged?: 'true' | 'false'
  page?: number
  pageSize?: number
}

export const listAlerts = (params: ListAlertsParams = {}) =>
  api<Page<Alert>>(`/alerts${toQuery(params as Record<string, unknown>)}`)

export const acknowledgeAlert = (id: string) => api<Alert>(`/alerts/${id}/acknowledge`, { method: 'PATCH' })

export const unacknowledgeAlert = (id: string) => api<Alert>(`/alerts/${id}/unacknowledge`, { method: 'PATCH' })
