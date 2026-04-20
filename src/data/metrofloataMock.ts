import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  BusFront,
  Gauge,
  Home,
  MapPinned,
  Route,
  Settings,
  SignalHigh,
} from 'lucide-react';

export type SectionId = 'inicio' | 'flota' | 'monitoreo';

export type NavItem = {
  id: SectionId;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { id: 'inicio', label: 'Inicio', icon: Home },
  { id: 'flota', label: 'Flota', icon: BusFront },
  { id: 'rutas', label: 'Rutas', icon: MapPinned as LucideIcon },
  { id: 'monitoreo', label: 'Monitoreo', icon: SignalHigh },
];

export const kpis = [
  {
    title: 'Buses en servicio',
    value: '1,245',
    delta: '+24 hoy',
    subtitle: '81% de la flota total',
    accent: 'blue',
  },
  {
    title: 'Disponibilidad flota',
    value: '92.4%',
    delta: '+1.2%',
    subtitle: 'Tendencia semanal',
    accent: 'green',
  },
  {
    title: 'Cumplimiento frecuencia',
    value: '88.7%',
    delta: '+0.5%',
    subtitle: 'Nivel de servicio óptimo',
    accent: 'indigo',
  },
  {
    title: 'Alertas activas',
    value: '14',
    delta: '5 críticas',
    subtitle: '2 Motivos • 8 Ruta • +3',
    accent: 'red',
  },
];

export const weeklyData = [
  { day: 'Lun', operativa: 72, mantenimiento: 28 },
  { day: 'Mar', operativa: 78, mantenimiento: 22 },
  { day: 'Mié', operativa: 68, mantenimiento: 32 },
  { day: 'Jue', operativa: 82, mantenimiento: 18 },
  { day: 'Vie', operativa: 63, mantenimiento: 37 },
  { day: 'Sáb', operativa: 57, mantenimiento: 43 },
  { day: 'Dom', operativa: 52, mantenimiento: 48 },
];

export const routeCompliance = [
  { name: 'Ruta B', value: 98, color: '#0f172a' },
  { name: 'Ruta A', value: 95, color: '#123b70' },
  { name: 'Ruta C', value: 72, color: '#d4a15d' },
  { name: 'Ruta E8', value: 65, color: '#b91c1c' },
];

export const alerts = [
  {
    title: 'Falla Motor - Bus 4022',
    text: 'Ruta troncal Sur. Detenido en Estación Central.',
    time: 'Hace 12 min',
    tone: 'danger' as const,
  },
  {
    title: 'Desvío Ruta B',
    text: 'Congestión severa en Av. Principal. Retraso est. 15 min.',
    time: 'Hace 28 min',
    tone: 'warning' as const,
  },
  {
    title: 'Pérdida señal GPS',
    text: 'Unidad 1055 no reporta posición hace 5 minutos.',
    time: 'Hace 45 min',
    tone: 'danger' as const,
  },
];

export const quickActions = [
  { icon: BusFront, label: 'Asignar flota' },
  { icon: Settings, label: 'Orden mant.' },
  { icon: MapPinned, label: 'Mapa en vivo' },
  { icon: BarChart3, label: 'KPIs diario' },
];

export type VehicleRow = {
  plate: string;
  id: string;
  type: string;
  consortium: string;
  km: string;
  state: 'Operativo' | 'En Taller' | 'Alerta';
  date: string;
};

export const vehicleRows: VehicleRow[] = [
  {
    plate: 'A2F-741',
    id: 'ART-1042',
    type: 'Bus Articulado',
    consortium: 'Lima Vías Express',
    km: '145,230 km',
    state: 'Operativo',
    date: '12/10/2023',
  },
  {
    plate: 'B4C-129',
    id: 'ALI-802',
    type: 'Alimentador',
    consortium: 'Transvial Lima',
    km: '89,450 km',
    state: 'En Taller',
    date: '24/10/2023',
  },
  {
    plate: 'C1P-882',
    id: 'ART-2015',
    type: 'Bus Articulado',
    consortium: 'Perú Masivo',
    km: '210,050 km',
    state: 'Alerta',
    date: '05/06/2023',
  },
];

export const stops = [
  { name: 'Estación Tomás Valle (Actual)', time: 'Salida: 14:32', active: true },
  { name: 'Estación Honorio Delgado', time: 'Llegada en 2 min', active: false },
  { name: 'Estación UNI', time: 'Llegada en 4 min', active: false },
];

export const mapMarkers = [
  { left: '50%', top: '18%' },
  { left: '48%', top: '31%' },
  { left: '46%', top: '45%' },
  { left: '43%', top: '60%' },
  { left: '41%', top: '75%' },
];