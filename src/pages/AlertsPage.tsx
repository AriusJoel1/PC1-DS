import { useState } from 'react'
import { Check, Undo2 } from 'lucide-react'
import { useAcknowledgeAlert, useAlerts, useUnacknowledgeAlert } from '../hooks/useAlerts'
import StateMessage from '../components/common/StateMessage'
import { errorMessage } from '../lib/errorMessage'
import { formatRelativeTime } from '../lib/format'
import type { ListAlertsParams } from '../services/alerts'
import './AlertsPage.css'

type StatusFilter = '' | 'false' | 'true' // '' = todas; 'false' = sin atender; 'true' = atendidas

function AlertsPage() {
  const [status, setStatus] = useState<StatusFilter>('')
  const [tone, setTone] = useState<'' | 'danger' | 'warning'>('')

  const params: ListAlertsParams = { pageSize: 100 }
  if (status) params.acknowledged = status
  if (tone) params.tone = tone

  const { data, isLoading, isError, error } = useAlerts(params)
  const acknowledge = useAcknowledgeAlert()
  const unacknowledge = useUnacknowledgeAlert()
  const busy = acknowledge.isPending || unacknowledge.isPending

  const items = data?.data ?? []

  return (
    <div className="page">
      <section className="card table-card">
        <div className="section-head">
          <div>
            <h1 className="page-title">Alertas del Sistema</h1>
            <p className="page-subtitle">Alertas atendidas y sin atender generadas por la operación en vivo.</p>
          </div>
        </div>

        <div className="filters-row">
          <select
            className="select-like"
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusFilter)}
          >
            <option value="">Todas</option>
            <option value="false">Sin atender</option>
            <option value="true">Atendidas</option>
          </select>

          <select
            className="select-like"
            value={tone}
            onChange={(e) => setTone(e.target.value as '' | 'danger' | 'warning')}
          >
            <option value="">Todos los tonos</option>
            <option value="danger">Críticas</option>
            <option value="warning">Advertencias</option>
          </select>
        </div>

        {isLoading ? (
          <StateMessage
            variant="loading"
            title="Cargando alertas…"
          />
        ) : isError ? (
          <StateMessage
            variant="error"
            title="No se pudieron cargar las alertas"
            detail={errorMessage(error)}
          />
        ) : items.length === 0 ? (
          <StateMessage
            variant="empty"
            title="No hay alertas"
            detail="Prueba con otros filtros."
          />
        ) : (
          <ul className="alerts-list">
            {items.map((alert) => (
              <li
                key={alert.id}
                className={`alert-row ${alert.acknowledgedAt ? 'is-acked' : ''}`}
              >
                <span className={`alert-dot ${alert.tone}`} />
                <div className="alert-body">
                  <div className="alert-title-row">
                    <strong>{alert.title}</strong>
                    <span className={`alert-badge ${alert.acknowledgedAt ? 'acked' : 'pending'}`}>
                      {alert.acknowledgedAt ? 'Atendida' : 'Sin atender'}
                    </span>
                  </div>
                  <p>{alert.text}</p>
                  <div className="alert-meta">
                    {alert.vehicleId ? <span>Unidad {alert.vehicleId}</span> : null}
                    {alert.routeCode ? <span>Ruta {alert.routeCode}</span> : null}
                    <span>{formatRelativeTime(alert.createdAt)}</span>
                    {alert.acknowledgedAt ? (
                      <span>Atendida {formatRelativeTime(alert.acknowledgedAt)}</span>
                    ) : null}
                  </div>
                </div>
                {alert.acknowledgedAt ? (
                  <button
                    className="btn btn-ghost alert-ack-btn"
                    onClick={() => unacknowledge.mutate(alert.id)}
                    disabled={busy}
                    title="Marcar como no atendida"
                  >
                    <Undo2 size={15} />
                    Marcar no atendida
                  </button>
                ) : (
                  <button
                    className="btn btn-ghost alert-ack-btn"
                    onClick={() => acknowledge.mutate(alert.id)}
                    disabled={busy}
                  >
                    <Check size={15} />
                    Marcar atendida
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default AlertsPage
