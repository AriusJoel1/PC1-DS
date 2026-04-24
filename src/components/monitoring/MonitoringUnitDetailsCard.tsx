import { BusFront } from 'lucide-react';
import { stops } from '../../data/metrofloataMock';
import './MonitoringUnitDetailsCard.css';

type MonitoringUnitDetailsCardProps = {
  selectedVehicle: 'U-4022' | 'U-208';
};

function MonitoringUnitDetailsCard({ selectedVehicle }: MonitoringUnitDetailsCardProps) {
  return (
    <section className="card detail-card">
      <h2>Detalles de Unidad</h2>
      <p className="detail-subtitle">Selección Activa</p>

      <div className="unit-card">
        <div className="unit-top">
          <div className="unit-icon">
            <BusFront size={22} />
          </div>
          <div>
            <div className="unit-name">
              {selectedVehicle === 'U-4022' ? 'U-4022' : 'U-208'}
            </div>
            <div className="unit-route">
              Ruta Tronc. B • Exp. Norte
            </div>
          </div>
        </div>
        <div className="unit-status">EN RUTA</div>
      </div>

      <div className="mini-grid">
        <div className="mini-card">
          <span>Velocidad</span>
          <strong>64<small> km/h</small></strong>
        </div>

        <div className="mini-card">
          <span>Ocupación</span>
          <strong>65<small>%</small></strong>
        </div>
      </div>

      <div className="mini-card conductor">
        <span>Conductor</span>
        <strong>Roberto Salazar</strong>
        <small>ID: 88492-C</small>
      </div>

      <div className="stops-card">
        <span>Próximas paradas</span>

        <div className="stops-list">
          {stops.map((stop) => (
            <div key={stop.name} className="stop-item">
              <div className={`stop-dot ${stop.active ? 'active' : ''}`} />
              <div className="stop-content">
                <strong>{stop.name}</strong>
                <div className={stop.active ? 'stop-meta active' : 'stop-meta'}>
                  {stop.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-primary full">Contactar Unidad</button>
    </section>
  );
}

export default MonitoringUnitDetailsCard;
