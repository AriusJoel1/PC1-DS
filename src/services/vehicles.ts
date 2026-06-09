import { api, toQuery, type Page } from './http'

export type { Page }

export type VehicleType = 'Bus Articulado' | 'Alimentador'
export type VehicleState = 'Operativo' | 'En Taller' | 'Alerta'

export interface Vehicle {
  id: string // ⚠️ usar como React key (no `plate`)
  plate: string
  type: VehicleType
  consortium: string
  km: number // numérico → formatear en el front (km.toLocaleString())
  state: VehicleState
  lastInspectionDate: string // ISO date → formatear en el front
}

export interface ListVehiclesParams {
  search?: string
  state?: VehicleState
  type?: VehicleType
  consortium?: string
  page?: number
  pageSize?: number
}

export interface VehicleCreate {
  id: string
  plate: string
  type: VehicleType
  consortium: string
  lastInspectionDate: string
  km?: number
  state?: VehicleState
  currentRouteCode?: string | null
}

export type VehicleUpdate = Partial<Omit<VehicleCreate, 'id'>>

export function listVehicles(params: ListVehiclesParams = {}): Promise<Page<Vehicle>> {
  return api<Page<Vehicle>>(`/vehicles${toQuery(params as Record<string, unknown>)}`)
}

export const getVehicle = (id: string) => api<Vehicle>(`/vehicles/${id}`)

export const createVehicle = (v: VehicleCreate) =>
  api<Vehicle>('/vehicles', { method: 'POST', body: JSON.stringify(v) })

export const updateVehicle = (id: string, patch: VehicleUpdate) =>
  api<Vehicle>(`/vehicles/${id}`, { method: 'PATCH', body: JSON.stringify(patch) })

export const deleteVehicle = (id: string) => api<void>(`/vehicles/${id}`, { method: 'DELETE' })
