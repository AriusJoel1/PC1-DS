import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { acknowledgeAlert, listAlerts, unacknowledgeAlert, type ListAlertsParams } from '../services/alerts'

export function useAlerts(params: ListAlertsParams = {}) {
  return useQuery({
    queryKey: ['alerts', params],
    queryFn: () => listAlerts(params),
  })
}

export function useAcknowledgeAlert() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => acknowledgeAlert(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alerts'] }),
  })
}

export function useUnacknowledgeAlert() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => unacknowledgeAlert(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['alerts'] }),
  })
}
