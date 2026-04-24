import { alerts, kpis, quickActions, routeCompliance, weeklyData } from '../data/metrofloataMock';
import DashboardHero from '../components/dashboard/DashboardHero';
import AvailabilityChartCard from '../components/dashboard/AvailabilityChartCard';
import AlertsCard from '../components/dashboard/AlertsCard';
import RouteComplianceCard from '../components/dashboard/RouteComplianceCard';
import QuickActionsCard from '../components/dashboard/QuickActionsCard';

function DashboardPage() {
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
  );
}

export default DashboardPage