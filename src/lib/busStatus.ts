// Color del marcador del bus segun su estado en el mapa (requisito UI-03 del SRS).
// Se usa la velocidad como senal del estado en tiempo real:
// - detenido (0 km/h): rojo
// - velocidad excesiva (mas de 60 km/h): amarillo
// - en movimiento normal: verde
export function busColor(speedKmh: number): string {
  if (speedKmh <= 0) return '#dc2626'
  if (speedKmh > 60) return '#d4a15d'
  return '#16a34a'
}
