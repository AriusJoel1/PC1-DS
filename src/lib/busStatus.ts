// Colores del marcador del bus segun su velocidad.
// Rojo si esta detenido (0 km/h), amarillo si va muy rapido (mas de 60),
// verde en velocidad normal.
export function busColor(speedKmh: number): string {
  if (speedKmh <= 0) return '#dc2626' // rojo: detenido
  if (speedKmh > 60) return '#f59e0b' // amarillo: velocidad alta
  return '#16a34a' // verde: velocidad normal
}
