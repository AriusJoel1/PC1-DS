import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createRoute,
  createStop,
  deleteRoute,
  deleteStop,
  getRoute,
  getRouteVersions,
  listRoutes,
  routesSummary,
  updateRoute,
  updateStop,
  uploadRouteImage,
  type ListRoutesParams,
  type RouteCreate,
  type RouteUpdate,
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

export function useRouteVersions(code: string | null) {
  return useQuery({
    queryKey: ['routes', 'versions', code],
    queryFn: () => getRouteVersions(code as string),
    enabled: code != null,
  })
}

// Tras mutar paradas: refrescamos el detalle (paradas + conteo) y la lista de rutas.
function invalidateRoute(qc: ReturnType<typeof useQueryClient>, code: string) {
  qc.invalidateQueries({ queryKey: ['routes', 'detail', code] })
  qc.invalidateQueries({ queryKey: ['routes'] })
}

export function useCreateRoute() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (route: RouteCreate) => createRoute(route),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['routes'] }),
  })
}

export function useUpdateRoute() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ code, patch }: { code: string; patch: RouteUpdate }) => updateRoute(code, patch),
    onSuccess: (_data, { code }) => invalidateRoute(qc, code),
  })
}

export function useDeleteRoute() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (code: string) => deleteRoute(code),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['routes'] }),
  })
}

export function useUploadRouteImage() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ code, file }: { code: string; file: File }) => uploadRouteImage(code, file),
    onSuccess: (_data, { code }) => invalidateRoute(qc, code),
  })
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
