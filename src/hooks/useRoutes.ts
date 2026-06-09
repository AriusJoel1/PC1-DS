import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getRoute, listRoutes, routesSummary, type ListRoutesParams } from '../services/routes'

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
