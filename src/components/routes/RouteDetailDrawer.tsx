import { MapPin, X } from 'lucide-react'
import { useRoute } from '../../hooks/useRoutes'
import StateMessage from '../common/StateMessage'
import { errorMessage } from '../../lib/errorMessage'
import './RouteDetailDrawer.css'

type RouteDetailDrawerProps = {
  code: string
  onClose: () => void
}

function RouteDetailDrawer({ code, onClose }: RouteDetailDrawerProps) {
  const { data, isLoading, isError, error } = useRoute(code)

  return (
    <div className="drawer-layer">
      <button
        className="drawer-backdrop"
        onClick={onClose}
        aria-label="Cerrar"
      />
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
      >
        <div className="drawer-head">
          <div>
            <div className="drawer-code">{code}</div>
            <div className="drawer-name">{data?.name ?? 'Detalle de ruta'}</div>
          </div>
          <button
            className="icon-btn"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {isLoading ? (
          <StateMessage
            variant="loading"
            title="Cargando detalle…"
          />
        ) : isError ? (
          <StateMessage
            variant="error"
            title="No se pudo cargar la ruta"
            detail={errorMessage(error)}
          />
        ) : data ? (
          <div className="drawer-body">
            <div className="drawer-meta">
              <div className="drawer-meta-item">
                <span>Tipo</span>
                <strong>{data.type}</strong>
              </div>
              <div className="drawer-meta-item">
                <span>Estado</span>
                <strong>{data.state}</strong>
              </div>
              <div className="drawer-meta-item">
                <span>Longitud</span>
                <strong>{data.length} km</strong>
              </div>
              <div className="drawer-meta-item">
                <span>Frecuencia</span>
                <strong>{data.frequencyMinutes} min</strong>
              </div>
              <div className="drawer-meta-item">
                <span>Buses</span>
                <strong>{data.buses}</strong>
              </div>
              <div className="drawer-meta-item">
                <span>Paradas</span>
                <strong>{data.stopsCount}</strong>
              </div>
            </div>

            <h3 className="drawer-section-title">Paradas ({data.stops.length})</h3>
            <ol className="drawer-stops">
              {data.stops.map((stop) => (
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
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </aside>
    </div>
  )
}

export default RouteDetailDrawer
