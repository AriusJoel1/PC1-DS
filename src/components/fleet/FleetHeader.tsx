import { Plus } from 'lucide-react';

type FleetHeaderProps = {
  onNew: () => void;
  canWrite: boolean;
};

function FleetHeader({ onNew, canWrite }: FleetHeaderProps) {
  return (
    <div className="section-head">
      <div>
        <h1 className="page-title">Gestión de Flota Vehicular</h1>
        <p className="page-subtitle">
          Monitoreo y administración del parque automotor del sistema metropolitano.
        </p>
      </div>

      {canWrite ? (
        <button className="btn btn-primary" onClick={onNew}>
          <Plus size={16} />
          Nuevo Vehículo
        </button>
      ) : null}
    </div>
  );
}

export default FleetHeader;
