import { Download, Plus } from 'lucide-react';

type RoutesHeaderProps = {
  onExportGtfs: () => void;
  exporting: boolean;
};

function RoutesHeader({ onExportGtfs, exporting }: RoutesHeaderProps) {
  return (
    <div className="section-head">
      <div>
        <h1 className="page-title">Gestión de Rutas</h1>
        <p className="page-subtitle">
          Rutas troncales, expresos y alimentadores del sistema metropolitano.
        </p>
      </div>

      <div className="routes-header-actions">
        <button
          className="btn btn-secondary"
          onClick={onExportGtfs}
          disabled={exporting}
        >
          <Download size={16} />
          {exporting ? 'Exportando…' : 'Exportar GTFS'}
        </button>

        <button className="btn btn-primary">
          <Plus size={16} />
          Nueva Ruta
        </button>
      </div>
    </div>
  );
}

export default RoutesHeader;
