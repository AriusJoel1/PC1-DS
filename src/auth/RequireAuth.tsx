import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

export function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuth()

  if (status === 'loading') {
    return <div className="app-loading">Cargando sesión…</div>
  }
  if (status === 'anonymous') {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }
  return <>{children}</>
}
