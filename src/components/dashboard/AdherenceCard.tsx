import { useAdherence } from '../../hooks/useDashboard'
import './RouteComplianceCard.css'

// Panel de adherencia (RF-15): buses programados vs en operacion por ruta.
function AdherenceCard() {
  const { data = [] } = useAdherence()

  return (
    <section className="card compliance-card">
      <div className="section-head">
        <div>
          <h2>Adherencia por Ruta</h2>
          <p>Buses programados vs en operacion</p>
        </div>
      </div>

      <div className="compliance-list">
        {data.map((item) => {
          const color = item.adherence >= 90 ? '#16a34a' : item.adherence >= 70 ? '#d4a15d' : '#b91c1c'
          return (
            <div key={item.routeCode} className="compliance-row">
              <div className="compliance-row-head">
                <span>{item.routeCode}</span>
                <span>
                  {item.running}/{item.scheduled} ({item.adherence}%)
                </span>
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${item.adherence}%`, background: color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default AdherenceCard
