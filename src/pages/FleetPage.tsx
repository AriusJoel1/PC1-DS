import type { VehicleRow } from '../data/metrofloataMock';
import FleetHeader from '../components/fleet/FleetHeader';
import FleetFilters from '../components/fleet/FleetFilters';
import FleetTable from '../components/fleet/FleetTable';
import FleetTableFooter from '../components/fleet/FleetTableFooter';

function FleetPage({
  search,
  rows,
}: {
  search: string;
  rows: VehicleRow[];
}) {
  const rowCount = rows.length;

  return (
    <div className="page">
      <section className="card table-card">
        <FleetHeader />
        <FleetFilters />
        <FleetTable rows={rows} />
        <FleetTableFooter rowCount={rowCount} search={search} />
      </section>
    </div>
  );
}

export default FleetPage