import type { vehicleRows } from '../data/metrofloataMock';
import { Plus } from 'lucide-react';

function FleetPage({
  search,
  rows,
}: {
  search: string;
  rows: typeof vehicleRows;
}) {
  const rowCount = rows.length;

  return (
    <div className="page">
      <section className="card table-card">
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

        <div className="filters-row">
          <div className="select-like">Todos los consorcios</div>
          <div className="select-like">Todos los estados</div>
          <div className="select-like">Todos los tipos</div>

          <button className="btn btn-ghost">Limpiar</button>
          <button className="btn btn-primary dark">Aplicar Filtros</button>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Placa / ID</th>
                <th>Tipo</th>
                <th>Consorcio</th>
                <th>Kilometraje</th>
                <th>Estado</th>
                <th>Últ. mantenimiento</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.plate}>
                  <td>
                    <div className="cell-main">{row.plate}</div>
                    <div className="cell-sub">ID: {row.id}</div>
                  </td>
                  <td>{row.type}</td>
                  <td>{row.consortium}</td>
                  <td>
                    <div className="km-cell">
                      <span>{row.km}</span>
                      <div className="km-bar">
                        <div
                          className={`km-fill ${
                            row.state === 'Operativo'
                              ? 'ok'
                              : row.state === 'En Taller'
                                ? 'warn'
                                : 'bad'
                          }`}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`status-pill ${row.state.toLowerCase().replace(' ', '-')}`}>
                      {row.state}
                    </span>
                  </td>
                  <td>{row.date}</td>
                  <td>
                    <button className="more-btn">⋯</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>
            Mostrando {rowCount} de 452 vehículos
            {search ? ` • filtro: "${search}"` : ''}
          </span>

          <div className="pagination">
            <button className="page-btn">‹</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span>...</span>
            <button className="page-btn">›</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FleetPage