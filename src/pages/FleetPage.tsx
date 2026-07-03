import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FleetHeader from '../components/fleet/FleetHeader'
import FleetFilters from '../components/fleet/FleetFilters'
import FleetTable from '../components/fleet/FleetTable'
import FleetTableFooter from '../components/fleet/FleetTableFooter'
import VehicleFormDialog from '../components/fleet/VehicleFormDialog'
import StateMessage from '../components/common/StateMessage'
import ConfirmDialog from '../components/common/ConfirmDialog'
import { errorMessage } from '../lib/errorMessage'
import { useDeleteVehicle, useVehicles } from '../hooks/useVehicles'
import { useConsortiums } from '../hooks/useConsortiums'
import { useRoutes } from '../hooks/useRoutes'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import type { Vehicle, VehicleState, VehicleType } from '../services/vehicles'

const PAGE_SIZE = 10

function FleetPage({ search }: { search: string }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const route = searchParams.get('route') ?? ''

  const [consortium, setConsortium] = useState('')
  const [state, setState] = useState<VehicleState | ''>('')
  const [type, setType] = useState<VehicleType | ''>('')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<Vehicle | null>(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState<Vehicle | null>(null)

  const deleteVehicle = useDeleteVehicle()

  const confirmDelete = async () => {
    if (!deleting) return
    try {
      await deleteVehicle.mutateAsync(deleting.id)
      setDeleting(null)
    } catch {
      // El error se muestra en el diálogo vía deleteVehicle.error.
    }
  }

  // Al cambiar el buscador del topbar, volver a la página 1 (patrón "ajustar estado al cambiar prop").
  const [prevSearch, setPrevSearch] = useState(search)
  if (search !== prevSearch) {
    setPrevSearch(search)
    setPage(1)
  }

  const debouncedSearch = useDebouncedValue(search)

  const { data: consortiums = [] } = useConsortiums()
  const { data: routesPage } = useRoutes({ pageSize: 100 })
  const routes = routesPage?.data ?? []
  const { data, isLoading, isError, error } = useVehicles({
    search: debouncedSearch || undefined,
    state: state || undefined,
    type: type || undefined,
    consortium: consortium || undefined,
    route: route || undefined,
    page,
    pageSize: PAGE_SIZE,
  })

  const rows = data?.data ?? []
  const total = data?.meta.total ?? 0

  const resetToFirstPage = () => setPage(1)

  // El filtro de ruta se refleja en la URL para que sea enlazable desde /rutas.
  const setRoute = (value: string) => {
    setSearchParams(
      (prev) => {
        if (value) prev.set('route', value)
        else prev.delete('route')
        return prev
      },
      { replace: true },
    )
    resetToFirstPage()
  }

  const clearFilters = () => {
    setConsortium('')
    setState('')
    setType('')
    setRoute('')
    resetToFirstPage()
  }

  return (
    <div className="page">
      <section className="card table-card">
        <FleetHeader onNew={() => setCreating(true)} />
        <FleetFilters
          consortiums={consortiums}
          routes={routes}
          consortium={consortium}
          state={state}
          type={type}
          route={route}
          onConsortium={(v) => {
            setConsortium(v)
            resetToFirstPage()
          }}
          onState={(v) => {
            setState(v)
            resetToFirstPage()
          }}
          onType={(v) => {
            setType(v)
            resetToFirstPage()
          }}
          onRoute={setRoute}
          onClear={clearFilters}
        />

        {isLoading ? (
          <StateMessage
            variant="loading"
            title="Cargando vehículos…"
          />
        ) : isError ? (
          <StateMessage
            variant="error"
            title="No se pudo cargar la flota"
            detail={errorMessage(error)}
          />
        ) : rows.length === 0 ? (
          <StateMessage
            variant="empty"
            title="No se encontraron vehículos"
            detail="Prueba con otros filtros o términos de búsqueda."
          />
        ) : (
          <FleetTable
            rows={rows}
            onEdit={setEditing}
            onDelete={setDeleting}
          />
        )}

        <FleetTableFooter
          page={page}
          pageSize={PAGE_SIZE}
          total={total}
          shown={rows.length}
          search={debouncedSearch}
          onPageChange={setPage}
        />
      </section>

      {editing ? (
        <VehicleFormDialog
          key={editing.id}
          vehicle={editing}
          onClose={() => setEditing(null)}
        />
      ) : null}

      {creating ? <VehicleFormDialog onClose={() => setCreating(false)} /> : null}

      {deleting ? (
        <ConfirmDialog
          title={`¿Eliminar la unidad ${deleting.id}?`}
          message={`Se dará de baja el vehículo de placa ${deleting.plate}. Esta acción no se puede deshacer.`}
          pending={deleteVehicle.isPending}
          error={deleteVehicle.isError ? errorMessage(deleteVehicle.error) : null}
          onConfirm={confirmDelete}
          onClose={() => {
            setDeleting(null)
            deleteVehicle.reset()
          }}
        />
      ) : null}
    </div>
  )
}

export default FleetPage
