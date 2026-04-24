import './FleetFilters.css';

function FleetFilters() {
  return (
    <div className="filters-row">
      <div className="select-like">Todos los consorcios</div>
      <div className="select-like">Todos los estados</div>
      <div className="select-like">Todos los tipos</div>

      <button className="btn btn-ghost">Limpiar</button>
      <button className="btn btn-primary dark">Aplicar Filtros</button>
    </div>
  );
}

export default FleetFilters;
