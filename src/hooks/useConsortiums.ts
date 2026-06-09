import { useQuery } from '@tanstack/react-query'
import { listConsortiums } from '../services/catalogs'

export function useConsortiums() {
  return useQuery({
    queryKey: ['consortiums'],
    queryFn: listConsortiums,
    staleTime: 5 * 60_000, // catálogo casi estático
  })
}
