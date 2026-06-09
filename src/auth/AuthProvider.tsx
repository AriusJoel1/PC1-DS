import { useEffect, useState, type ReactNode } from 'react'
import { AuthContext, type AuthStatus } from './context'
import type { User } from '../services/auth'
import { login as authLogin, logout as authLogout, restoreSession } from '../services/auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let active = true
    restoreSession()
      .then((restored) => {
        if (!active) return
        setUser(restored)
        setStatus(restored ? 'authenticated' : 'anonymous')
      })
      .catch(() => {
        if (active) setStatus('anonymous')
      })
    return () => {
      active = false
    }
  }, [])

  const login = async (email: string, password: string) => {
    const loggedIn = await authLogin(email, password)
    setUser(loggedIn)
    setStatus('authenticated')
  }

  const logout = async () => {
    await authLogout()
    setUser(null)
    setStatus('anonymous')
  }

  return <AuthContext.Provider value={{ status, user, login, logout }}>{children}</AuthContext.Provider>
}
