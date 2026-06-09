import { api, toQuery, type Page } from './http'

export type RouteType = 'Troncal' | 'Expreso' | 'Alimentador'
export type RouteState = 'Activa' | 'En Revisión' | 'Suspendida'

export interface Route {
  code: string
  name: string
  type: RouteType
  stops: number // conteo de paradas (en la lista)
  length: number // km (numérico)
  frequencyMinutes: number
  buses: number
  state: RouteState
}

export interface Stop {
  id: string
  name: string
  order: number
  lat: number | null
  lng: number | null
}

export interface RouteDetail {
  code: string
  name: string
  type: RouteType
  stopsCount: number
  length: number
  frequencyMinutes: number
  buses: number
  state: RouteState
  stops: Stop[]
}

export interface RoutesSummary {
  total: number
  active: number
  review: number
  suspended: number
}

export interface ListRoutesParams {
  state?: RouteState
  type?: RouteType
  page?: number
  pageSize?: number
}

export const listRoutes = (params: ListRoutesParams = {}): Promise<Page<Route>> =>
  api<Page<Route>>(`/routes${toQuery(params as Record<string, unknown>)}`)

export const routesSummary = () => api<RoutesSummary>('/routes/summary')

export const getRoute = (code: string) => api<RouteDetail>(`/routes/${code}`)

export const getRouteStops = (code: string) => api<Stop[]>(`/routes/${code}/stops`)
