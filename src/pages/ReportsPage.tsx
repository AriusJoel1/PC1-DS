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
import { Download } from 'lucide-react'
import StateMessage from '../components/common/StateMessage'
import { errorMessage } from '../lib/errorMessage'
import { formatDate } from '../lib/format'
import { useDailyReport, useMonthlyReport, useRecurringFailures } from '../hooks/useReports'
import { useExportReport } from '../hooks/useExportReport'
import type { DailyReport, MonthlyReport, RecurringFailures } from '../services/reports'
import './ReportsPage.css'

type ReportTab = 'diario' | 'mensual' | 'fallas'

const TABS: { id: ReportTab; label: string }[] = [
  { id: 'diario', label: 'Reporte diario' },
  { id: 'mensual', label: 'Reporte mensual' },
  { id: 'fallas', label: 'Fallas recurrentes' },
]

// Fecha de hoy en formato YYYY-MM-DD usando la hora local.
function todayValue(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// Mes actual en formato YYYY-MM usando la hora local.
function currentMonthValue(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

// Boton de exportar CSV reutilizado por cada pestana (RF-26).
function ExportCsvButton({
  onExport,
  pending,
}: {
  onExport: () => void
  pending: boolean
}) {
  return (
    <button
      className="btn btn-ghost"
      onClick={onExport}
      disabled={pending}
    >
      <Download size={16} />
      {pending ? 'Exportando…' : 'Exportar CSV'}
    </button>
  )
}

// -------------------------- RF-22: reporte diario ---------------------------

function DailyReportSection() {
  const [date, setDate] = useState(todayValue())
  const { data, isLoading, isError, error } = useDailyReport({ date })
  const exportReport = useExportReport()

  const onExport = () => {
    exportReport.mutate({
      path: '/reports/daily',
      filename: `reporte-diario-${date}.csv`,
      params: { date },
    })
  }

  return (
    <section className="card table-card">
      <div className="section-head">
        <div>
          <h2>Operacion diaria</h2>
          <p>Buses despachados, cumplimiento y alertas del dia.</p>
        </div>
        <ExportCsvButton
          onExport={onExport}
          pending={exportReport.isPending}
        />
      </div>

      <div className="filters-row">
        <label className="report-field">
          <span>Fecha</span>
          <input
            className="select-like"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
      </div>

      {isLoading ? (
        <StateMessage
          variant="loading"
          title="Cargando reporte diario…"
        />
      ) : isError ? (
        <StateMessage
          variant="error"
          title="No se pudo cargar el reporte diario"
          detail={errorMessage(error)}
        />
      ) : data ? (
        <DailyReportContent report={data} />
      ) : null}
    </section>
  )
}

function DailyReportContent({ report }: { report: DailyReport }) {
  const cards = [
    { label: 'Buses despachados', value: `${report.busesDispatched} / ${report.fleetTotal}` },
    { label: 'Cumplimiento de frecuencia', value: `${report.frequencyCompliance}%` },
    { label: 'Alertas del dia', value: String(report.alertsCount) },
    { label: 'Kilometraje de flota', value: `${report.fleetKm.toLocaleString('es-PE')} km` },
  ]

  return (
    <>
      <p className="report-caption">Datos del {formatDate(report.date)}</p>
      <div className="report-stats">
        {cards.map((c) => (
          <div
            key={c.label}
            className="report-stat"
          >
            <span className="report-stat-label">{c.label}</span>
            <span className="report-stat-value">{c.value}</span>
          </div>
        ))}
      </div>
    </>
  )
}

// ------------------------- RF-23: reporte mensual ---------------------------

function MonthlyReportSection() {
  const [month, setMonth] = useState(currentMonthValue())
  const { data, isLoading, isError, error } = useMonthlyReport({ month })
  const exportReport = useExportReport()

  const onExport = () => {
    exportReport.mutate({
      path: '/reports/monthly',
      filename: `reporte-mensual-${month}.csv`,
      params: { month },
    })
  }

  return (
    <section className="card table-card">
      <div className="section-head">
        <div>
          <h2>Mantenimiento mensual</h2>
          <p>Mantenimientos y costos por consorcio.</p>
        </div>
        <ExportCsvButton
          onExport={onExport}
          pending={exportReport.isPending}
        />
      </div>

      <div className="filters-row">
        <label className="report-field">
          <span>Mes</span>
          <input
            className="select-like"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </label>
      </div>

      {isLoading ? (
        <StateMessage
          variant="loading"
          title="Cargando reporte mensual…"
        />
      ) : isError ? (
        <StateMessage
          variant="error"
          title="No se pudo cargar el reporte mensual"
          detail={errorMessage(error)}
        />
      ) : !data || data.byConsortium.length === 0 ? (
        <StateMessage
          variant="empty"
          title="Sin datos para el mes seleccionado"
          detail="Prueba con otro mes."
        />
      ) : (
        <MonthlyReportContent report={data} />
      )}
    </section>
  )
}

function MonthlyReportContent({ report }: { report: MonthlyReport }) {
  const chartData = report.byConsortium.map((row) => ({
    name: row.consortiumName,
    mantenimientos: row.maintenanceCount,
  }))

  return (
    <>
      <div className="report-stats">
        <div className="report-stat">
          <span className="report-stat-label">Total de mantenimientos</span>
          <span className="report-stat-value">{report.totalMaintenance}</span>
        </div>
        <div className="report-stat">
          <span className="report-stat-label">Costo total</span>
          <span className="report-stat-value">S/. {report.totalCost.toLocaleString('es-PE')}</span>
        </div>
      </div>

      <div className="chart-box">
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
              dataKey="name"
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip />
            <Bar
              dataKey="mantenimientos"
              fill="#0f172a"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Consorcio</th>
              <th>Mantenimientos</th>
              <th>Costo</th>
              <th>Vehiculos</th>
              <th>Operativos</th>
              <th>Disponibilidad</th>
            </tr>
          </thead>
          <tbody>
            {report.byConsortium.map((row) => (
              <tr key={row.consortiumId}>
                <td>{row.consortiumName}</td>
                <td>{row.maintenanceCount}</td>
                <td>S/. {row.totalCost.toLocaleString('es-PE')}</td>
                <td>{row.vehicles}</td>
                <td>{row.vehiclesOperational}</td>
                <td>{row.availability}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// ---------------------- RF-21: fallas recurrentes ---------------------------

function RecurringFailuresSection() {
  const { data, isLoading, isError, error } = useRecurringFailures()
  const exportReport = useExportReport()

  const onExport = () => {
    exportReport.mutate({
      path: '/reports/recurring-failures',
      filename: 'fallas-recurrentes.csv',
    })
  }

  const isEmpty =
    !!data && data.byDescription.length === 0 && data.byComponent.length === 0

  return (
    <section className="card table-card">
      <div className="section-head">
        <div>
          <h2>Fallas recurrentes</h2>
          <p>Mantenimientos correctivos agrupados por falla y componente.</p>
        </div>
        <ExportCsvButton
          onExport={onExport}
          pending={exportReport.isPending}
        />
      </div>

      {isLoading ? (
        <StateMessage
          variant="loading"
          title="Cargando fallas recurrentes…"
        />
      ) : isError ? (
        <StateMessage
          variant="error"
          title="No se pudo cargar el reporte de fallas"
          detail={errorMessage(error)}
        />
      ) : !data || isEmpty ? (
        <StateMessage
          variant="empty"
          title="No hay fallas registradas"
          detail="No se encontraron mantenimientos correctivos."
        />
      ) : (
        <RecurringFailuresContent report={data} />
      )}
    </section>
  )
}

function RecurringFailuresContent({ report }: { report: RecurringFailures }) {
  const chartData = report.byComponent.slice(0, 8).map((row) => ({
    name: row.failure,
    fallas: row.count,
  }))

  return (
    <>
      {chartData.length > 0 ? (
        <div className="chart-box">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
              />
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={140}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Bar
                dataKey="fallas"
                fill="#0f172a"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : null}

      <div className="report-tables">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Falla</th>
                <th>Ocurrencias</th>
              </tr>
            </thead>
            <tbody>
              {report.byDescription.map((row) => (
                <tr key={row.failure}>
                  <td>{row.failure}</td>
                  <td>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Componente</th>
                <th>Ocurrencias</th>
              </tr>
            </thead>
            <tbody>
              {report.byComponent.map((row) => (
                <tr key={row.failure}>
                  <td>{row.failure}</td>
                  <td>{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function ReportsPage() {
  const [tab, setTab] = useState<ReportTab>('diario')

  return (
    <div className="page">
      <section className="card table-card">
        <div className="section-head">
          <div>
            <h1 className="page-title">Reportes</h1>
            <p className="page-subtitle">
              Indicadores operativos de la flota con opcion de exportar.
            </p>
          </div>
        </div>

        <div className="report-tabs">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`report-tab ${tab === t.id ? 'active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {tab === 'diario' ? <DailyReportSection /> : null}
      {tab === 'mensual' ? <MonthlyReportSection /> : null}
      {tab === 'fallas' ? <RecurringFailuresSection /> : null}
    </div>
  )
}

export default ReportsPage
