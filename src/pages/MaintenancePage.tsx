import { useState } from 'react'
import { Plus } from 'lucide-react'
import MaintenanceTable from '../components/maintenance/MaintenanceTable'
import MaintenanceFormDialog from '../components/maintenance/MaintenanceFormDialog'
import ConfirmDialog from '../components/common/ConfirmDialog'
import StateMessage from '../components/common/StateMessage'
import { errorMessage } from '../lib/errorMessage'
import { useAuth } from '../auth/useAuth'
import { useDeleteMaintenance, useMaintenance } from '../hooks/useMaintenance'
import type { Maintenance, MaintenanceStatus } from '../services/maintenance'

// admin y operador pueden escribir; supervisor es de solo lectura.
const WRITE_ROLES = ['admin', 'operador']

function MaintenancePage() {
  const { user } = useAuth()
  const canWrite = user ? WRITE_ROLES.includes(user.role) : false

  const [status, setStatus] = useState<MaintenanceStatus | ''>('')
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState<Maintenance | null>(null)
  const [deleting, setDeleting] = useState<Maintenance | null>(null)

  const params = status ? { status, pageSize: 100 } : { pageSize: 100 }
  const { data, isLoading, isError, error } = useMaintenance(params)
  const remove = useDeleteMaintenance()

  const rows: Maintenance[] = data?.data ?? []

  const confirmDelete = async () => {
    if (!deleting) return
    try {
      await remove.mutateAsync(deleting.id)
      setDeleting(null)
    } catch {
      // El error se muestra en el dialogo via remove.error.
    }
  }

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

          {canWrite ? (
            <button className="btn btn-primary" onClick={() => setCreating(true)}>
              <Plus size={16} />
              Nueva orden
            </button>
          ) : null}
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
            onEdit={setEditing}
            onDelete={setDeleting}
            canWrite={canWrite}
          />
        )}
      </section>

      {creating ? <MaintenanceFormDialog onClose={() => setCreating(false)} /> : null}

      {editing ? (
        <MaintenanceFormDialog
          key={editing.id}
          item={editing}
          onClose={() => setEditing(null)}
        />
      ) : null}

      {deleting ? (
        <ConfirmDialog
          title="¿Eliminar esta orden de mantenimiento?"
          message={`Se eliminara el mantenimiento de la unidad ${deleting.vehicleId}. Esta accion no se puede deshacer.`}
          pending={remove.isPending}
          error={remove.isError ? errorMessage(remove.error) : null}
          onConfirm={confirmDelete}
          onClose={() => {
            setDeleting(null)
            remove.reset()
          }}
        />
      ) : null}
    </div>
  )
}

export default MaintenancePage
