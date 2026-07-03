import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createStop,
  deleteStop,
  getRoute,
  listRoutes,
  routesSummary,
  updateStop,
  type ListRoutesParams,
  type StopCreate,
  type StopUpdate,
} from '../services/routes'

export function useRoutes(params: ListRoutesParams = {}) {
  return useQuery({
    queryKey: ['routes', params],
    queryFn: () => listRoutes(params),
    placeholderData: keepPreviousData,
  })
}

export function useRoutesSummary() {
  return useQuery({
    queryKey: ['routes', 'summary'],
    queryFn: routesSummary,
  })
}

export function useRoute(code: string | null) {
  return useQuery({
    queryKey: ['routes', 'detail', code],
    queryFn: () => getRoute(code as string),
    enabled: code != null,
  })
}

// Tras mutar paradas: refrescamos el detalle (paradas + conteo) y la lista de rutas.
function invalidateRoute(qc: ReturnType<typeof useQueryClient>, code: string) {
  qc.invalidateQueries({ queryKey: ['routes', 'detail', code] })
  qc.invalidateQueries({ queryKey: ['routes'] })
}

export function useCreateStop(code: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (stop: StopCreate) => createStop(code, stop),
    onSuccess: () => invalidateRoute(qc, code),
  })
}

export function useUpdateStop(code: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: StopUpdate }) => updateStop(id, patch),
    onSuccess: () => invalidateRoute(qc, code),
  })
}

export function useDeleteStop(code: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteStop(id),
    onSuccess: () => invalidateRoute(qc, code),
  })
}
