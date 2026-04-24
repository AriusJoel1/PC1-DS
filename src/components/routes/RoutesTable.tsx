import type { RouteRow } from '../../data/metrofloataMock';
import './RoutesTable.css';

type RoutesTableProps = {
  rows: RouteRow[];
};

function RoutesTable({ rows }: RoutesTableProps) {
  return (
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
          {rows.map((row) => (
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
                  className={`status-pill ${
                    row.state === 'Activa'
                      ? 'operativo'
                      : row.state === 'En Revisión'
                        ? 'en-taller'
                        : 'alerta'
                  }`}
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
  );
}

export default RoutesTable;
