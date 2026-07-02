import { Plus } from 'lucide-react';

type FleetHeaderProps = {
  onNew: () => void;
};

function FleetHeader({ onNew }: FleetHeaderProps) {
  return (
    <div className="section-head">
      <div>
        <h1 className="page-title">Gestión de Flota Vehicular</h1>
        <p className="page-subtitle">
          Monitoreo y administración del parque automotor del sistema metropolitano.
        </p>
      </div>

      <button className="btn btn-primary" onClick={onNew}>
        <Plus size={16} />
        Nuevo Vehículo
      </button>
    </div>
  );
}

export default FleetHeader;
