import type { Consortium } from '../../services/catalogs'
import type { Route } from '../../services/routes'
import type { VehicleState, VehicleType } from '../../services/vehicles'
import './FleetFilters.css'

const STATES: VehicleState[] = ['Operativo', 'En Taller', 'Alerta', 'Dado de Baja']
const TYPES: VehicleType[] = ['Bus Articulado', 'Alimentador']

type FleetFiltersProps = {
  consortiums: Consortium[]
  routes: Route[]
  consortium: string
  state: VehicleState | ''
  type: VehicleType | ''
  route: string
  onConsortium: (value: string) => void
  onState: (value: VehicleState | '') => void
  onType: (value: VehicleType | '') => void
  onRoute: (value: string) => void
  onClear: () => void
}

function FleetFilters({
  consortiums,
  routes,
  consortium,
  state,
  type,
  route,
  onConsortium,
  onState,
  onType,
  onRoute,
  onClear,
}: FleetFiltersProps) {
  const hasFilters = Boolean(consortium || state || type || route)

  return (
    <div className="filters-row">
      <select
        className="select-like"
        value={consortium}
        onChange={(e) => onConsortium(e.target.value)}
      >
        <option value="">Todos los consorcios</option>
        {consortiums.map((c) => (
          <option
            key={c.id}
            value={c.name}
          >
            {c.name}
          </option>
        ))}
      </select>

      <select
        className="select-like"
        value={state}
        onChange={(e) => onState(e.target.value as VehicleState | '')}
      >
        <option value="">Todos los estados</option>
        {STATES.map((s) => (
          <option
            key={s}
            value={s}
          >
            {s}
          </option>
        ))}
      </select>

      <select
        className="select-like"
        value={type}
        onChange={(e) => onType(e.target.value as VehicleType | '')}
      >
        <option value="">Todos los tipos</option>
        {TYPES.map((t) => (
          <option
            key={t}
            value={t}
          >
            {t}
          </option>
        ))}
      </select>

      <select
        className="select-like"
        value={route}
        onChange={(e) => onRoute(e.target.value)}
      >
        <option value="">Todas las rutas</option>
        {route && !routes.some((r) => r.code === route) ? <option value={route}>{route}</option> : null}
        {routes.map((r) => (
          <option
            key={r.code}
            value={r.code}
          >
            {r.code} — {r.name}
          </option>
        ))}
      </select>

      <button
        className="btn btn-ghost"
        onClick={onClear}
        disabled={!hasFilters}
      >
        Limpiar
      </button>
    </div>
  )
}

export default FleetFilters
