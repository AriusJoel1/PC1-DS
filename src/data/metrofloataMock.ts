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

export type SectionId = 'inicio' | 'flota' | 'rutas' | 'monitoreo';

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
  {
    plate: 'D3K-504',
    id: 'ART-1187',
    type: 'Bus Articulado',
    consortium: 'Lima Vías Express',
    km: '98,120 km',
    state: 'Operativo',
    date: '02/02/2024',
  },
  {
    plate: 'E7H-219',
    id: 'ALI-913',
    type: 'Alimentador',
    consortium: 'Perú Masivo',
    km: '76,880 km',
    state: 'Operativo',
    date: '19/01/2024',
  },
  {
    plate: 'F9M-640',
    id: 'ART-2231',
    type: 'Bus Articulado',
    consortium: 'Transvial Lima',
    km: '182,400 km',
    state: 'En Taller',
    date: '11/11/2023',
  },
  {
    plate: 'G2B-071',
    id: 'ALI-445',
    type: 'Alimentador',
    consortium: 'Lima Vías Express',
    km: '54,300 km',
    state: 'Operativo',
    date: '27/02/2024',
  },
  {
    plate: 'H8L-389',
    id: 'ART-1808',
    type: 'Bus Articulado',
    consortium: 'Perú Masivo',
    km: '165,700 km',
    state: 'Operativo',
    date: '08/03/2024',
  },
  {
    plate: 'I5Q-227',
    id: 'ALI-612',
    type: 'Alimentador',
    consortium: 'Transvial Lima',
    km: '112,950 km',
    state: 'Alerta',
    date: '14/07/2023',
  },
  {
    plate: 'J1N-914',
    id: 'ART-1990',
    type: 'Bus Articulado',
    consortium: 'Lima Vías Express',
    km: '203,480 km',
    state: 'En Taller',
    date: '22/09/2023',
  },
  {
    plate: 'K6R-558',
    id: 'ALI-774',
    type: 'Alimentador',
    consortium: 'Perú Masivo',
    km: '68,200 km',
    state: 'Operativo',
    date: '05/03/2024',
  },
  {
    plate: 'L4S-083',
    id: 'ART-2077',
    type: 'Bus Articulado',
    consortium: 'Transvial Lima',
    km: '134,650 km',
    state: 'Operativo',
    date: '17/12/2023',
  },
  {
    plate: 'M2T-462',
    id: 'ALI-358',
    type: 'Alimentador',
    consortium: 'Lima Vías Express',
    km: '45,800 km',
    state: 'Operativo',
    date: '30/03/2024',
  },
  {
    plate: 'N7V-701',
    id: 'ART-1543',
    type: 'Bus Articulado',
    consortium: 'Perú Masivo',
    km: '221,900 km',
    state: 'Alerta',
    date: '10/05/2023',
  },
  {
    plate: 'O9W-135',
    id: 'ALI-290',
    type: 'Alimentador',
    consortium: 'Transvial Lima',
    km: '81,400 km',
    state: 'Operativo',
    date: '25/01/2024',
  },
];

export type RouteRow = {
  code: string;
  name: string;
  type: 'Troncal' | 'Expreso' | 'Alimentador';
  stops: number;
  length: string;
  frequency: string;
  buses: number;
  state: 'Activa' | 'En Revisión' | 'Suspendida';
};

export const routeRows: RouteRow[] = [
  {
    code: 'TR-A',
    name: 'Ruta A — Naranjal ↔ Matellini',
    type: 'Troncal',
    stops: 38,
    length: '33.2 km',
    frequency: '3 min',
    buses: 62,
    state: 'Activa',
  },
  {
    code: 'TR-B',
    name: 'Ruta B — Naranjal ↔ Ramón Castilla',
    type: 'Troncal',
    stops: 26,
    length: '21.5 km',
    frequency: '4 min',
    buses: 44,
    state: 'Activa',
  },
  {
    code: 'TR-C',
    name: 'Ruta C — Izaguirre ↔ Estadio Nacional',
    type: 'Troncal',
    stops: 22,
    length: '18.9 km',
    frequency: '5 min',
    buses: 36,
    state: 'En Revisión',
  },
  {
    code: 'EX-1',
    name: 'Expreso 1 — Naranjal ↔ Central',
    type: 'Expreso',
    stops: 9,
    length: '16.0 km',
    frequency: '6 min',
    buses: 18,
    state: 'Activa',
  },
  {
    code: 'EX-4',
    name: 'Expreso 4 — Matellini ↔ Javier Prado',
    type: 'Expreso',
    stops: 7,
    length: '14.2 km',
    frequency: '7 min',
    buses: 14,
    state: 'Activa',
  },
  {
    code: 'AL-12',
    name: 'Alimentador 12 — Naranjal ↔ Puente Piedra',
    type: 'Alimentador',
    stops: 24,
    length: '11.8 km',
    frequency: '8 min',
    buses: 20,
    state: 'Activa',
  },
  {
    code: 'AL-18',
    name: 'Alimentador 18 — Matellini ↔ San Juan de Miraflores',
    type: 'Alimentador',
    stops: 19,
    length: '9.4 km',
    frequency: '9 min',
    buses: 16,
    state: 'Suspendida',
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