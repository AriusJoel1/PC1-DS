import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { BusFront } from 'lucide-react'
import { useAuth } from '../auth/useAuth'
import { ApiError } from '../services/http'
import './LoginPage.css'

function LoginPage() {
  const { login, status } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Si ya hay sesión activa, no tiene sentido mostrar el login.
  if (status === 'authenticated') {
    return (
      <Navigate
        to="/"
        replace
      />
    )
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-shell">
      <form
        className="login-card"
        onSubmit={onSubmit}
      >
        <div className="login-brand">
          <div className="login-brand-icon">
            <BusFront size={24} />
          </div>
          <div>
            <div className="login-brand-title">MetroFlota</div>
            <div className="login-brand-subtitle">Gestión Municipal</div>
          </div>
        </div>

        <h1 className="login-title">Iniciar sesión</h1>
        <p className="login-subtitle">Accede al panel de control de la flota.</p>

        <label className="login-field">
          <span>Correo</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@metroflota.gob.pe"
            autoComplete="username"
            required
          />
        </label>

        <label className="login-field">
          <span>Contraseña</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </label>

        {error ? <div className="login-error">{error}</div> : null}

        <button
          type="submit"
          className="btn btn-primary login-submit"
          disabled={submitting}
        >
          {submitting ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
