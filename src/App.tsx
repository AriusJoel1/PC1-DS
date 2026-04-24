import { useMemo, useState } from 'react';
import {
  Bell,
  BusFront,
  CircleAlert,
  HelpCircle,
  Menu,
  Search,
  UserCircle2,
} from 'lucide-react';

import {
  navItems,
  vehicleRows,
} from './data/metrofloataMock';

import type { SectionId } from './data/metrofloataMock';
import MonitoringPage from './pages/MonitoringPage';
import DashboardPage from './pages/DashboardPage';
import FleetPage from './pages/FleetPage';
import RoutesPage from './pages/RoutesPage';

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
        {section === 'rutas' && <RoutesPage />}
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

export default App;