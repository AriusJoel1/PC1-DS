import { useState } from 'react'
import FleetHeader from '../components/fleet/FleetHeader'
import FleetFilters from '../components/fleet/FleetFilters'
import FleetTable from '../components/fleet/FleetTable'
import FleetTableFooter from '../components/fleet/FleetTableFooter'
import EditVehicleDialog from '../components/fleet/EditVehicleDialog'
import StateMessage from '../components/common/StateMessage'
import { errorMessage } from '../lib/errorMessage'
import { useVehicles } from '../hooks/useVehicles'
import { useConsortiums } from '../hooks/useConsortiums'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import type { Vehicle, VehicleState, VehicleType } from '../services/vehicles'

const PAGE_SIZE = 10

function FleetPage({ search }: { search: string }) {
  const [consortium, setConsortium] = useState('')
  const [state, setState] = useState<VehicleState | ''>('')
  const [type, setType] = useState<VehicleType | ''>('')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState<Vehicle | null>(null)

  // Al cambiar el buscador del topbar, volver a la página 1 (patrón "ajustar estado al cambiar prop").
  const [prevSearch, setPrevSearch] = useState(search)
  if (search !== prevSearch) {
    setPrevSearch(search)
    setPage(1)
  }

  const debouncedSearch = useDebouncedValue(search)

  const { data: consortiums = [] } = useConsortiums()
  const { data, isLoading, isError, error } = useVehicles({
    search: debouncedSearch || undefined,
    state: state || undefined,
    type: type || undefined,
    consortium: consortium || undefined,
    page,
    pageSize: PAGE_SIZE,
  })

  const rows = data?.data ?? []
  const total = data?.meta.total ?? 0

  const resetToFirstPage = () => setPage(1)
  const clearFilters = () => {
    setConsortium('')
    setState('')
    setType('')
    resetToFirstPage()
  }

  return (
    <div className="page">
      <section className="card table-card">
        <FleetHeader />
        <FleetFilters
          consortiums={consortiums}
          consortium={consortium}
          state={state}
          type={type}
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
        <EditVehicleDialog
          key={editing.id}
          vehicle={editing}
          onClose={() => setEditing(null)}
        />
      ) : null}
    </div>
  )
}

export default FleetPage
