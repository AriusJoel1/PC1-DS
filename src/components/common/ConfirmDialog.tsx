import { AlertTriangle } from 'lucide-react'
import './ConfirmDialog.css'

type ConfirmDialogProps = {
  title: string
  message?: string
  confirmLabel?: string
  pending?: boolean
  error?: string | null
  onConfirm: () => void
  onClose: () => void
}

function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Eliminar',
  pending = false,
  error,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  return (
    <div className="confirm-layer">
      <button
        className="confirm-backdrop"
        onClick={onClose}
        aria-label="Cerrar"
      />
      <div
        className="confirm"
        role="alertdialog"
        aria-modal="true"
      >
        <div className="confirm-icon">
          <AlertTriangle size={22} />
        </div>
        <h2 className="confirm-title">{title}</h2>
        {message ? <p className="confirm-message">{message}</p> : null}
        {error ? <div className="confirm-error">{error}</div> : null}

        <div className="confirm-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={pending}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={pending}
          >
            {pending ? 'Eliminando…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
