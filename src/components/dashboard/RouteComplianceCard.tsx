import './RouteComplianceCard.css';

type RouteComplianceItem = {
  name: string;
  value: number;
  color: string;
};

type RouteComplianceCardProps = {
  routeCompliance: RouteComplianceItem[];
};

function RouteComplianceCard({ routeCompliance }: RouteComplianceCardProps) {
  return (
    <section className="card compliance-card">
      <div className="section-head">
        <div>
          <h2>Cumplimiento por Ruta (Top / Bottom 3)</h2>
          <p>Rendimiento por servicio</p>
        </div>
      </div>

      <div className="compliance-list">
        {routeCompliance.map((route) => (
          <div key={route.name} className="compliance-row">
            <div className="compliance-row-head">
              <span>{route.name}</span>
              <span>{route.value}%</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${route.value}%`, background: route.color }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RouteComplianceCard;
