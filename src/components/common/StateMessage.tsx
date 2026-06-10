import { AlertTriangle, Inbox, LoaderCircle } from 'lucide-react'
import './StateMessage.css'

type StateVariant = 'loading' | 'error' | 'empty'

type StateMessageProps = {
  variant: StateVariant
  title?: string
  detail?: string
}

const DEFAULT_TITLE: Record<StateVariant, string> = {
  loading: 'Cargando…',
  error: 'Ocurrió un error',
  empty: 'Sin resultados',
}

function StateMessage({ variant, title, detail }: StateMessageProps) {
  return (
    <div className={`state-message state-message-${variant}`}>
      {variant === 'loading' ? (
        <LoaderCircle
          className="state-spin"
          size={26}
        />
      ) : variant === 'error' ? (
        <AlertTriangle size={26} />
      ) : (
        <Inbox size={26} />
      )}
      <p className="state-title">{title ?? DEFAULT_TITLE[variant]}</p>
      {detail ? <p className="state-detail">{detail}</p> : null}
    </div>
  )
}

export default StateMessage
