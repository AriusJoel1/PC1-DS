import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createVehicle,
  listVehicles,
  updateVehicle,
  type ListVehiclesParams,
  type VehicleCreate,
  type VehicleUpdate,
} from '../services/vehicles'

export function useVehicles(params: ListVehiclesParams) {
  return useQuery({
    queryKey: ['vehicles', params],
    queryFn: () => listVehicles(params),
    placeholderData: keepPreviousData, // paginación/filtros sin parpadeo
  })
}

export function useCreateVehicle() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (vehicle: VehicleCreate) => createVehicle(vehicle),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vehicles'] }),
  })
}

export function useUpdateVehicle() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: VehicleUpdate }) => updateVehicle(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vehicles'] }),
  })
}
