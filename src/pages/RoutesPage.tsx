import { routeRows } from '../data/metrofloataMock';
import RoutesHeader from '../components/routes/RoutesHeader';
import RoutesSummary from '../components/routes/RoutesSummary';
import RoutesTable from '../components/routes/RoutesTable';

function RoutesPage() {
  const total = routeRows.length;
  const active = routeRows.filter((r) => r.state === 'Activa').length;
  const review = routeRows.filter((r) => r.state === 'En Revisión').length;
  const suspended = routeRows.filter((r) => r.state === 'Suspendida').length;

  return (
    <div className="page">
      <section className="card table-card">
        <RoutesHeader />
        <RoutesSummary total={total} active={active} review={review} suspended={suspended} />
        <RoutesTable rows={routeRows} />

        <div className="table-footer">
          <span>Mostrando {total} rutas configuradas</span>
        </div>
      </section>
    </div>
  );
}

export default RoutesPage