import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { listVehicles, type ListVehiclesParams } from '../services/vehicles'

export function useVehicles(params: ListVehiclesParams) {
  return useQuery({
    queryKey: ['vehicles', params],
    queryFn: () => listVehicles(params),
    placeholderData: keepPreviousData, // paginación/filtros sin parpadeo
  })
}
