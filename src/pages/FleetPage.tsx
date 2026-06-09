import { useState } from 'react'
import FleetHeader from '../components/fleet/FleetHeader'
import FleetFilters from '../components/fleet/FleetFilters'
import FleetTable from '../components/fleet/FleetTable'
import FleetTableFooter from '../components/fleet/FleetTableFooter'
import EditVehicleDialog from '../components/fleet/EditVehicleDialog'
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
          <div className="table-status">Cargando vehículos…</div>
        ) : isError ? (
          <div className="table-status table-status-error">
            Error al cargar la flota: {error instanceof Error ? error.message : 'desconocido'}
          </div>
        ) : rows.length === 0 ? (
          <div className="table-status">No se encontraron vehículos con esos criterios.</div>
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
