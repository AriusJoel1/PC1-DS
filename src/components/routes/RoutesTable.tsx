import { Eye, ImageOff, Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Route } from '../../services/routes'
import './RoutesTable.css'

type RoutesTableProps = {
  rows: Route[]
  onSelect: (code: string) => void
  onEdit: (route: Route) => void
  onDelete: (route: Route) => void
  canWrite: boolean
}

function RoutesTable({ rows, onSelect, onEdit, onDelete, canWrite }: RoutesTableProps) {
  const navigate = useNavigate()
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
                <div className="route-cell">
                  {row.imageUrl ? (
                    <img
                      className="route-thumb"
                      src={row.imageUrl}
                      alt={`Ruta ${row.code}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="route-thumb route-thumb-empty">
                      <ImageOff size={16} />
                    </div>
                  )}
                  <div>
                    <div className="cell-main">{row.code}</div>
                    <div className="cell-sub">{row.name}</div>
                  </div>
                </div>
              </td>
              <td>
                <span className={`type-pill type-${row.type.toLowerCase()}`}>{row.type}</span>
              </td>
              <td>{row.stops}</td>
              <td>{row.length} km</td>
              <td>{row.frequencyMinutes} min</td>
              <td>
                <button
                  className="link-btn"
                  onClick={() => navigate(`/flota?route=${encodeURIComponent(row.code)}`)}
                  title={`Ver buses de la ruta ${row.code}`}
                >
                  {row.buses}
                </button>
              </td>
              <td>
                <span
                  className={`status-pill ${
                    row.state === 'Activa' ? 'operativo' : row.state === 'En Revisión' ? 'en-taller' : 'alerta'
                  }`}
                >
                  {row.state}
                </span>
              </td>
              <td>
                <div className="row-actions">
                  <button
                    className="more-btn"
                    onClick={() => onSelect(row.code)}
                    aria-label={`Ver ruta ${row.code}`}
                  >
                    <Eye size={15} />
                  </button>
                  {canWrite ? (
                    <>
                      <button
                        className="more-btn"
                        onClick={() => onEdit(row)}
                        aria-label={`Editar ruta ${row.code}`}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="more-btn more-btn-danger"
                        onClick={() => onDelete(row)}
                        aria-label={`Eliminar ruta ${row.code}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RoutesTable
