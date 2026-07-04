import { keepPreviousData, useQuery } from '@tanstack/react-query'
import {
  getDailyReport,
  getMonthlyReport,
  getRecurringFailures,
  type DailyReportParams,
  type MonthlyReportParams,
} from '../services/reports'

export function useDailyReport(params: DailyReportParams = {}) {
  return useQuery({
    queryKey: ['reports', 'daily', params],
    queryFn: () => getDailyReport(params),
    placeholderData: keepPreviousData,
  })
}

export function useMonthlyReport(params: MonthlyReportParams = {}) {
  return useQuery({
    queryKey: ['reports', 'monthly', params],
    queryFn: () => getMonthlyReport(params),
    placeholderData: keepPreviousData,
  })
}

export function useRecurringFailures() {
  return useQuery({
    queryKey: ['reports', 'recurring-failures'],
    queryFn: getRecurringFailures,
    placeholderData: keepPreviousData,
  })
}
