import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createMaintenance,
  deleteMaintenance,
  listMaintenance,
  updateMaintenance,
  type ListMaintenanceParams,
  type MaintenanceCreate,
  type MaintenanceUpdate,
} from '../services/maintenance'

export function useMaintenance(params: ListMaintenanceParams = {}) {
  return useQuery({
    queryKey: ['maintenance', params],
    queryFn: () => listMaintenance(params),
    placeholderData: keepPreviousData,
  })
}

export function useCreateMaintenance() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (body: MaintenanceCreate) => createMaintenance(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['maintenance'] }),
  })
}

export function useUpdateMaintenance() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: MaintenanceUpdate }) =>
      updateMaintenance(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['maintenance'] }),
  })
}

export function useDeleteMaintenance() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteMaintenance(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['maintenance'] }),
  })
}
