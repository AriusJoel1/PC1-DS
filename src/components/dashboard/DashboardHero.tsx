import { Download } from 'lucide-react'
import { useExportGtfs } from '../../hooks/useExportGtfs'
import './DashboardHero.css'

type KpiItem = {
  title: string
  value: number
  delta?: string
  subtitle?: string
  accent: string
}

type DashboardHeroProps = {
  kpis: KpiItem[]
}

function DashboardHero({ kpis }: DashboardHeroProps) {
  const exportGtfs = useExportGtfs()

  return (
    <section className="card hero-card">
      <div className="hero-head">
        <div>
          <h1 className="page-title">Panel de Control Ejecutivo</h1>
          <p className="page-subtitle">Resumen operativo del sistema integrado de transporte.</p>
        </div>

        <div className="hero-actions">
          <button
            className="btn btn-ghost"
            onClick={() => exportGtfs.mutate()}
            disabled={exportGtfs.isPending}
          >
            <Download size={16} />
            {exportGtfs.isPending ? 'Generando…' : 'Descargar Reporte'}
          </button>
          <button className="btn btn-primary">+ Nueva Directiva</button>
        </div>

        {exportGtfs.isError ? (
          <p className="hero-export-error">No se pudo generar el reporte GTFS. Intenta de nuevo.</p>
        ) : null}
      </div>

      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <article
            key={kpi.title}
            className="kpi-card"
          >
            <div className="kpi-top">
              <span className="kpi-label">{kpi.title}</span>
              <span className={`dot dot-${kpi.accent}`} />
            </div>
            <div className="kpi-row">
              <div className="kpi-value">{kpi.value.toLocaleString('es-PE')}</div>
              {kpi.delta ? <div className="kpi-delta">{kpi.delta}</div> : null}
            </div>
            <div className="kpi-bar">
              <div className={`kpi-fill kpi-fill-${kpi.accent}`} />
            </div>
            {kpi.subtitle ? <p className="kpi-subtitle">{kpi.subtitle}</p> : null}
          </article>
        ))}
      </div>
    </section>
  )
}

export default DashboardHero
