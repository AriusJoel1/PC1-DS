import { API_URL } from '../config'
import { api, getAccessToken, refreshAccessToken, toQuery } from './http'

// Reportes operativos (RF-21, RF-22, RF-23). El backend expone tres endpoints
// bajo /reports y cada uno acepta ?format=csv para descargar (RF-26).

// -------------------- RF-22: reporte diario de operacion --------------------

export interface DailyReport {
  date: string
  busesDispatched: number
  fleetTotal: number
  frequencyCompliance: number
  alertsCount: number
  fleetKm: number
}

export interface DailyReportParams {
  date?: string // YYYY-MM-DD, opcional (por defecto hoy)
}

export const getDailyReport = (params: DailyReportParams = {}) =>
  api<DailyReport>(`/reports/daily${toQuery(params as Record<string, unknown>)}`)

// ----------------- RF-23: reporte mensual de mantenimiento ------------------

export interface MonthlyConsortiumRow {
  consortiumId: string
  consortiumName: string
  maintenanceCount: number
  totalCost: number
  vehicles: number
  vehiclesOperational: number
  availability: number
}

export interface MonthlyReport {
  month: string
  totalMaintenance: number
  totalCost: number
  byConsortium: MonthlyConsortiumRow[]
}

export interface MonthlyReportParams {
  month?: string // YYYY-MM, opcional (por defecto el mes actual)
}

export const getMonthlyReport = (params: MonthlyReportParams = {}) =>
  api<MonthlyReport>(`/reports/monthly${toQuery(params as Record<string, unknown>)}`)

// ------------------- RF-21: reporte de fallas recurrentes -------------------

export interface RecurringFailureRow {
  failure: string
  count: number
}

export interface RecurringFailures {
  byDescription: RecurringFailureRow[]
  byComponent: RecurringFailureRow[]
}

export const getRecurringFailures = () => api<RecurringFailures>('/reports/recurring-failures')

// -------------------------- RF-26: export CSV -------------------------------

// El endpoint devuelve texto CSV (no JSON), asi que no se puede usar el helper
// api<T>. Se hace un fetch directo con el token y el reintento de refresh, y se
// devuelve el contenido como texto para armar el Blob en el hook.
export async function fetchReportCsv(
  path: string,
  params: Record<string, unknown> = {},
): Promise<string> {
  const url = `${API_URL}${path}${toQuery({ ...params, format: 'csv' })}`

  const doFetch = () => {
    const token = getAccessToken()
    return fetch(url, {
      credentials: 'include',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
  }

  let res = await doFetch()
  if (res.status === 401 && getAccessToken()) {
    if (await refreshAccessToken()) res = await doFetch()
  }
  if (!res.ok) throw new Error(`No se pudo exportar el reporte (HTTP ${res.status})`)
  return res.text()
}
