import { Pencil, Trash2 } from 'lucide-react'
import type { Maintenance, MaintenanceStatus } from '../../services/maintenance'
import { formatDate } from '../../lib/format'

type MaintenanceTableProps = {
  rows: Maintenance[]
  onEdit: (item: Maintenance) => void
  onDelete: (item: Maintenance) => void
  canWrite: boolean
}

// Texto legible para el estado (el backend usa EnCurso sin espacio).
const STATUS_LABEL: Record<MaintenanceStatus, string> = {
  Programado: 'Programado',
  EnCurso: 'En curso',
  Completado: 'Completado',
}

function MaintenanceTable({ rows, onEdit, onDelete, canWrite }: MaintenanceTableProps) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Vehiculo</th>
            <th>Tipo</th>
            <th>Descripcion</th>
            <th>Programado</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.vehicleId}</td>
              <td>
                <span className={`type-pill type-${row.type.toLowerCase()}`}>{row.type}</span>
              </td>
              <td>{row.description}</td>
              <td>{row.scheduledDate ? formatDate(row.scheduledDate) : '—'}</td>
              <td>
                <span
                  className={`status-pill ${
                    row.status === 'Completado'
                      ? 'operativo'
                      : row.status === 'EnCurso'
                        ? 'en-taller'
                        : 'alerta'
                  }`}
                >
                  {STATUS_LABEL[row.status]}
                </span>
              </td>
              <td>
                {canWrite ? (
                  <div className="row-actions">
                    <button
                      className="more-btn"
                      onClick={() => onEdit(row)}
                      aria-label={`Editar mantenimiento de ${row.vehicleId}`}
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      className="more-btn more-btn-danger"
                      onClick={() => onDelete(row)}
                      aria-label={`Eliminar mantenimiento de ${row.vehicleId}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ) : (
                  <span className="cell-sub">Solo lectura</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MaintenanceTable
