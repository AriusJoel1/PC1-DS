import MonitoringMapCard from '../components/monitoring/MonitoringMapCard';
import MonitoringUnitDetailsCard from '../components/monitoring/MonitoringUnitDetailsCard';
import MonitoringRouteCard from '../components/monitoring/MonitoringRouteCard';
import MonitoringVehicleToggleCard from '../components/monitoring/MonitoringVehicleToggleCard';

function MonitoringPage({
  selectedVehicle,
  onSelectVehicle,
}: {
  selectedVehicle: 'U-4022' | 'U-208';
  onSelectVehicle: (value: 'U-4022' | 'U-208') => void;
}) {
  return (
    <div className="page monitor-layout">
      <MonitoringMapCard />

      <aside className="monitor-side">
        <MonitoringUnitDetailsCard selectedVehicle={selectedVehicle} />
        <MonitoringRouteCard />
        <MonitoringVehicleToggleCard
          selectedVehicle={selectedVehicle}
          onSelectVehicle={onSelectVehicle}
        />
      </aside>
    </div>
  );
}

export default MonitoringPage