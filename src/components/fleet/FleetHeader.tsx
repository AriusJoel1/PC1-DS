import { Plus } from 'lucide-react';

function FleetHeader() {
  return (
    <div className="section-head">
      <div>
        <h1 className="page-title">Gestión de Flota Vehicular</h1>
        <p className="page-subtitle">
          Monitoreo y administración del parque automotor del sistema metropolitano.
        </p>
      </div>

      <button className="btn btn-primary">
        <Plus size={16} />
        Nuevo Vehículo
      </button>
    </div>
  );
}

export default FleetHeader;
