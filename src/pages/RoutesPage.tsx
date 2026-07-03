import { useState } from 'react'
import RoutesHeader from '../components/routes/RoutesHeader'
import RoutesSummary from '../components/routes/RoutesSummary'
import RoutesTable from '../components/routes/RoutesTable'
import RouteDetailDrawer from '../components/routes/RouteDetailDrawer'
import RouteFormDialog from '../components/routes/RouteFormDialog'
import ConfirmDialog from '../components/common/ConfirmDialog'
import StateMessage from '../components/common/StateMessage'
import { errorMessage } from '../lib/errorMessage'
import { useDeleteRoute, useRoutes, useRoutesSummary } from '../hooks/useRoutes'
import { usePermissions } from '../auth/usePermissions'
import type { Route } from '../services/routes'

function RoutesPage() {
  const { data, isLoading, isError, error } = useRoutes({ pageSize: 100 })
  const { data: summary } = useRoutesSummary()
  const { canWrite } = usePermissions()
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState<Route | null>(null)
  const [deleting, setDeleting] = useState<Route | null>(null)

  const deleteRoute = useDeleteRoute()

  const confirmDelete = async () => {
    if (!deleting) return
    try {
      await deleteRoute.mutateAsync(deleting.code)
      setDeleting(null)
    } catch {
      // El error se muestra en el diálogo vía deleteRoute.error.
    }
  }

  const rows = data?.data ?? []
  const total = summary?.total ?? data?.meta.total ?? 0

  return (
    <div className="page">
      <section className="card table-card">
        <RoutesHeader onNew={() => setCreating(true)} canWrite={canWrite} />
        <RoutesSummary
          total={summary?.total ?? 0}
          active={summary?.active ?? 0}
          review={summary?.review ?? 0}
          suspended={summary?.suspended ?? 0}
        />

        {isLoading ? (
          <StateMessage
            variant="loading"
            title="Cargando rutas…"
          />
        ) : isError ? (
          <StateMessage
            variant="error"
            title="No se pudieron cargar las rutas"
            detail={errorMessage(error)}
          />
        ) : rows.length === 0 ? (
          <StateMessage
            variant="empty"
            title="No hay rutas configuradas"
          />
        ) : (
          <RoutesTable
            rows={rows}
            onSelect={setSelectedCode}
            onEdit={setEditing}
            onDelete={setDeleting}
            canWrite={canWrite}
          />
        )}

        <div className="table-footer">
          <span>
            Mostrando {rows.length} de {total} rutas configuradas
          </span>
        </div>
      </section>

      {selectedCode ? (
        <RouteDetailDrawer
          code={selectedCode}
          onClose={() => setSelectedCode(null)}
        />
      ) : null}

      {creating ? <RouteFormDialog onClose={() => setCreating(false)} /> : null}

      {editing ? (
        <RouteFormDialog
          key={editing.code}
          route={editing}
          onClose={() => setEditing(null)}
        />
      ) : null}

      {deleting ? (
        <ConfirmDialog
          title={`¿Eliminar la ruta ${deleting.code}?`}
          message={`Se eliminará "${deleting.name}" y sus paradas. Esta acción no se puede deshacer.`}
          pending={deleteRoute.isPending}
          error={deleteRoute.isError ? errorMessage(deleteRoute.error) : null}
          onConfirm={confirmDelete}
          onClose={() => {
            setDeleting(null)
            deleteRoute.reset()
          }}
        />
      ) : null}
    </div>
  )
}

export default RoutesPage
