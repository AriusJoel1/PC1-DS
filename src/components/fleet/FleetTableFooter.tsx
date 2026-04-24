type FleetTableFooterProps = {
  rowCount: number;
  search: string;
};

function FleetTableFooter({ rowCount, search }: FleetTableFooterProps) {
  return (
    <div className="table-footer">
      <span>
        Mostrando {rowCount} de 452 vehículos
        {search ? ` • filtro: "${search}"` : ''}
      </span>

      <div className="pagination">
        <button className="page-btn">‹</button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <span>...</span>
        <button className="page-btn">›</button>
      </div>
    </div>
  );
}

export default FleetTableFooter;
