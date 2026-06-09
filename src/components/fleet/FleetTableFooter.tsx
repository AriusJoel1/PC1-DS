import './FleetTableFooter.css'

type FleetTableFooterProps = {
  page: number
  pageSize: number
  total: number
  shown: number
  search: string
  onPageChange: (page: number) => void
}

function pageWindow(current: number, totalPages: number): number[] {
  const span = 2
  const start = Math.max(1, current - span)
  const end = Math.min(totalPages, current + span)
  const pages: number[] = []
  for (let p = start; p <= end; p++) pages.push(p)
  return pages
}

function FleetTableFooter({ page, pageSize, total, shown, search, onPageChange }: FleetTableFooterProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = (page - 1) * pageSize + shown

  return (
    <div className="table-footer">
      <span>
        {total === 0 ? 'Sin resultados' : `Mostrando ${from}–${to} de ${total} vehículos`}
        {search ? ` • filtro: "${search}"` : ''}
      </span>

      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Página anterior"
        >
          ‹
        </button>

        {pageWindow(page, totalPages).map((p) => (
          <button
            key={p}
            className={`page-btn ${p === page ? 'active' : ''}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}

        <button
          className="page-btn"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Página siguiente"
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default FleetTableFooter
