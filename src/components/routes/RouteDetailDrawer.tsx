import { X } from 'lucide-react'
import { useRoute } from '../../hooks/useRoutes'
import StateMessage from '../common/StateMessage'
import RouteStopsEditor from './RouteStopsEditor'
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

            {data.frequencyBands && data.frequencyBands.length > 0 ? (
              <>
                <h3 className="drawer-section-title">
                  Franjas de frecuencia ({data.frequencyBands.length})
                </h3>
                <ul className="drawer-bands">
                  {data.frequencyBands.map((band) => (
                    <li
                      key={`${band.dayType}-${band.timeBand}`}
                      className="drawer-band"
                    >
                      <strong>{band.timeBand}</strong>
                      <span className="drawer-band-meta">
                        {band.dayType} - cada {band.intervalMinutes} min
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <h3 className="drawer-section-title">Paradas ({data.stops.length})</h3>
            <RouteStopsEditor
              code={data.code}
              stops={data.stops}
            />
          </div>
        ) : null}
      </aside>
    </div>
  )
}

export default RouteDetailDrawer
