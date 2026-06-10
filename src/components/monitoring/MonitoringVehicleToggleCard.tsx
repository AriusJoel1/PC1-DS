import type { MonitoringUnit } from '../../services/monitoring'
import './MonitoringVehicleToggleCard.css'

type MonitoringVehicleToggleCardProps = {
  units: MonitoringUnit[]
  selected: string
  onSelect: (id: string) => void
}

function MonitoringVehicleToggleCard({ units, selected, onSelect }: MonitoringVehicleToggleCardProps) {
  return (
    <section className="card vehicle-toggle-card">
      <div className="toggle-row">
        {units.map((unit) => (
          <button
            key={unit.id}
            className={`vehicle-toggle ${selected === unit.id ? 'active' : ''}`}
            onClick={() => onSelect(unit.id)}
          >
            {unit.label}
          </button>
        ))}
      </div>
    </section>
  )
}

export default MonitoringVehicleToggleCard
