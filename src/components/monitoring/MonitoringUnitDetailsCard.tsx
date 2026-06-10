import { BusFront } from 'lucide-react'
import { useUnitRoute, useUnitStatus } from '../../hooks/useMonitoring'
import './MonitoringUnitDetailsCard.css'

type MonitoringUnitDetailsCardProps = {
  selectedVehicle: string
}

function MonitoringUnitDetailsCard({ selectedVehicle }: MonitoringUnitDetailsCardProps) {
  const { data: status } = useUnitStatus(selectedVehicle)
  const { data: route } = useUnitRoute(selectedVehicle)

  const occupancy = status && status.capacity > 0 ? Math.round((status.passengers / status.capacity) * 100) : null
  const stops = route?.stops ?? []

  return (
    <section className="card detail-card">
      <h2>Detalles de Unidad</h2>
      <p className="detail-subtitle">Selección Activa</p>

      <div className="unit-card">
        <div className="unit-top">
          <div className="unit-icon">
            <BusFront size={22} />
          </div>
          <div>
            <div className="unit-name">{selectedVehicle || '—'}</div>
            <div className="unit-route">{status?.routeCode ? `Ruta ${status.routeCode}` : 'Sin ruta asignada'}</div>
          </div>
        </div>
        <div className="unit-status">EN RUTA</div>
      </div>

      <div className="mini-grid">
        <div className="mini-card">
          <span>Velocidad</span>
          <strong>
            {status?.speedKmh ?? '—'}
            <small> km/h</small>
          </strong>
        </div>

        <div className="mini-card">
          <span>Ocupación</span>
          <strong>
            {occupancy ?? '—'}
            <small>%</small>
          </strong>
        </div>
      </div>

      <div className="mini-card conductor">
        <span>Conductor</span>
        <strong>{status?.driver ?? 'Sin asignar'}</strong>
        {status ? (
          <small>
            {status.passengers}/{status.capacity} pasajeros
          </small>
        ) : null}
      </div>

      <div className="stops-card">
        <span>Próximas paradas</span>

        <div className="stops-list">
          {stops.length === 0 ? (
            <div className="stop-meta">Sin paradas próximas.</div>
          ) : (
            stops.map((stop) => (
              <div
                key={stop.name}
                className="stop-item"
              >
                <div className={`stop-dot ${stop.active ? 'active' : ''}`} />
                <div className="stop-content">
                  <strong>{stop.name}</strong>
                  <div className={stop.active ? 'stop-meta active' : 'stop-meta'}>{stop.time}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <button className="btn btn-primary full">Contactar Unidad</button>
    </section>
  )
}

export default MonitoringUnitDetailsCard
