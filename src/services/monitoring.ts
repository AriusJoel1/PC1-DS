import { api } from './http'

export interface MonitoringUnit {
  id: string
  label: string
}

export interface VehicleStatus {
  unitId: string
  speedKmh: number
  driver: string | null
  passengers: number
  capacity: number
  nextStop: string | null
  routeCode: string | null
  position: { lat: number; lng: number }
}

export interface RouteProgressStop {
  name: string
  time: string
  active: boolean
}

export interface RouteProgress {
  routeCode: string | null
  stops: RouteProgressStop[]
}

export interface PositionMarker {
  name: string
  order: number
  lat: number
  lng: number
}

export interface UnitPosition {
  lat: number
  lng: number
  markers: PositionMarker[]
}

export const listUnits = () => api<MonitoringUnit[]>('/monitoring/units')
export const getUnit = (id: string) => api<VehicleStatus>(`/monitoring/units/${id}`)
export const getUnitRoute = (id: string) => api<RouteProgress>(`/monitoring/units/${id}/route`)
export const getUnitPosition = (id: string) => api<UnitPosition>(`/monitoring/units/${id}/position`)
