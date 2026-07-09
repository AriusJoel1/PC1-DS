import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import StateMessage from '../components/common/StateMessage'
import { errorMessage } from '../lib/errorMessage'
import { useRoutes } from '../hooks/useRoutes'
import { useSimulation } from '../hooks/useSimulation'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import './SimulationPage.css'

const MIN_BUSES = 1
const MAX_BUSES = 40
const DEFAULT_BUSES = 10

function SimulationPage() {
  const [routeCode, setRouteCode] = useState('')
  const [buses, setBuses] = useState(DEFAULT_BUSES)

  // El slider dispara muchos cambios seguidos, asi que esperamos un poco
  // antes de pedir el escenario al backend.
  const debouncedBuses = useDebouncedValue(buses)

  const { data: routesPage } = useRoutes({ pageSize: 100 })
  const routes = routesPage?.data ?? []

  const { data, isLoading, isError, error } = useSimulation(routeCode || null, debouncedBuses)

  // Datos para el grafico de barras: comparamos headway y espera promedio.
  const chartData = data
    ? [
        { metric: 'Headway', minutos: data.headwayMinutes },
        { metric: 'Espera prom.', minutos: data.avgWaitMinutes },
      ]
    : []

  return (
    <div className="page">
      <section className="card table-card">
        <div className="section-head">
          <div>
            <h1 className="page-title">Simulacion what-if</h1>
            <p className="page-subtitle">
              Elige una ruta y ajusta el numero de buses para ver el impacto en el headway.
            </p>
          </div>
        </div>

        <div className="sim-controls">
          <label className="sim-field">
            <span>Ruta</span>
            <select
              className="sim-select"
              value={routeCode}
              onChange={(e) => setRouteCode(e.target.value)}
            >
              <option value="">Selecciona una ruta</option>
              {routes.map((r) => (
                <option
                  key={r.code}
                  value={r.code}
                >
                  {r.code} - {r.name}
                </option>
              ))}
            </select>
          </label>

          <label className="sim-field">
            <span>Buses en operacion</span>
            <div className="sim-slider-value">
              {buses}
              <small>buses</small>
            </div>
            <input
              className="sim-range"
              type="range"
              min={MIN_BUSES}
              max={MAX_BUSES}
              value={buses}
              onChange={(e) => setBuses(Number(e.target.value))}
            />
          </label>
        </div>

        {!routeCode ? (
          <StateMessage
            variant="empty"
            title="Elige una ruta para simular"
            detail="Los resultados se calculan segun la longitud de la ruta seleccionada."
          />
        ) : isLoading ? (
          <StateMessage
            variant="loading"
            title="Calculando escenario…"
          />
        ) : isError ? (
          <StateMessage
            variant="error"
            title="No se pudo calcular el escenario"
            detail={errorMessage(error)}
          />
        ) : data ? (
          <>
            <div className="sim-grid">
              <div className="sim-card">
                <span>Tiempo de ciclo</span>
                <strong>
                  {data.cycleTimeMinutes}
                  <small>min</small>
                </strong>
              </div>
              <div className="sim-card">
                <span>Headway</span>
                <strong>
                  {data.headwayMinutes}
                  <small>min</small>
                </strong>
              </div>
              <div className="sim-card">
                <span>Espera promedio</span>
                <strong>
                  {data.avgWaitMinutes}
                  <small>min</small>
                </strong>
              </div>
              <div className="sim-card">
                <span>Velocidad usada</span>
                <strong>
                  {data.avgSpeedKmh}
                  <small>km/h</small>
                </strong>
              </div>
            </div>

            <div className="sim-chart-box">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="metric"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Bar
                    dataKey="minutos"
                    fill="#2563eb"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : null}
      </section>
    </div>
  )
}

export default SimulationPage
