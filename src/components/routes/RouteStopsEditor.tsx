import { useState, type FormEvent } from 'react'
import { Check, MapPin, Pencil, Plus, Trash2, X } from 'lucide-react'
import type { Stop, StopCreate, StopUpdate } from '../../services/routes'
import { useCreateStop, useDeleteStop, useUpdateStop } from '../../hooks/useRoutes'
import { errorMessage } from '../../lib/errorMessage'
import './RouteStopsEditor.css'

type RouteStopsEditorProps = {
  code: string
  stops: Stop[]
}

// Convierte el string de un input numérico opcional a number | null (vacío = null).
const toNum = (v: string): number | null => {
  const t = v.trim()
  if (t === '') return null
  const n = Number(t)
  return Number.isNaN(n) ? null : n
}

function RouteStopsEditor({ code, stops }: RouteStopsEditorProps) {
  const create = useCreateStop(code)
  const update = useUpdateStop(code)
  const remove = useDeleteStop(code)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estado del formulario de edición (parada existente).
  const [eName, setEName] = useState('')
  const [eOrder, setEOrder] = useState('')
  const [eLat, setELat] = useState('')
  const [eLng, setELng] = useState('')

  // Estado del formulario de alta.
  const [nName, setNName] = useState('')
  const [nOrder, setNOrder] = useState('')
  const [nLat, setNLat] = useState('')
  const [nLng, setNLng] = useState('')

  const startEdit = (stop: Stop) => {
    setError(null)
    setEditingId(stop.id)
    setEName(stop.name)
    setEOrder(String(stop.order))
    setELat(stop.lat != null ? String(stop.lat) : '')
    setELng(stop.lng != null ? String(stop.lng) : '')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setError(null)
  }

  const saveEdit = async (id: string) => {
    setError(null)
    const patch: StopUpdate = { name: eName, lat: toNum(eLat), lng: toNum(eLng) }
    const order = toNum(eOrder)
    if (order != null) patch.order = order
    try {
      await update.mutateAsync({ id, patch })
      cancelEdit()
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  const onDelete = async (id: string) => {
    setError(null)
    try {
      await remove.mutateAsync(id)
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  const onAdd = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    const payload: StopCreate = { name: nName, lat: toNum(nLat), lng: toNum(nLng) }
    const order = toNum(nOrder)
    if (order != null) payload.order = order
    try {
      await create.mutateAsync(payload)
      setNName('')
      setNOrder('')
      setNLat('')
      setNLng('')
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  return (
    <div className="stops-editor">
      <ol className="drawer-stops">
        {stops.map((stop) =>
          editingId === stop.id ? (
            <li
              key={stop.id}
              className="stop-edit-row"
            >
              <div className="stop-edit-grid">
                <input
                  className="stop-input"
                  value={eName}
                  onChange={(e) => setEName(e.target.value)}
                  placeholder="Nombre"
                  aria-label="Nombre de la parada"
                />
                <input
                  className="stop-input stop-input-sm"
                  type="number"
                  min={1}
                  value={eOrder}
                  onChange={(e) => setEOrder(e.target.value)}
                  placeholder="Orden"
                  aria-label="Orden"
                />
                <input
                  className="stop-input stop-input-sm"
                  type="number"
                  step="any"
                  min={-90}
                  max={90}
                  value={eLat}
                  onChange={(e) => setELat(e.target.value)}
                  placeholder="Lat"
                  aria-label="Latitud"
                />
                <input
                  className="stop-input stop-input-sm"
                  type="number"
                  step="any"
                  min={-180}
                  max={180}
                  value={eLng}
                  onChange={(e) => setELng(e.target.value)}
                  placeholder="Lng"
                  aria-label="Longitud"
                />
              </div>
              <div className="stop-actions">
                <button
                  className="more-btn"
                  onClick={() => saveEdit(stop.id)}
                  disabled={update.isPending || !eName.trim()}
                  aria-label="Guardar parada"
                >
                  <Check size={15} />
                </button>
                <button
                  className="more-btn"
                  onClick={cancelEdit}
                  disabled={update.isPending}
                  aria-label="Cancelar edición"
                >
                  <X size={15} />
                </button>
              </div>
            </li>
          ) : (
            <li
              key={stop.id}
              className="drawer-stop"
            >
              <span className="drawer-stop-order">{stop.order}</span>
              <div className="drawer-stop-info">
                <strong>{stop.name}</strong>
                {stop.lat != null && stop.lng != null ? (
                  <span className="drawer-stop-coords">
                    <MapPin size={12} />
                    {stop.lat.toFixed(4)}, {stop.lng.toFixed(4)}
                  </span>
                ) : null}
              </div>
              <div className="stop-actions">
                <button
                  className="more-btn"
                  onClick={() => startEdit(stop)}
                  aria-label={`Editar parada ${stop.name}`}
                >
                  <Pencil size={15} />
                </button>
                <button
                  className="more-btn more-btn-danger"
                  onClick={() => onDelete(stop.id)}
                  disabled={remove.isPending}
                  aria-label={`Eliminar parada ${stop.name}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </li>
          ),
        )}
      </ol>

      {error ? <div className="stops-error">{error}</div> : null}

      <form
        className="stop-add"
        onSubmit={onAdd}
      >
        <div className="stop-edit-grid">
          <input
            className="stop-input"
            value={nName}
            onChange={(e) => setNName(e.target.value)}
            placeholder="Nueva parada"
            required
            aria-label="Nombre de la nueva parada"
          />
          <input
            className="stop-input stop-input-sm"
            type="number"
            min={1}
            value={nOrder}
            onChange={(e) => setNOrder(e.target.value)}
            placeholder="Orden"
            aria-label="Orden"
          />
          <input
            className="stop-input stop-input-sm"
            type="number"
            step="any"
            min={-90}
            max={90}
            value={nLat}
            onChange={(e) => setNLat(e.target.value)}
            placeholder="Lat"
            aria-label="Latitud"
          />
          <input
            className="stop-input stop-input-sm"
            type="number"
            step="any"
            min={-180}
            max={180}
            value={nLng}
            onChange={(e) => setNLng(e.target.value)}
            placeholder="Lng"
            aria-label="Longitud"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary stop-add-btn"
          disabled={create.isPending || !nName.trim()}
        >
          <Plus size={15} />
          {create.isPending ? 'Añadiendo…' : 'Añadir parada'}
        </button>
      </form>
    </div>
  )
}

export default RouteStopsEditor
