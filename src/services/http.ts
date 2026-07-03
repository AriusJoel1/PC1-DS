import { API_URL } from '../config'

let accessToken: string | null = null

export const setAccessToken = (t: string | null) => {
  accessToken = t
}
export const getAccessToken = () => accessToken

export type ApiErrorBody = { error?: { code: string; message: string } } | null

export class ApiError extends Error {
  status: number
  body: ApiErrorBody

  constructor(status: number, body: ApiErrorBody) {
    super(body?.error?.message ?? `HTTP ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

export async function refreshAccessToken(): Promise<boolean> {
  const res = await fetch(`${API_URL}/auth/refresh`, { method: 'POST', credentials: 'include' })
  if (!res.ok) return false
  const { accessToken: token } = (await res.json()) as { accessToken: string }
  setAccessToken(token)
  return true
}

export interface Page<T> {
  data: T[]
  meta: { total: number; page: number; pageSize: number }
}

export function toQuery(params: Record<string, unknown>): string {
  const q = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v != null && v !== '')
      .map(([k, v]) => [k, String(v)]),
  ).toString()
  return q ? `?${q}` : ''
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const isFormData = typeof FormData !== 'undefined' && init.body instanceof FormData

  const doFetch = () =>
    fetch(`${API_URL}${path}`, {
      ...init,
      credentials: 'include',
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...init.headers,
      },
    })

  let res = await doFetch()

  // Access token expirado -> intenta refrescar una vez y reintenta.
  if (res.status === 401 && accessToken) {
    if (await refreshAccessToken()) res = await doFetch()
  }

  if (res.status === 204) return undefined as T
  const body = await res.json().catch(() => null)
  if (!res.ok) throw new ApiError(res.status, body)
  return body as T
}
