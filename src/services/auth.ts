import { api, refreshAccessToken, setAccessToken } from './http'

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'operador' | 'supervisor'
}

export async function login(email: string, password: string): Promise<User> {
  const { user, accessToken } = await api<{ user: User; accessToken: string }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
  setAccessToken(accessToken)
  return user
}

export async function logout(): Promise<void> {
  await api<void>('/auth/logout', { method: 'POST' })
  setAccessToken(null)
}

export const me = () => api<User>('/auth/me')

/**
 * Restaura la sesión al cargar la app: la cookie httpOnly de refresh sobrevive a la recarga,
 * pero el access token (en memoria) no. `refresh` -> `me` rehidrata sin pedir login de nuevo.
 */
export async function restoreSession(): Promise<User | null> {
  const ok = await refreshAccessToken()
  if (!ok) return null
  return me()
}
