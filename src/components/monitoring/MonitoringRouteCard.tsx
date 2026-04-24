import { MapPinned } from 'lucide-react';

function MonitoringRouteCard() {
  return (
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
  );
}

export default MonitoringRouteCard;
