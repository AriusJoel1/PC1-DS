import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { simulateScenario } from '../services/simulation'

// Corre el escenario what-if para una ruta y una cantidad de buses.
// Aunque el endpoint es POST, el calculo es puro (sin efectos), asi que lo
// tratamos como una consulta cacheable por ruta+buses.
// Se deshabilita hasta que haya una ruta elegida.
export function useSimulation(routeCode: string | null, buses: number) {
  return useQuery({
    queryKey: ['simulation', routeCode, buses],
    queryFn: () => simulateScenario({ routeCode: routeCode as string, buses }),
    enabled: routeCode != null && routeCode !== '' && buses > 0,
    placeholderData: keepPreviousData,
  })
}
