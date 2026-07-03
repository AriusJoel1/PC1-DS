import { useState } from 'react'
import { Bell, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAcknowledgeAlert, useAlerts } from '../../hooks/useAlerts'
import { formatRelativeTime } from '../../lib/format'
import './AlertsBell.css'

function AlertsBell() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { data } = useAlerts({ acknowledged: 'false', pageSize: 50 })
  const acknowledge = useAcknowledgeAlert()

  const items = data?.data ?? []
  const unread = items.length

  const goToAll = () => {
    setOpen(false)
    navigate('/alertas')
  }

  return (
    <div className="bell-wrap">
      <button
        className="icon-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Alertas"
      >
        <Bell size={17} />
        {unread > 0 ? <span className="bell-badge">{unread > 9 ? '9+' : unread}</span> : null}
      </button>

      {open ? (
        <>
          <button
            className="bell-backdrop"
            onClick={() => setOpen(false)}
            aria-label="Cerrar alertas"
          />
          <div
            className="bell-panel"
            role="dialog"
            aria-label="Alertas"
          >
            <div className="bell-panel-head">
              <h3>Alertas</h3>
              <span>{unread} sin atender</span>
            </div>

            <div className="bell-list">
              {items.length === 0 ? (
                <div className="bell-empty">No hay alertas sin atender.</div>
              ) : (
                items.map((alert) => (
                  <div
                    key={alert.id}
                    className={`bell-item ${alert.acknowledgedAt ? 'is-read' : ''}`}
                  >
                    <span className={`bell-dot ${alert.tone}`} />
                    <div className="bell-item-body">
                      <strong>{alert.title}</strong>
                      <p>{alert.text}</p>
                      <span className="bell-time">{formatRelativeTime(alert.createdAt)}</span>
                    </div>
                    {alert.acknowledgedAt ? (
                      <span
                        className="bell-acked"
                        title="Atendida"
                      >
                        <Check size={15} />
                      </span>
                    ) : (
                      <button
                        className="bell-ack"
                        onClick={() => acknowledge.mutate(alert.id)}
                        disabled={acknowledge.isPending}
                        title="Marcar como atendida"
                        aria-label="Marcar como atendida"
                      >
                        <Check size={15} />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="bell-panel-foot">
              <button
                className="link-btn"
                onClick={goToAll}
              >
                Ver todas
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default AlertsBell
