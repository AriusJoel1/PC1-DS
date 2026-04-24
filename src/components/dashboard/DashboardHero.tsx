import './DashboardHero.css';

type KpiItem = {
  title: string;
  value: string;
  delta: string;
  subtitle: string;
  accent: string;
};

type DashboardHeroProps = {
  kpis: KpiItem[];
};

function DashboardHero({ kpis }: DashboardHeroProps) {
  return (
    <section className="card hero-card">
      <div className="hero-head">
        <div>
          <h1 className="page-title">Panel de Control Ejecutivo</h1>
          <p className="page-subtitle">
            Resumen operativo del sistema integrado de transporte.
          </p>
        </div>

        <div className="hero-actions">
          <button className="btn btn-ghost">Descargar Reporte</button>
          <button className="btn btn-primary">+ Nueva Directiva</button>
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <article key={kpi.title} className="kpi-card">
            <div className="kpi-top">
              <span className="kpi-label">{kpi.title}</span>
              <span className={`dot dot-${kpi.accent}`} />
            </div>
            <div className="kpi-row">
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-delta">{kpi.delta}</div>
            </div>
            <div className="kpi-bar">
              <div className={`kpi-fill kpi-fill-${kpi.accent}`} />
            </div>
            <p className="kpi-subtitle">{kpi.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DashboardHero;
