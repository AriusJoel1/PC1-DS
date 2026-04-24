import './RoutesSummary.css';

type RoutesSummaryProps = {
  total: number;
  active: number;
  review: number;
  suspended: number;
};

function RoutesSummary({ total, active, review, suspended }: RoutesSummaryProps) {
  return (
    <div className="route-summary">
      <div className="route-summary-item">
        <span>Total</span>
        <strong>{total}</strong>
      </div>
      <div className="route-summary-item">
        <span>Activas</span>
        <strong className="ok">{active}</strong>
      </div>
      <div className="route-summary-item">
        <span>En revisión</span>
        <strong className="warn">{review}</strong>
      </div>
      <div className="route-summary-item">
        <span>Suspendidas</span>
        <strong className="bad">{suspended}</strong>
      </div>
    </div>
  );
}

export default RoutesSummary;
