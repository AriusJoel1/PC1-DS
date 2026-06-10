import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUnit, getUnitPosition, getUnitRoute, listUnits } from '../services/monitoring'
import { streamUnit } from '../services/monitoringStream'

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

export function useUnitPosition(id: string) {
  return useQuery({
    queryKey: ['monitoring', 'unit', id, 'position'],
    queryFn: () => getUnitPosition(id),
    enabled: id !== '',
  })
}

export function useUnitStream(id: string) {
  const qc = useQueryClient()

  useEffect(() => {
    if (id === '') return
    return streamUnit(id, (status) => {
      qc.setQueryData(['monitoring', 'unit', id], status)
    })
  }, [id, qc])
}
