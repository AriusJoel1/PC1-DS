import { BusFront, MapPinned, Search } from 'lucide-react';
import { mapMarkers, stops } from '../data/metrofloataMock';

function MonitoringPage({
  selectedVehicle,
  onSelectVehicle,
}: {
  selectedVehicle: 'U-4022' | 'U-208';
  onSelectVehicle: (value: 'U-4022' | 'U-208') => void;
}) {
  return (
    <div className="page monitor-layout">
      <section className="card monitor-map-card">
        <div className="monitor-head">
          <div className="route-switch">
            <button className="route-btn active">Ruta Troncal</button>
            <button className="route-btn">Alimentadores</button>
          </div>

          <div className="small-search">
            <Search size={14} />
            <input placeholder="Buscar unidad..." />
          </div>
        </div>

        <div className="map-card">
          <div className="map-tabs">
            <button className="map-tab active">Mapa</button>
            <button className="map-tab">Satélite</button>
            <button className="map-tab">Tráfico</button>
          </div>

          <div className="map-search">
            <Search size={14} />
            <input placeholder="Buscar unidad..." />
          </div>

          <div className="map-background">
            <svg viewBox="0 0 1000 1000" className="map-svg">
              <defs>
                <filter id="blur">
                  <feGaussianBlur stdDeviation="1.1" />
                </filter>
              </defs>

              {Array.from({ length: 38 }).map((_, i) => (
                <g key={i} stroke="#c8d3e3" strokeWidth="2" opacity={i % 2 === 0 ? 0.8 : 0.45}>
                  <line x1={(i * 37) % 1000} y1={0} x2={(i * 37) % 1000} y2={1000} />
                  <line x1={0} y1={(i * 28) % 1000} x2={1000} y2={(i * 28) % 1000} />
                </g>
              ))}

              <path
                d="M500 120 C470 220, 430 360, 480 500 C520 610, 535 720, 500 880"
                stroke="#123b70"
                strokeWidth="16"
                fill="none"
                strokeLinecap="round"
                filter="url(#blur)"
                opacity="0.9"
              />
              <path
                d="M500 120 C470 220, 430 360, 480 500 C520 610, 535 720, 500 880"
                stroke="#5b59f0"
                strokeWidth="9"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {mapMarkers.map((m, idx) => (
              <div
                key={idx}
                className="bus-dot"
                style={{ left: m.left, top: m.top }}
              />
            ))}

            <div className="floating-timebox">
              <div>4 min</div>
              <span>2 km</span>
            </div>

            <div className="floating-legend">
              <div className="legend-title">Estado de Flota</div>
              <div className="legend-line">
                <span className="legend-bullet green" />
                En ruta (245)
              </div>
              <div className="legend-line">
                <span className="legend-bullet amber" />
                Retraso (12)
              </div>
              <div className="legend-line">
                <span className="legend-bullet red" />
                Detenido (4)
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside className="monitor-side">
        <section className="card detail-card">
          <h2>Detalles de Unidad</h2>
          <p className="detail-subtitle">Selección Activa</p>

          <div className="unit-card">
            <div className="unit-top">
              <div className="unit-icon">
                <BusFront size={22} />
              </div>
              <div>
                <div className="unit-name">
                  {selectedVehicle === 'U-4022' ? 'U-4022' : 'U-208'}
                </div>
                <div className="unit-route">
                  Ruta Tronc. B • Exp. Norte
                </div>
              </div>
            </div>
            <div className="unit-status">EN RUTA</div>
          </div>

          <div className="mini-grid">
            <div className="mini-card">
              <span>Velocidad</span>
              <strong>64<small> km/h</small></strong>
            </div>

            <div className="mini-card">
              <span>Ocupación</span>
              <strong>65<small>%</small></strong>
            </div>
          </div>

          <div className="mini-card conductor">
            <span>Conductor</span>
            <strong>Roberto Salazar</strong>
            <small>ID: 88492-C</small>
          </div>

          <div className="stops-card">
            <span>Próximas paradas</span>

            <div className="stops-list">
              {stops.map((stop) => (
                <div key={stop.name} className="stop-item">
                  <div className={`stop-dot ${stop.active ? 'active' : ''}`} />
                  <div className="stop-content">
                    <strong>{stop.name}</strong>
                    <div className={stop.active ? 'stop-meta active' : 'stop-meta'}>
                      {stop.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="btn btn-primary full">Contactar Unidad</button>
        </section>

        <section className="card route-card">
          <div className="section-head compact">
            <h2>Vista de Ruta</h2>
            <button className="link-btn">Ver Ruta Completa</button>
          </div>

          <div className="route-preview">
            <div className="route-preview-inner">
              <MapPinned size={34} />
              <span>Mapa de ruta resumida</span>
            </div>
          </div>
        </section>

        <section className="card vehicle-toggle-card">
          <div className="toggle-row">
            <button
              className={`vehicle-toggle ${selectedVehicle === 'U-4022' ? 'active' : ''}`}
              onClick={() => onSelectVehicle('U-4022')}
            >
              U-4022
            </button>
            <button
              className={`vehicle-toggle ${selectedVehicle === 'U-208' ? 'active' : ''}`}
              onClick={() => onSelectVehicle('U-208')}
            >
              U-208
            </button>
          </div>
        </section>
      </aside>
    </div>
  );
}

export default MonitoringPage