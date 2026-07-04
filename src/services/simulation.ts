import { api } from './http'

// Cuerpo del escenario what-if (RF-10).
// buses es la cantidad de buses que mueve el slider en la pagina.
// Los demas campos son opcionales y sobrescriben los valores de la ruta.
export interface SimulateScenario {
  routeCode: string
  buses: number
  targetHeadwayMin?: number
  lengthKm?: number
  avgSpeedKmh?: number
}

// Respuesta del backend con las metricas calculadas del escenario.
export interface ScenarioResult {
  routeCode: string
  buses: number
  lengthKm: number
  avgSpeedKmh: number
  targetHeadwayMin: number | null
  cycleTimeMinutes: number
  headwayMinutes: number
  avgWaitMinutes: number
  busesNeeded: number | null
}

export const simulateScenario = (body: SimulateScenario) =>
  api<ScenarioResult>('/simulation/scenario', { method: 'POST', body: JSON.stringify(body) })
