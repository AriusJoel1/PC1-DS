import { useState } from 'react'
import RoutesHeader from '../components/routes/RoutesHeader'
import RoutesSummary from '../components/routes/RoutesSummary'
import RoutesTable from '../components/routes/RoutesTable'
import RouteDetailDrawer from '../components/routes/RouteDetailDrawer'
import StateMessage from '../components/common/StateMessage'
import { errorMessage } from '../lib/errorMessage'
import { useRoutes, useRoutesSummary } from '../hooks/useRoutes'

function RoutesPage() {
  const { data, isLoading, isError, error } = useRoutes({ pageSize: 100 })
  const { data: summary } = useRoutesSummary()
  const [selectedCode, setSelectedCode] = useState<string | null>(null)

  const rows = data?.data ?? []
  const total = summary?.total ?? data?.meta.total ?? 0

  return (
    <div className="page">
      <section className="card table-card">
        <RoutesHeader />
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
    </div>
  )
}

export default RoutesPage
