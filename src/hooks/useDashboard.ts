import { useQuery } from '@tanstack/react-query'
import { getAvailability, getKpis, getRecentAlerts, getRouteCompliance } from '../services/dashboard'

export function useKpis() {
  return useQuery({ queryKey: ['dashboard', 'kpis'], queryFn: getKpis })
}

export function useAvailability(range: 'week' | 'month' = 'week') {
  return useQuery({ queryKey: ['dashboard', 'availability', range], queryFn: () => getAvailability(range) })
}

export function useRouteCompliance() {
  return useQuery({ queryKey: ['dashboard', 'route-compliance'], queryFn: getRouteCompliance })
}

export function useRecentAlerts(limit = 3) {
  return useQuery({ queryKey: ['dashboard', 'alerts', limit], queryFn: () => getRecentAlerts(limit) })
}
