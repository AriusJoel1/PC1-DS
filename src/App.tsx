import { useMemo, useState } from 'react';
import {
  Bell,
  BusFront,
  CircleAlert,
  HelpCircle,
  MapPinned,
  Menu,
  Plus,
  Search,
  UserCircle2,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  alerts,
  kpis,
  mapMarkers,
  navItems,
  quickActions,
  routeCompliance,
  stops,
  vehicleRows,
  weeklyData,
} from './data/metrofloataMock';

import type { SectionId } from './data/metrofloataMock';

function App() {
  const [section, setSection] = useState<SectionId>('inicio');
  const [search, setSearch] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<'U-4022' | 'U-208'>('U-4022');

  const filteredRows = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return vehicleRows;

    return vehicleRows.filter((row) => {
      return (
        row.plate.toLowerCase().includes(q) ||
        row.id.toLowerCase().includes(q) ||
        row.type.toLowerCase().includes(q) ||
        row.consortium.toLowerCase().includes(q) ||
        row.state.toLowerCase().includes(q)
      );
    });
  }, [search]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
            <BusFront size={22} />
          </div>
          <div>
            <div className="brand-title">MetroFlota</div>
            <div className="brand-subtitle">Gestión Municipal</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = section === id;
            return (
              <button
                key={id}
                className={`nav-item ${active ? 'active' : ''}`}
                onClick={() => setSection(id)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="status-box">
            <div className="status-title">
              <CircleAlert size={14} />
              Estado del sistema
            </div>
            <p>Datos de demostración para el prototipo visual.</p>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-btn mobile-only">
              <Menu size={20} />
            </button>

            <div className="search-wrap">
              <Search size={16} className="search-icon" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
                placeholder={
                  section === 'flota'
                    ? 'Buscar vehículo por placa, consorcio...'
                    : 'Buscar...'
                }
              />
            </div>
          </div>

          <div className="topbar-right">
            <button className="icon-btn">
              <Bell size={17} />
            </button>
            <button className="icon-btn">
              <HelpCircle size={17} />
            </button>
            <div className="avatar">
              <UserCircle2 size={18} />
            </div>
          </div>
        </header>

        {section === 'inicio' && <DashboardPage />}
        {section === 'flota' && <FleetPage search={search} rows={filteredRows} />}
        {section === 'monitoreo' && (
          <MonitoringPage
            selectedVehicle={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
          />
        )}
      </main>
    </div>
  );
}

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

function FleetPage({
  search,
  rows,
}: {
  search: string;
  rows: typeof vehicleRows;
}) {
  const rowCount = rows.length;

  return (
    <div className="page">
      <section className="card table-card">
        <div className="section-head">
          <div>
            <h1 className="page-title">Gestión de Flota Vehicular</h1>
            <p className="page-subtitle">
              Monitoreo y administración del parque automotor del sistema metropolitano.
            </p>
          </div>

          <button className="btn btn-primary">
            <Plus size={16} />
            Nuevo Vehículo
          </button>
        </div>

        <div className="filters-row">
          <div className="select-like">Todos los consorcios</div>
          <div className="select-like">Todos los estados</div>
          <div className="select-like">Todos los tipos</div>

          <button className="btn btn-ghost">Limpiar</button>
          <button className="btn btn-primary dark">Aplicar Filtros</button>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Placa / ID</th>
                <th>Tipo</th>
                <th>Consorcio</th>
                <th>Kilometraje</th>
                <th>Estado</th>
                <th>Últ. mantenimiento</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.plate}>
                  <td>
                    <div className="cell-main">{row.plate}</div>
                    <div className="cell-sub">ID: {row.id}</div>
                  </td>
                  <td>{row.type}</td>
                  <td>{row.consortium}</td>
                  <td>
                    <div className="km-cell">
                      <span>{row.km}</span>
                      <div className="km-bar">
                        <div
                          className={`km-fill ${
                            row.state === 'Operativo'
                              ? 'ok'
                              : row.state === 'En Taller'
                                ? 'warn'
                                : 'bad'
                          }`}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`status-pill ${row.state.toLowerCase().replace(' ', '-')}`}>
                      {row.state}
                    </span>
                  </td>
                  <td>{row.date}</td>
                  <td>
                    <button className="more-btn">⋯</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>
            Mostrando {rowCount} de 452 vehículos
            {search ? ` • filtro: "${search}"` : ''}
          </span>

          <div className="pagination">
            <button className="page-btn">‹</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span>...</span>
            <button className="page-btn">›</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function MonitoringPage({
  selectedVehicle,
  onSelectVehicle,
}: {
  selectedVehicle: 'U-4022' | 'U-208';
  onSelectVehicle: (value: 'U-4022' | 'U-208') => void;
}) {
  return (
    <div className="page monitor-layout">
      <section className="card monitor-map-card">
        <div className="monitor-head">
          <div className="route-switch">
            <button className="route-btn active">Ruta Troncal</button>
            <button className="route-btn">Alimentadores</button>
          </div>

          <div className="small-search">
            <Search size={14} />
            <input placeholder="Buscar unidad..." />
          </div>
        </div>

        <div className="map-card">
          <div className="map-tabs">
            <button className="map-tab active">Mapa</button>
            <button className="map-tab">Satélite</button>
            <button className="map-tab">Tráfico</button>
          </div>

          <div className="map-search">
            <Search size={14} />
            <input placeholder="Buscar unidad..." />
          </div>

          <div className="map-background">
            <svg viewBox="0 0 1000 1000" className="map-svg">
              <defs>
                <filter id="blur">
                  <feGaussianBlur stdDeviation="1.1" />
                </filter>
              </defs>

              {Array.from({ length: 38 }).map((_, i) => (
                <g key={i} stroke="#c8d3e3" strokeWidth="2" opacity={i % 2 === 0 ? 0.8 : 0.45}>
                  <line x1={(i * 37) % 1000} y1={0} x2={(i * 37) % 1000} y2={1000} />
                  <line x1={0} y1={(i * 28) % 1000} x2={1000} y2={(i * 28) % 1000} />
                </g>
              ))}

              <path
                d="M500 120 C470 220, 430 360, 480 500 C520 610, 535 720, 500 880"
                stroke="#123b70"
                strokeWidth="16"
                fill="none"
                strokeLinecap="round"
                filter="url(#blur)"
                opacity="0.9"
              />
              <path
                d="M500 120 C470 220, 430 360, 480 500 C520 610, 535 720, 500 880"
                stroke="#5b59f0"
                strokeWidth="9"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {mapMarkers.map((m, idx) => (
              <div
                key={idx}
                className="bus-dot"
                style={{ left: m.left, top: m.top }}
              />
            ))}

            <div className="floating-timebox">
              <div>4 min</div>
              <span>2 km</span>
            </div>

            <div className="floating-legend">
              <div className="legend-title">Estado de Flota</div>
              <div className="legend-line">
                <span className="legend-bullet green" />
                En ruta (245)
              </div>
              <div className="legend-line">
                <span className="legend-bullet amber" />
                Retraso (12)
              </div>
              <div className="legend-line">
                <span className="legend-bullet red" />
                Detenido (4)
              </div>
            </div>
          </div>
        </div>
      </section>

      <aside className="monitor-side">
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

        <section className="card vehicle-toggle-card">
          <div className="toggle-row">
            <button
              className={`vehicle-toggle ${selectedVehicle === 'U-4022' ? 'active' : ''}`}
              onClick={() => onSelectVehicle('U-4022')}
            >
              U-4022
            </button>
            <button
              className={`vehicle-toggle ${selectedVehicle === 'U-208' ? 'active' : ''}`}
              onClick={() => onSelectVehicle('U-208')}
            >
              U-208
            </button>
          </div>
        </section>
      </aside>
    </div>
  );
}

export default App;