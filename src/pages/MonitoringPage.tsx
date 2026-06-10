import { useState } from 'react'
import MonitoringMapCard from '../components/monitoring/MonitoringMapCard'
import MonitoringUnitDetailsCard from '../components/monitoring/MonitoringUnitDetailsCard'
import MonitoringRouteCard from '../components/monitoring/MonitoringRouteCard'
import MonitoringVehicleToggleCard from '../components/monitoring/MonitoringVehicleToggleCard'
import { useUnits, useUnitStream } from '../hooks/useMonitoring'

function MonitoringPage() {
  const { data: units = [] } = useUnits()
  const [selected, setSelected] = useState('')

  const selectedUnit = selected || units[0]?.id || ''

  // Telemetría en vivo de la unidad seleccionada
  useUnitStream(selectedUnit)

  return (
    <div className="page monitor-layout">
      <MonitoringMapCard selectedUnit={selectedUnit} />

      <aside className="monitor-side">
        <MonitoringUnitDetailsCard selectedVehicle={selectedUnit} />
        <MonitoringRouteCard />
        <MonitoringVehicleToggleCard
          units={units}
          selected={selectedUnit}
          onSelect={setSelected}
        />
      </aside>
    </div>
  )
}

export default MonitoringPage
