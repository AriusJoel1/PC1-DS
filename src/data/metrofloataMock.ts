import type { LucideIcon } from 'lucide-react'
import { BarChart3, BusFront, Home, MapPinned, Settings, SignalHigh, Wrench } from 'lucide-react'

export type SectionId = 'inicio' | 'flota' | 'rutas' | 'monitoreo' | 'mantenimiento'

export type NavItem = {
  id: SectionId
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'flota', label: 'Flota', icon: BusFront },
  { id: 'rutas', label: 'Rutas', icon: MapPinned as LucideIcon },
  { id: 'monitoreo', label: 'Monitoreo', icon: SignalHigh },
  { id: 'mantenimiento', label: 'Mantenimiento', icon: Wrench },
]

export const quickActions = [
  { icon: BusFront, label: 'Asignar flota' },
  { icon: Settings, label: 'Orden mant.' },
  { icon: MapPinned, label: 'Mapa en vivo' },
  { icon: BarChart3, label: 'KPIs diario' },
]
