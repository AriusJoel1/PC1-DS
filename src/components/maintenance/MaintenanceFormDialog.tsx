import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type {
  Maintenance,
  MaintenanceCreate,
  MaintenanceStatus,
  MaintenanceType,
  MaintenanceUpdate,
} from '../../services/maintenance'
import { useCreateMaintenance, useUpdateMaintenance } from '../../hooks/useMaintenance'
import { errorMessage } from '../../lib/errorMessage'
import '../fleet/VehicleFormDialog.css'

const TYPES: MaintenanceType[] = ['Preventivo', 'Correctivo']
const STATUSES: MaintenanceStatus[] = ['Programado', 'EnCurso', 'Completado']
const STATUS_LABEL: Record<MaintenanceStatus, string> = {
  Programado: 'Programado',
  EnCurso: 'En curso',
  Completado: 'Completado',
}

type MaintenanceFormDialogProps = {
  item?: Maintenance | null // presente = editar; ausente = crear
  onClose: () => void
}

function MaintenanceFormDialog({ item, onClose }: MaintenanceFormDialogProps) {
  const isEdit = item != null
  const create = useCreateMaintenance()
  const update = useUpdateMaintenance()

  const [vehicleId, setVehicleId] = useState(item?.vehicleId ?? '')
  const [type, setType] = useState<MaintenanceType>(item?.type ?? 'Preventivo')
  const [status, setStatus] = useState<MaintenanceStatus>(item?.status ?? 'Programado')
  const [description, setDescription] = useState(item?.description ?? '')
  const [thresholdKm, setThresholdKm] = useState(item?.thresholdKm ? String(item.thresholdKm) : '')
  const [scheduledDate, setScheduledDate] = useState(item?.scheduledDate ?? '')
  const [technician, setTechnician] = useState(item?.technician ?? '')
  const [error, setError] = useState<string | null>(null)

  const pending = isEdit ? update.isPending : create.isPending

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      if (isEdit) {
        const patch: MaintenanceUpdate = {
          type,
          status,
          description,
          thresholdKm: thresholdKm ? Number(thresholdKm) : undefined,
          scheduledDate: scheduledDate || undefined,
          technician: technician || undefined,
        }
        await update.mutateAsync({ id: item.id, patch })
      } else {
        const payload: MaintenanceCreate = {
          vehicleId,
          type,
          description,
          thresholdKm: thresholdKm ? Number(thresholdKm) : undefined,
          scheduledDate: scheduledDate || undefined,
          technician: technician || undefined,
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
      <button className="modal-backdrop" onClick={onClose} aria-label="Cerrar" />
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-head">
          <h2>{isEdit ? 'Editar mantenimiento' : 'Nueva orden de mantenimiento'}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        <form className="modal-form" onSubmit={onSubmit}>
          {!isEdit ? (
            <label className="modal-field">
              <span>ID de unidad</span>
              <input
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                placeholder="Ej. ART-1042"
                required
              />
            </label>
          ) : null}

          <label className="modal-field">
            <span>Tipo</span>
            <select value={type} onChange={(e) => setType(e.target.value as MaintenanceType)}>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          {isEdit ? (
            <label className="modal-field">
              <span>Estado</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as MaintenanceStatus)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABEL[s]}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          <label className="modal-field">
            <span>Descripcion</span>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Cambio de aceite"
              required
            />
          </label>

          <label className="modal-field">
            <span>Umbral de kilometraje (opcional)</span>
            <input
              type="number"
              value={thresholdKm}
              onChange={(e) => setThresholdKm(e.target.value)}
              placeholder="Ej. 50000"
            />
          </label>

          <label className="modal-field">
            <span>Fecha programada (opcional)</span>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
            />
          </label>

          <label className="modal-field">
            <span>Tecnico (opcional)</span>
            <input
              value={technician}
              onChange={(e) => setTechnician(e.target.value)}
              placeholder="Nombre del tecnico"
            />
          </label>

          {error ? <p className="modal-error">{error}</p> : null}

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={pending}>
              {pending ? 'Guardando…' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MaintenanceFormDialog
