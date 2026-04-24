import { routeRows } from '../data/metrofloataMock';
import { Plus } from 'lucide-react';

function RoutesPage() {
  const total = routeRows.length;
  const active = routeRows.filter((r) => r.state === 'Activa').length;
  const review = routeRows.filter((r) => r.state === 'En Revisión').length;
  const suspended = routeRows.filter((r) => r.state === 'Suspendida').length;

  return (
    <div className="page">
      <section className="card table-card">
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

        <div className="route-summary">
          <div className="route-summary-item">
            <span>Total</span>
            <strong>{total}</strong>
          </div>
          <div className="route-summary-item">
            <span>Activas</span>
            <strong className="ok">{active}</strong>
          </div>
          <div className="route-summary-item">
            <span>En revisión</span>
            <strong className="warn">{review}</strong>
          </div>
          <div className="route-summary-item">
            <span>Suspendidas</span>
            <strong className="bad">{suspended}</strong>
          </div>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Código / Nombre</th>
                <th>Tipo</th>
                <th>Paradas</th>
                <th>Longitud</th>
                <th>Frecuencia</th>
                <th>Buses</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {routeRows.map((row) => (
                <tr key={row.code}>
                  <td>
                    <div className="cell-main">{row.code}</div>
                    <div className="cell-sub">{row.name}</div>
                  </td>
                  <td>
                    <span className={`type-pill type-${row.type.toLowerCase()}`}>
                      {row.type}
                    </span>
                  </td>
                  <td>{row.stops}</td>
                  <td>{row.length}</td>
                  <td>{row.frequency}</td>
                  <td>{row.buses}</td>
                  <td>
                    <span
                      className={`status-pill ${row.state === 'Activa'
                        ? 'operativo'
                        : row.state === 'En Revisión'
                          ? 'en-taller'
                          : 'alerta'}`}
                    >
                      {row.state}
                    </span>
                  </td>
                  <td>
                    <button className="more-btn">⋯</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>Mostrando {total} rutas configuradas</span>
        </div>
      </section>
    </div>
  );
}

export default RoutesPage