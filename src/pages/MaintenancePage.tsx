import { useState } from 'react'
import MaintenanceTable from '../components/maintenance/MaintenanceTable'
import StateMessage from '../components/common/StateMessage'
import { errorMessage } from '../lib/errorMessage'
import { useAuth } from '../auth/useAuth'
import { useMaintenance } from '../hooks/useMaintenance'
import type { Maintenance, MaintenanceStatus } from '../services/maintenance'

// admin y operador pueden escribir; supervisor es de solo lectura.
const WRITE_ROLES = ['admin', 'operador']

function MaintenancePage() {
  const { user } = useAuth()
  const canWrite = user ? WRITE_ROLES.includes(user.role) : false

  const [status, setStatus] = useState<MaintenanceStatus | ''>('')
  const params = status ? { status, pageSize: 100 } : { pageSize: 100 }
  const { data, isLoading, isError, error } = useMaintenance(params)

  const rows: Maintenance[] = data?.data ?? []

  return (
    <div className="page">
      <section className="card table-card">
        <div className="section-head">
          <div>
            <h1 className="page-title">Mantenimiento de Flota</h1>
            <p className="page-subtitle">
              Ordenes de mantenimiento preventivo y correctivo de las unidades.
            </p>
          </div>
        </div>

        <div className="filters-row">
          <select
            className="select-like"
            value={status}
            onChange={(e) => setStatus(e.target.value as MaintenanceStatus | '')}
          >
            <option value="">Todos los estados</option>
            <option value="Programado">Programado</option>
            <option value="EnCurso">En curso</option>
            <option value="Completado">Completado</option>
          </select>
        </div>

        {isLoading ? (
          <StateMessage variant="loading" title="Cargando mantenimientos…" />
        ) : isError ? (
          <StateMessage
            variant="error"
            title="No se pudieron cargar los mantenimientos"
            detail={errorMessage(error)}
          />
        ) : rows.length === 0 ? (
          <StateMessage variant="empty" title="No hay ordenes de mantenimiento" />
        ) : (
          <MaintenanceTable
            rows={rows}
            onEdit={() => undefined}
            onDelete={() => undefined}
            canWrite={canWrite}
          />
        )}
      </section>
    </div>
  )
}

export default MaintenancePage
