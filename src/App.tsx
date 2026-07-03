import { useState } from 'react'
import { BusFront, CircleAlert, LogOut, Menu, Search, UserCircle2 } from 'lucide-react'
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'

import { navItems } from './data/metrofloataMock'

import type { SectionId } from './data/metrofloataMock'
import MonitoringPage from './pages/MonitoringPage'
import DashboardPage from './pages/DashboardPage'
import FleetPage from './pages/FleetPage'
import RoutesPage from './pages/RoutesPage'
import LoginPage from './pages/LoginPage'
import AlertsBell from './components/alerts/AlertsBell'
import { RequireAuth } from './auth/RequireAuth'
import { useAuth } from './auth/useAuth'

const sectionToPath: Record<SectionId, string> = {
  inicio: '/',
  flota: '/flota',
  rutas: '/rutas',
  monitoreo: '/monitoreo',
}

function App() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [search, setSearch] = useState('')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const currentPath = location.pathname
  const isFleetRoute = currentPath === '/flota'

  // El login es pantalla completa, fuera del shell (sidebar + topbar).
  if (currentPath === '/login') {
    return <LoginPage />
  }

  return (
    <RequireAuth>
      <div className={`app-shell ${mobileSidebarOpen ? 'sidebar-open' : ''}`}>
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
              const path = sectionToPath[id]
              return (
                <NavLink
                  key={id}
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </NavLink>
              )
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
              <button
                className="icon-btn mobile-only"
                onClick={() => setMobileSidebarOpen((open) => !open)}
                aria-label="Abrir menú"
              >
                <Menu size={20} />
              </button>

              <div className="search-wrap">
                <Search
                  size={16}
                  className="search-icon"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                  placeholder={isFleetRoute ? 'Buscar vehículo por placa, consorcio...' : 'Buscar...'}
                />
              </div>
            </div>

            <div className="topbar-right">
              <AlertsBell />
              {/* <button className="icon-btn">
                <HelpCircle size={17} />
              </button> */}
              {user ? <span className="user-name">{user.name}</span> : null}
              <div
                className="avatar"
                title={user?.email ?? ''}
              >
                <UserCircle2 size={18} />
              </div>
              <button
                className="icon-btn"
                onClick={() => logout()}
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                <LogOut size={17} />
              </button>
            </div>
          </header>

          <Routes>
            <Route
              path="/"
              element={<DashboardPage />}
            />
            <Route
              path="/flota"
              element={<FleetPage search={search} />}
            />
            <Route
              path="/rutas"
              element={<RoutesPage />}
            />
            <Route
              path="/monitoreo"
              element={<MonitoringPage />}
            />
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />
          </Routes>
        </main>

        <button
          className="sidebar-backdrop"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Cerrar menú"
        />
      </div>
    </RequireAuth>
  )
}

export default App
