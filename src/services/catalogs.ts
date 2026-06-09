import { api } from './http'

export interface Consortium {
  id: string
  name: string
}

export const listConsortiums = () => api<Consortium[]>('/consortiums')
