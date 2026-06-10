import { useQuery } from '@tanstack/react-query'
import { getUnit, getUnitRoute, listUnits } from '../services/monitoring'

export function useUnits() {
  return useQuery({
    queryKey: ['monitoring', 'units'],
    queryFn: listUnits,
    staleTime: 5 * 60_000,
  })
}

export function useUnitStatus(id: string) {
  return useQuery({
    queryKey: ['monitoring', 'unit', id],
    queryFn: () => getUnit(id),
    enabled: id !== '',
  })
}

export function useUnitRoute(id: string) {
  return useQuery({
    queryKey: ['monitoring', 'unit', id, 'route'],
    queryFn: () => getUnitRoute(id),
    enabled: id !== '',
  })
}
