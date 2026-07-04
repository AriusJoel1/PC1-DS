import { useState, type ChangeEvent, type FormEvent } from 'react'
import { ImagePlus, X } from 'lucide-react'
import type {
  FrequencyBand,
  Route,
  RouteCreate,
  RouteState,
  RouteType,
  RouteUpdate,
} from '../../services/routes'
import { useCreateRoute, useUpdateRoute, useUploadRouteImage } from '../../hooks/useRoutes'
import { errorMessage } from '../../lib/errorMessage'
import FrequencyBandsEditor from './FrequencyBandsEditor'
import './RouteFormDialog.css'

const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5 MB (límite del backend)

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
  const uploadImage = useUploadRouteImage()

  const [code, setCode] = useState(route?.code ?? '')
  const [name, setName] = useState(route?.name ?? '')
  const [type, setType] = useState<RouteType>(route?.type ?? 'Troncal')
  const [length, setLength] = useState(String(route?.length ?? ''))
  const [frequency, setFrequency] = useState(String(route?.frequencyMinutes ?? ''))
  const [buses, setBuses] = useState(String(route?.buses ?? 0))
  const [state, setState] = useState<RouteState>(route?.state ?? 'Activa')
  const [frequencyBands, setFrequencyBands] = useState<FrequencyBand[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(route?.imageUrl ?? null)
  const [error, setError] = useState<string | null>(null)

  const pending = isEdit ? update.isPending : create.isPending
  const busy = pending || uploadImage.isPending

  const onPickImage = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0] ?? null
    setError(null)
    if (!picked) return
    if (!picked.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen.')
      return
    }
    if (picked.size > MAX_IMAGE_BYTES) {
      setError('La imagen supera el máximo de 5 MB.')
      return
    }
    setFile(picked)
    setPreview(URL.createObjectURL(picked)) // vista previa local
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      let targetCode = route?.code ?? code
      if (isEdit) {
        const patch: RouteUpdate = {
          name,
          type,
          length: Number(length),
          frequencyMinutes: Number(frequency),
          buses: Number(buses),
          state,
          frequencyBands,
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
          frequencyBands,
        }
        const created = await create.mutateAsync(payload)
        targetCode = created.code
      }
      if (file) await uploadImage.mutateAsync({ code: targetCode, file })
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

          <div className="modal-field">
            <span>Franjas de frecuencia (opcional)</span>
            <FrequencyBandsEditor
              bands={frequencyBands}
              onChange={setFrequencyBands}
            />
          </div>

          <div className="modal-field">
            <span>Imagen representativa (opcional)</span>
            <div className="image-field">
              {preview ? (
                <img
                  className="image-preview"
                  src={preview}
                  alt="Vista previa de la ruta"
                />
              ) : (
                <div className="image-placeholder">
                  <ImagePlus size={20} />
                </div>
              )}
              <label className="btn btn-ghost image-pick">
                {preview ? 'Cambiar imagen' : 'Subir imagen'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={onPickImage}
                  hidden
                />
              </label>
            </div>
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
              disabled={busy}
            >
              {busy ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Crear ruta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RouteFormDialog
