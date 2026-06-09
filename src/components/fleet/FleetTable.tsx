import { Pencil } from 'lucide-react'
import type { Vehicle } from '../../services/vehicles'
import { formatDate, formatKm } from '../../lib/format'
import './FleetTable.css'

type FleetTableProps = {
  rows: Vehicle[]
  onEdit: (vehicle: Vehicle) => void
}

function FleetTable({ rows, onEdit }: FleetTableProps) {
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
            <tr key={row.id}>
              <td>
                <div className="cell-main">{row.plate}</div>
                <div className="cell-sub">ID: {row.id}</div>
              </td>
              <td>{row.type}</td>
              <td>{row.consortium}</td>
              <td>
                <div className="km-cell">
                  <span>{formatKm(row.km)}</span>
                  <div className="km-bar">
                    <div
                      className={`km-fill ${
                        row.state === 'Operativo' ? 'ok' : row.state === 'En Taller' ? 'warn' : 'bad'
                      }`}
                    />
                  </div>
                </div>
              </td>
              <td>
                <span className={`status-pill ${row.state.toLowerCase().replace(' ', '-')}`}>{row.state}</span>
              </td>
              <td>{formatDate(row.lastInspectionDate)}</td>
              <td>
                <button
                  className="more-btn"
                  onClick={() => onEdit(row)}
                  aria-label={`Editar ${row.plate}`}
                >
                  <Pencil size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FleetTable
