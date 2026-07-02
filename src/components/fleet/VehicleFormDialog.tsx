import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { Vehicle, VehicleCreate, VehicleState, VehicleType, VehicleUpdate } from '../../services/vehicles'
import { useConsortiums } from '../../hooks/useConsortiums'
import { useCreateVehicle, useUpdateVehicle } from '../../hooks/useVehicles'
import { errorMessage } from '../../lib/errorMessage'
import './VehicleFormDialog.css'

const STATES: VehicleState[] = ['Operativo', 'En Taller', 'Alerta']
const TYPES: VehicleType[] = ['Bus Articulado', 'Alimentador']

const today = () => new Date().toISOString().slice(0, 10)

type VehicleFormDialogProps = {
  vehicle?: Vehicle | null // presente = editar; ausente = crear
  onClose: () => void
}

function VehicleFormDialog({ vehicle, onClose }: VehicleFormDialogProps) {
  const isEdit = vehicle != null
  const { data: consortiums = [] } = useConsortiums()
  const create = useCreateVehicle()
  const update = useUpdateVehicle()

  const [id, setId] = useState(vehicle?.id ?? '')
  const [plate, setPlate] = useState(vehicle?.plate ?? '')
  const [type, setType] = useState<VehicleType>(vehicle?.type ?? 'Bus Articulado')
  const [consortium, setConsortium] = useState(vehicle?.consortium ?? '')
  const [km, setKm] = useState(String(vehicle?.km ?? 0))
  const [state, setState] = useState<VehicleState>(vehicle?.state ?? 'Operativo')
  const [date, setDate] = useState(vehicle ? vehicle.lastInspectionDate.slice(0, 10) : today())
  const [error, setError] = useState<string | null>(null)

  const pending = isEdit ? update.isPending : create.isPending

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      if (isEdit) {
        const patch: VehicleUpdate = { plate, type, consortium, km: Number(km), state, lastInspectionDate: date }
        await update.mutateAsync({ id: vehicle.id, patch })
      } else {
        const payload: VehicleCreate = {
          id,
          plate,
          type,
          consortium,
          km: Number(km),
          state,
          lastInspectionDate: date,
        }
        await create.mutateAsync(payload)
      }
      onClose()
    } catch (err) {
      setError(errorMessage(err))
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
          <h2>{isEdit ? `Editar unidad ${vehicle.id}` : 'Nuevo vehículo'}</h2>
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
          {!isEdit ? (
            <label className="modal-field">
              <span>ID de unidad</span>
              <input
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Ej. ART-1042"
                required
              />
            </label>
          ) : null}

          <label className="modal-field">
            <span>Placa</span>
            <input
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              placeholder="Ej. A2F-741"
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
              required
            >
              <option
                value=""
                disabled
              >
                Selecciona un consorcio
              </option>
              {/* Si el consorcio actual no está en el catálogo, lo conservamos como opción. */}
              {consortium && !consortiums.some((c) => c.name === consortium) ? (
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
              disabled={pending}
            >
              {pending ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear vehículo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VehicleFormDialog
