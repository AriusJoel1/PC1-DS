import { quickActions } from '../data/metrofloataMock'
import DashboardHero from '../components/dashboard/DashboardHero'
import AvailabilityChartCard from '../components/dashboard/AvailabilityChartCard'
import AlertsCard from '../components/dashboard/AlertsCard'
import RouteComplianceCard from '../components/dashboard/RouteComplianceCard'
import QuickActionsCard from '../components/dashboard/QuickActionsCard'
import { useAvailability, useKpis, useRecentAlerts, useRouteCompliance } from '../hooks/useDashboard'
import { formatRelativeTime } from '../lib/format'

function DashboardPage() {
  const { data: kpis = [] } = useKpis()
  const { data: weeklyData = [] } = useAvailability('week')
  const { data: routeCompliance = [] } = useRouteCompliance()
  const { data: recentAlerts = [] } = useRecentAlerts(3)

  const alerts = recentAlerts.map((a) => ({
    id: a.id,
    title: a.title,
    text: a.text,
    time: formatRelativeTime(a.time),
    tone: a.tone,
  }))

  return (
    <div className="page page-dashboard">
      <DashboardHero kpis={kpis} />

      <div className="dashboard-grid">
        <AvailabilityChartCard weeklyData={weeklyData} />
        <AlertsCard alerts={alerts} />
      </div>

      <div className="dashboard-grid second">
        <RouteComplianceCard routeCompliance={routeCompliance} />
        <QuickActionsCard quickActions={quickActions} />
      </div>
    </div>
  )
}

export default DashboardPage
