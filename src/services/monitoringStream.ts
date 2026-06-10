import { API_URL } from '../config'
import { getAccessToken } from './http'
import type { VehicleStatus } from './monitoring'

export function streamUnit(unitId: string, onTick: (status: VehicleStatus) => void): () => void {
  const es = new EventSource(`${API_URL}/monitoring/units/${unitId}/stream?access_token=${getAccessToken() ?? ''}`)

  es.onmessage = (event) => {
    try {
      onTick(JSON.parse(event.data) as VehicleStatus)
    } catch {
      // Ignora ticks malformados.
    }
  }

  return () => es.close()
}
