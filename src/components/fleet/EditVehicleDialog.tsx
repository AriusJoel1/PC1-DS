import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { Vehicle, VehicleState, VehicleType, VehicleUpdate } from '../../services/vehicles'
import { useConsortiums } from '../../hooks/useConsortiums'
import { useUpdateVehicle } from '../../hooks/useVehicles'
import { ApiError } from '../../services/http'
import './EditVehicleDialog.css'

const STATES: VehicleState[] = ['Operativo', 'En Taller', 'Alerta']
const TYPES: VehicleType[] = ['Bus Articulado', 'Alimentador']

type EditVehicleDialogProps = {
  vehicle: Vehicle
  onClose: () => void
}

function EditVehicleDialog({ vehicle, onClose }: EditVehicleDialogProps) {
  const { data: consortiums = [] } = useConsortiums()
  const update = useUpdateVehicle()

  const [plate, setPlate] = useState(vehicle.plate)
  const [type, setType] = useState<VehicleType>(vehicle.type)
  const [consortium, setConsortium] = useState(vehicle.consortium)
  const [km, setKm] = useState(String(vehicle.km))
  const [state, setState] = useState<VehicleState>(vehicle.state)
  const [date, setDate] = useState(vehicle.lastInspectionDate.slice(0, 10))
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    const patch: VehicleUpdate = {
      plate,
      type,
      consortium,
      km: Number(km),
      state,
      lastInspectionDate: date,
    }
    try {
      await update.mutateAsync({ id: vehicle.id, patch })
      onClose()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo guardar la unidad.')
    }
  }

  return (
    <div className="modal-layer">
      <button
        className="modal-backdrop"
        onClick={onClose}
        aria-label="Cerrar"
      />
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-head">
          <h2>Editar unidad {vehicle.id}</h2>
          <button
            className="icon-btn"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        <form
          className="modal-form"
          onSubmit={onSubmit}
        >
          <label className="modal-field">
            <span>Placa</span>
            <input
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              required
            />
          </label>

          <label className="modal-field">
            <span>Tipo</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as VehicleType)}
            >
              {TYPES.map((t) => (
                <option
                  key={t}
                  value={t}
                >
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="modal-field">
            <span>Consorcio</span>
            <select
              value={consortium}
              onChange={(e) => setConsortium(e.target.value)}
            >
              {/* Si el consorcio actual no está en el catálogo, lo conservamos como opción. */}
              {!consortiums.some((c) => c.name === consortium) ? (
                <option value={consortium}>{consortium}</option>
              ) : null}
              {consortiums.map((c) => (
                <option
                  key={c.id}
                  value={c.name}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="modal-field">
            <span>Kilometraje</span>
            <input
              type="number"
              min={0}
              value={km}
              onChange={(e) => setKm(e.target.value)}
              required
            />
          </label>

          <label className="modal-field">
            <span>Estado</span>
            <select
              value={state}
              onChange={(e) => setState(e.target.value as VehicleState)}
            >
              {STATES.map((s) => (
                <option
                  key={s}
                  value={s}
                >
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="modal-field">
            <span>Última inspección</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          {error ? <div className="modal-error">{error}</div> : null}

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={update.isPending}
            >
              {update.isPending ? 'Guardando…' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditVehicleDialog
