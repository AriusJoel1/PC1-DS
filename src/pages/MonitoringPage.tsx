import { useState } from 'react'
import MonitoringMapCard from '../components/monitoring/MonitoringMapCard'
import MonitoringUnitDetailsCard from '../components/monitoring/MonitoringUnitDetailsCard'
import MonitoringRouteCard from '../components/monitoring/MonitoringRouteCard'
import MonitoringVehicleToggleCard from '../components/monitoring/MonitoringVehicleToggleCard'
import { useUnits } from '../hooks/useMonitoring'

function MonitoringPage() {
  const { data: units = [] } = useUnits()
  const [selected, setSelected] = useState('')

  const selectedUnit = selected || units[0]?.id || ''

  return (
    <div className="page monitor-layout">
      <MonitoringMapCard />

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
