import { useState } from 'react'
import { Check, Pencil, Plus, Trash2, X } from 'lucide-react'
import type { DayType, FrequencyBand, TimeBand } from '../../services/routes'
import './FrequencyBandsEditor.css'

const DAY_TYPES: DayType[] = ['Laborable', 'Sabado', 'Domingo']
const TIME_BANDS: TimeBand[] = ['Pico Manana', 'Pico Tarde', 'Valle', 'Baja']

// Indice que identifica de forma unica a una franja: no se permite repetir la
// misma combinacion de dia y tramo horario.
const bandKey = (b: Pick<FrequencyBand, 'dayType' | 'timeBand'>): string =>
  `${b.dayType}-${b.timeBand}`

// Convierte el texto del input a un intervalo valido (entero mayor que cero) o
// null si no lo es.
const toInterval = (v: string): number | null => {
  const n = Number(v.trim())
  if (!Number.isInteger(n) || n <= 0) return null
  return n
}

type FrequencyBandsEditorProps = {
  bands: FrequencyBand[]
  onChange: (bands: FrequencyBand[]) => void
}

// Editor en linea de franjas de frecuencia. Trabaja sobre un arreglo en memoria
// y avisa al padre en cada cambio; el guardado real ocurre al enviar la ruta.
function FrequencyBandsEditor({ bands, onChange }: FrequencyBandsEditorProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Estado del formulario de edicion de una franja existente.
  const [eDay, setEDay] = useState<DayType>('Laborable')
  const [eBand, setEBand] = useState<TimeBand>('Pico Manana')
  const [eInterval, setEInterval] = useState('')

  // Estado del formulario de alta.
  const [nDay, setNDay] = useState<DayType>('Laborable')
  const [nBand, setNBand] = useState<TimeBand>('Pico Manana')
  const [nInterval, setNInterval] = useState('')

  const startEdit = (index: number) => {
    const b = bands[index]
    setError(null)
    setEditingIndex(index)
    setEDay(b.dayType)
    setEBand(b.timeBand)
    setEInterval(String(b.intervalMinutes))
  }

  const cancelEdit = () => {
    setEditingIndex(null)
    setError(null)
  }

  const saveEdit = (index: number) => {
    setError(null)
    const interval = toInterval(eInterval)
    if (interval == null) {
      setError('El intervalo debe ser un numero entero mayor que cero.')
      return
    }
    const candidate: FrequencyBand = {
      dayType: eDay,
      timeBand: eBand,
      intervalMinutes: interval,
    }
    // La combinacion dia + tramo no puede chocar con otra franja distinta.
    const clash = bands.some((b, i) => i !== index && bandKey(b) === bandKey(candidate))
    if (clash) {
      setError('Ya existe una franja para ese dia y tramo horario.')
      return
    }
    const next = bands.map((b, i) => (i === index ? candidate : b))
    onChange(next)
    cancelEdit()
  }

  const onDelete = (index: number) => {
    setError(null)
    if (editingIndex === index) cancelEdit()
    onChange(bands.filter((_, i) => i !== index))
  }

  const onAdd = () => {
    setError(null)
    const interval = toInterval(nInterval)
    if (interval == null) {
      setError('El intervalo debe ser un numero entero mayor que cero.')
      return
    }
    const candidate: FrequencyBand = {
      dayType: nDay,
      timeBand: nBand,
      intervalMinutes: interval,
    }
    const clash = bands.some((b) => bandKey(b) === bandKey(candidate))
    if (clash) {
      setError('Ya existe una franja para ese dia y tramo horario.')
      return
    }
    onChange([...bands, candidate])
    setNInterval('')
  }

  return (
    <div className="bands-editor">
      {bands.length === 0 ? (
        <p className="bands-empty">Sin franjas de frecuencia. Agrega al menos una abajo.</p>
      ) : (
        <ol className="bands-list">
          {bands.map((band, index) =>
            editingIndex === index ? (
              <li
                key={bandKey(band)}
                className="band-edit-row"
              >
                <div className="band-grid">
                  <select
                    className="band-input"
                    value={eDay}
                    onChange={(e) => setEDay(e.target.value as DayType)}
                    aria-label="Tipo de dia"
                  >
                    {DAY_TYPES.map((d) => (
                      <option
                        key={d}
                        value={d}
                      >
                        {d}
                      </option>
                    ))}
                  </select>
                  <select
                    className="band-input"
                    value={eBand}
                    onChange={(e) => setEBand(e.target.value as TimeBand)}
                    aria-label="Tramo horario"
                  >
                    {TIME_BANDS.map((t) => (
                      <option
                        key={t}
                        value={t}
                      >
                        {t}
                      </option>
                    ))}
                  </select>
                  <input
                    className="band-input band-input-sm"
                    type="number"
                    min={1}
                    value={eInterval}
                    onChange={(e) => setEInterval(e.target.value)}
                    placeholder="Min"
                    aria-label="Intervalo en minutos"
                  />
                </div>
                <div className="band-actions">
                  <button
                    type="button"
                    className="more-btn"
                    onClick={() => saveEdit(index)}
                    aria-label="Guardar franja"
                  >
                    <Check size={15} />
                  </button>
                  <button
                    type="button"
                    className="more-btn"
                    onClick={cancelEdit}
                    aria-label="Cancelar edicion"
                  >
                    <X size={15} />
                  </button>
                </div>
              </li>
            ) : (
              <li
                key={bandKey(band)}
                className="band-row"
              >
                <div className="band-info">
                  <strong>{band.timeBand}</strong>
                  <span className="band-meta">
                    {band.dayType} - cada {band.intervalMinutes} min
                  </span>
                </div>
                <div className="band-actions">
                  <button
                    type="button"
                    className="more-btn"
                    onClick={() => startEdit(index)}
                    aria-label={`Editar franja ${band.timeBand}`}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    className="more-btn more-btn-danger"
                    onClick={() => onDelete(index)}
                    aria-label={`Eliminar franja ${band.timeBand}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </li>
            ),
          )}
        </ol>
      )}

      {error ? <div className="bands-error">{error}</div> : null}

      <div className="band-add">
        <div className="band-grid">
          <select
            className="band-input"
            value={nDay}
            onChange={(e) => setNDay(e.target.value as DayType)}
            aria-label="Tipo de dia de la nueva franja"
          >
            {DAY_TYPES.map((d) => (
              <option
                key={d}
                value={d}
              >
                {d}
              </option>
            ))}
          </select>
          <select
            className="band-input"
            value={nBand}
            onChange={(e) => setNBand(e.target.value as TimeBand)}
            aria-label="Tramo horario de la nueva franja"
          >
            {TIME_BANDS.map((t) => (
              <option
                key={t}
                value={t}
              >
                {t}
              </option>
            ))}
          </select>
          <input
            className="band-input band-input-sm"
            type="number"
            min={1}
            value={nInterval}
            onChange={(e) => setNInterval(e.target.value)}
            placeholder="Min"
            aria-label="Intervalo en minutos de la nueva franja"
          />
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="btn btn-ghost band-add-btn"
        >
          <Plus size={15} />
          Agregar franja
        </button>
      </div>
    </div>
  )
}

export default FrequencyBandsEditor
