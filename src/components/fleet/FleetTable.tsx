import type { VehicleRow } from '../../data/metrofloataMock';

type FleetTableProps = {
  rows: VehicleRow[];
};

function FleetTable({ rows }: FleetTableProps) {
  return (
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
  );
}

export default FleetTable;
