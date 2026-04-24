import { Plus } from 'lucide-react';

function RoutesHeader() {
  return (
    <div className="section-head">
      <div>
        <h1 className="page-title">Gestión de Rutas</h1>
        <p className="page-subtitle">
          Rutas troncales, expresos y alimentadores del sistema metropolitano.
        </p>
      </div>

      <button className="btn btn-primary">
        <Plus size={16} />
        Nueva Ruta
      </button>
    </div>
  );
}

export default RoutesHeader;
