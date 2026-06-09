import type { Consortium } from '../../services/catalogs'
import type { VehicleState, VehicleType } from '../../services/vehicles'
import './FleetFilters.css'

const STATES: VehicleState[] = ['Operativo', 'En Taller', 'Alerta']
const TYPES: VehicleType[] = ['Bus Articulado', 'Alimentador']

type FleetFiltersProps = {
  consortiums: Consortium[]
  consortium: string
  state: VehicleState | ''
  type: VehicleType | ''
  onConsortium: (value: string) => void
  onState: (value: VehicleState | '') => void
  onType: (value: VehicleType | '') => void
  onClear: () => void
}

function FleetFilters({
  consortiums,
  consortium,
  state,
  type,
  onConsortium,
  onState,
  onType,
  onClear,
}: FleetFiltersProps) {
  const hasFilters = Boolean(consortium || state || type)

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
