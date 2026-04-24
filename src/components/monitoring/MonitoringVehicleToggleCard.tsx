type MonitoringVehicleToggleCardProps = {
  selectedVehicle: 'U-4022' | 'U-208';
  onSelectVehicle: (value: 'U-4022' | 'U-208') => void;
};

function MonitoringVehicleToggleCard({
  selectedVehicle,
  onSelectVehicle,
}: MonitoringVehicleToggleCardProps) {
  return (
    <section className="card vehicle-toggle-card">
      <div className="toggle-row">
        <button
          className={`vehicle-toggle ${selectedVehicle === 'U-4022' ? 'active' : ''}`}
          onClick={() => onSelectVehicle('U-4022')}
        >
          U-4022
        </button>
        <button
          className={`vehicle-toggle ${selectedVehicle === 'U-208' ? 'active' : ''}`}
          onClick={() => onSelectVehicle('U-208')}
        >
          U-208
        </button>
      </div>
    </section>
  );
}

export default MonitoringVehicleToggleCard;
