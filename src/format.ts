/** Formateo de cara al usuario. El backend entrega datos crudos (km numérico, fechas ISO). */

/** 145230 → "145,230 km" */
export function formatKm(km: number): string {
  return `${km.toLocaleString('es-PE')} km`
}

/** "2023-10-12" (ISO date) → "12/10/2023". Evita el corrimiento de zona horaria. */
export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (m) return `${m[3]}/${m[2]}/${m[1]}`
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('es-PE')
}

/** timestamp ISO → "Hace 12 min" / "Hace 2 h" / "Hace 3 d". */
export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return iso
  const min = Math.round((Date.now() - then) / 60_000)
  if (min < 1) return 'Hace un momento'
  if (min < 60) return `Hace ${min} min`
  const h = Math.round(min / 60)
  if (h < 24) return `Hace ${h} h`
  return `Hace ${Math.round(h / 24)} d`
}
