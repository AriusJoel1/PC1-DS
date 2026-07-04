import { useEffect, useRef } from 'react'
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useUnitPosition, useUnitStatus } from '../../hooks/useMonitoring'
import { busColor } from '../../lib/busStatus'
import './MonitoringMapCard.css'

const LIMA_CENTER: [number, number] = [-12.05, -77.04]

type LatLng = [number, number]

/** Encuadra el mapa a los puntos solo cuando cambia la unidad (no en cada tick del bus). */
function FitToData({ bounds, fitKey }: { bounds: LatLng[]; fitKey: string }) {
  const map = useMap()
  const lastKey = useRef<string | null>(null)

  useEffect(() => {
    if (bounds.length === 0 || lastKey.current === fitKey) return
    lastKey.current = fitKey
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 })
  }, [map, bounds, fitKey])

  return null
}

type MonitoringMapCardProps = {
  selectedUnit: string
}

function MonitoringMapCard({ selectedUnit }: MonitoringMapCardProps) {
  const { data: status } = useUnitStatus(selectedUnit)
  const { data: position } = useUnitPosition(selectedUnit)

  const busPos: LatLng | null = status?.position ? [status.position.lat, status.position.lng] : null
  const stops = position?.markers ?? []
  const stopPoints: LatLng[] = stops.map((m) => [m.lat, m.lng])
  const bounds: LatLng[] = [...stopPoints, ...(busPos ? [busPos] : [])]

  return (
    <section className="card monitor-map-card">
      <div className="monitor-head">
        <span className="map-title">Mapa en vivo</span>
        <span className="map-unit-badge">
          {selectedUnit || '—'}
          {status?.routeCode ? ` • Ruta ${status.routeCode}` : ''}
        </span>
      </div>

      <div className="map-card">
        <MapContainer
          center={busPos ?? LIMA_CENTER}
          zoom={13}
          scrollWheelZoom
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {stopPoints.length > 1 ? (
            <Polyline
              positions={stopPoints}
              pathOptions={{ color: '#5b59f0', weight: 4, opacity: 0.55 }}
            />
          ) : null}

          {stops.map((m) => (
            <CircleMarker
              key={`${m.order}-${m.name}`}
              center={[m.lat, m.lng]}
              radius={5}
              pathOptions={{ color: '#123b70', weight: 2, fillColor: '#fff', fillOpacity: 1 }}
            >
              <Tooltip>{m.name}</Tooltip>
            </CircleMarker>
          ))}

          {busPos ? (
            <CircleMarker
              center={busPos}
              radius={9}
              pathOptions={{ color: '#fff', weight: 3, fillColor: busColor(status?.speedKmh ?? 0), fillOpacity: 1 }}
            >
              <Tooltip
                permanent
                direction="top"
              >
                {selectedUnit}
                {status ? ` · ${status.speedKmh} km/h` : ''}
              </Tooltip>
            </CircleMarker>
          ) : null}

          <FitToData
            bounds={bounds}
            fitKey={selectedUnit}
          />
        </MapContainer>
      </div>
    </section>
  )
}

export default MonitoringMapCard
