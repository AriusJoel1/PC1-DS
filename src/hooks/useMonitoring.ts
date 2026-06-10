import { useQuery } from '@tanstack/react-query'
import { listUnits } from '../services/monitoring'

export function useUnits() {
  return useQuery({
    queryKey: ['monitoring', 'units'],
    queryFn: listUnits,
    staleTime: 5 * 60_000,
  })
}
