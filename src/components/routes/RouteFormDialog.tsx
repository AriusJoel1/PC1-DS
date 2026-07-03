import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { Route, RouteCreate, RouteState, RouteType, RouteUpdate } from '../../services/routes'
import { useCreateRoute, useUpdateRoute } from '../../hooks/useRoutes'
import { errorMessage } from '../../lib/errorMessage'
import './RouteFormDialog.css'

const TYPES: RouteType[] = ['Troncal', 'Expreso', 'Alimentador']
const STATES: RouteState[] = ['Activa', 'En Revisión', 'Suspendida']

type RouteFormDialogProps = {
  route?: Route | null // presente = editar; ausente = crear
  onClose: () => void
}

function RouteFormDialog({ route, onClose }: RouteFormDialogProps) {
  const isEdit = route != null
  const create = useCreateRoute()
  const update = useUpdateRoute()

  const [code, setCode] = useState(route?.code ?? '')
  const [name, setName] = useState(route?.name ?? '')
  const [type, setType] = useState<RouteType>(route?.type ?? 'Troncal')
  const [length, setLength] = useState(String(route?.length ?? ''))
  const [frequency, setFrequency] = useState(String(route?.frequencyMinutes ?? ''))
  const [buses, setBuses] = useState(String(route?.buses ?? 0))
  const [state, setState] = useState<RouteState>(route?.state ?? 'Activa')
  const [error, setError] = useState<string | null>(null)

  const pending = isEdit ? update.isPending : create.isPending

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      if (isEdit) {
        const patch: RouteUpdate = {
          name,
          type,
          length: Number(length),
          frequencyMinutes: Number(frequency),
          buses: Number(buses),
          state,
        }
        await update.mutateAsync({ code: route.code, patch })
      } else {
        const payload: RouteCreate = {
          code,
          name,
          type,
          length: Number(length),
          frequencyMinutes: Number(frequency),
          buses: Number(buses),
          state,
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
          <h2>{isEdit ? `Editar ruta ${route.code}` : 'Nueva ruta'}</h2>
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
              <span>Código</span>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ej. TR-A"
                required
              />
            </label>
          ) : null}

          <label className="modal-field">
            <span>Nombre</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Troncal A — Norte ↔ Sur"
              required
            />
          </label>

          <label className="modal-field">
            <span>Tipo</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as RouteType)}
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

          <div className="modal-row">
            <label className="modal-field">
              <span>Longitud (km)</span>
              <input
                type="number"
                min={0}
                step="any"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                required
              />
            </label>

            <label className="modal-field">
              <span>Frecuencia (min)</span>
              <input
                type="number"
                min={1}
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="modal-row">
            <label className="modal-field">
              <span>Buses</span>
              <input
                type="number"
                min={0}
                value={buses}
                onChange={(e) => setBuses(e.target.value)}
                required
              />
            </label>

            <label className="modal-field">
              <span>Estado</span>
              <select
                value={state}
                onChange={(e) => setState(e.target.value as RouteState)}
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
          </div>

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
              {pending ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear ruta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RouteFormDialog
