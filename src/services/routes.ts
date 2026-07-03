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
  imageUrl: string | null // imagen representativa (null = sin imagen)
}

export interface Stop {
  id: string
  name: string
  order: number
  lat: number | null
  lng: number | null
}

export interface StopCreate {
  name: string
  order?: number
  lat?: number | null
  lng?: number | null
}

export type StopUpdate = Partial<StopCreate>

export interface RouteDetail {
  code: string
  name: string
  type: RouteType
  stopsCount: number
  length: number
  frequencyMinutes: number
  buses: number
  state: RouteState
  imageUrl: string | null
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

export interface RouteCreate {
  code: string
  name: string
  type: RouteType
  length: number
  frequencyMinutes: number
  buses?: number
  state?: RouteState
}

export type RouteUpdate = Partial<Omit<RouteCreate, 'code'>> // el código no es editable

export const listRoutes = (params: ListRoutesParams = {}): Promise<Page<Route>> =>
  api<Page<Route>>(`/routes${toQuery(params as Record<string, unknown>)}`)

export const routesSummary = () => api<RoutesSummary>('/routes/summary')

export const getRoute = (code: string) => api<RouteDetail>(`/routes/${code}`)

export const createRoute = (route: RouteCreate) =>
  api<Route>('/routes', { method: 'POST', body: JSON.stringify(route) })

export const updateRoute = (code: string, patch: RouteUpdate) =>
  api<Route>(`/routes/${code}`, { method: 'PATCH', body: JSON.stringify(patch) })

export const deleteRoute = (code: string) => api<void>(`/routes/${code}`, { method: 'DELETE' })

export function uploadRouteImage(code: string, file: File): Promise<Route> {
  const form = new FormData()
  form.append('image', file)
  return api<Route>(`/routes/${code}/image`, { method: 'POST', body: form })
}

export const getRouteStops = (code: string) => api<Stop[]>(`/routes/${code}/stops`)

export const createStop = (code: string, stop: StopCreate) =>
  api<Stop>(`/routes/${code}/stops`, { method: 'POST', body: JSON.stringify(stop) })

export const updateStop = (id: string, patch: StopUpdate) =>
  api<Stop>(`/stops/${id}`, { method: 'PATCH', body: JSON.stringify(patch) })

export const deleteStop = (id: string) => api<void>(`/stops/${id}`, { method: 'DELETE' })
