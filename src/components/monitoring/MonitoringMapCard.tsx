import { Search } from 'lucide-react';
import { mapMarkers } from '../../data/metrofloataMock';

function MonitoringMapCard() {
  return (
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

          {mapMarkers.map((marker, idx) => (
            <div
              key={idx}
              className="bus-dot"
              style={{ left: marker.left, top: marker.top }}
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
  );
}

export default MonitoringMapCard;
