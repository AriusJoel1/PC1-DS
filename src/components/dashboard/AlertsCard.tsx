import { CircleAlert } from 'lucide-react';

type AlertItem = {
  title: string;
  text: string;
  time: string;
  tone: 'danger' | 'warning';
};

type AlertsCardProps = {
  alerts: AlertItem[];
};

function AlertsCard({ alerts }: AlertsCardProps) {
  return (
    <section className="card alerts-card">
      <div className="section-head">
        <div>
          <h2>Alertas Críticas</h2>
          <p>Eventos relevantes en tiempo real</p>
        </div>
        <button className="link-btn">Ver todas</button>
      </div>

      <div className="alerts-list">
        {alerts.map((item) => (
          <article
            key={item.title}
            className={`alert-item ${item.tone === 'danger' ? 'danger' : 'warning'}`}
          >
            <div className="alert-icon">
              <CircleAlert size={16} />
            </div>
            <div className="alert-content">
              <div className="alert-title">{item.title}</div>
              <div className="alert-text">{item.text}</div>
              <div className="alert-time">{item.time}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AlertsCard;
