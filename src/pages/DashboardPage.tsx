import { CircleAlert } from 'lucide-react';
import { alerts, kpis, quickActions, routeCompliance, weeklyData } from '../data/metrofloataMock';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function DashboardPage() {
  return (
    <div className="page page-dashboard">
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

      <div className="dashboard-grid">
        <section className="card chart-card">
          <div className="section-head">
            <div>
              <h2>Disponibilidad Semanal</h2>
              <p>Flota operativa vs en mantenimiento</p>
            </div>

            <div className="legend">
              <span><i className="legend-dot dark" />Flota Operativa</span>
              <span><i className="legend-dot light" />En Mantenimiento</span>
            </div>
          </div>

          <div className="chart-box">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="operativa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopOpacity={0.28} />
                    <stop offset="95%" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="operativa"
                  stroke="#0f172a"
                  strokeWidth={2}
                  fill="url(#operativa)"
                />
                <Area
                  type="monotone"
                  dataKey="mantenimiento"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

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
      </div>

      <div className="dashboard-grid second">
        <section className="card compliance-card">
          <div className="section-head">
            <div>
              <h2>Cumplimiento por Ruta (Top / Bottom 3)</h2>
              <p>Rendimiento por servicio</p>
            </div>
          </div>

          <div className="compliance-list">
            {routeCompliance.map((r) => (
              <div key={r.name} className="compliance-row">
                <div className="compliance-row-head">
                  <span>{r.name}</span>
                  <span>{r.value}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${r.value}%`, background: r.color }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card quick-card">
          <div className="section-head">
            <div>
              <h2>Accesos Rápidos</h2>
              <p>Atajos del operador</p>
            </div>
          </div>

          <div className="quick-grid">
            {quickActions.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.label} className="quick-item">
                  <div className="quick-icon">
                    <Icon size={18} />
                  </div>
                  <div className="quick-label">{item.label}</div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage