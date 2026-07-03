import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Route } from '../../services/routes'
import './RoutesTable.css'

type RoutesTableProps = {
  rows: Route[]
  onSelect: (code: string) => void
}

function RoutesTable({ rows, onSelect }: RoutesTableProps) {
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
                <div className="cell-main">{row.code}</div>
                <div className="cell-sub">{row.name}</div>
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
                <button
                  className="more-btn"
                  onClick={() => onSelect(row.code)}
                  aria-label={`Ver ruta ${row.code}`}
                >
                  <Eye size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RoutesTable
