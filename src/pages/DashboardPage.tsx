// import { quickActions } from '../data/metrofloataMock'
import DashboardHero from '../components/dashboard/DashboardHero'
import AvailabilityChartCard from '../components/dashboard/AvailabilityChartCard'
import AlertsCard from '../components/dashboard/AlertsCard'
import RouteComplianceCard from '../components/dashboard/RouteComplianceCard'
// import QuickActionsCard from '../components/dashboard/QuickActionsCard'
import StateMessage from '../components/common/StateMessage'
import { useAvailability, useKpis, useRecentAlerts, useRouteCompliance } from '../hooks/useDashboard'
import { formatRelativeTime } from '../lib/format'

function DashboardPage() {
  const { data: kpis = [], isError: kpisError } = useKpis()
  const { data: weeklyData = [], isError: availabilityError } = useAvailability('week')
  const { data: routeCompliance = [], isError: complianceError } = useRouteCompliance()
  const { data: recentAlerts = [], isError: alertsError } = useRecentAlerts(3)

  const hasError = kpisError || availabilityError || complianceError || alertsError

  const alerts = recentAlerts.map((a) => ({
    id: a.id,
    title: a.title,
    text: a.text,
    time: formatRelativeTime(a.time),
    tone: a.tone,
  }))

  return (
    <div className="page page-dashboard">
      {hasError ? (
        <StateMessage
          variant="error"
          title="Algunos datos del panel no se pudieron cargar"
          detail="Revisa la conexión con el backend e inténtalo de nuevo."
        />
      ) : null}

      <DashboardHero kpis={kpis} />

      <div className="dashboard-grid">
        <AvailabilityChartCard weeklyData={weeklyData} />
        <AlertsCard alerts={alerts} />
      </div>

      <div className="dashboard-grid second">
        <RouteComplianceCard routeCompliance={routeCompliance} />
        {/* <QuickActionsCard quickActions={quickActions} /> */}
      </div>
    </div>
  )
}

export default DashboardPage
