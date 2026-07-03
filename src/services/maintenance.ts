import { api, toQuery, type Page } from './http'

export type { Page }

export type MaintenanceType = 'Preventivo' | 'Correctivo'
export type MaintenanceStatus = 'Programado' | 'EnCurso' | 'Completado'

export interface Maintenance {
  id: string
  vehicleId: string
  type: MaintenanceType
  status: MaintenanceStatus
  description: string
  thresholdKm: number | null
  scheduledDate: string | null
  executedDate: string | null
  components: string | null
  costEstimate: number | null
  hours: number | null
  technician: string | null
  createdAt: string
}

export interface ListMaintenanceParams {
  vehicleId?: string
  type?: MaintenanceType
  status?: MaintenanceStatus
  page?: number
  pageSize?: number
}

export interface MaintenanceCreate {
  vehicleId: string
  type: MaintenanceType
  description: string
  thresholdKm?: number
  scheduledDate?: string
  executedDate?: string
  components?: string
  costEstimate?: number
  hours?: number
  technician?: string
}

export type MaintenanceUpdate = Partial<MaintenanceCreate> & { status?: MaintenanceStatus }

export function listMaintenance(params: ListMaintenanceParams = {}): Promise<Page<Maintenance>> {
  return api<Page<Maintenance>>(`/maintenance${toQuery(params as Record<string, unknown>)}`)
}

export const createMaintenance = (body: MaintenanceCreate) =>
  api<Maintenance>('/maintenance', { method: 'POST', body: JSON.stringify(body) })

export const updateMaintenance = (id: string, body: MaintenanceUpdate) =>
  api<Maintenance>(`/maintenance/${id}`, { method: 'PATCH', body: JSON.stringify(body) })

export const deleteMaintenance = (id: string) =>
  api<void>(`/maintenance/${id}`, { method: 'DELETE' })
