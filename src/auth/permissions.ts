import type { User } from '../services/auth'

type Role = User['role']

// Matriz de roles, igual a la del backend (rbac.ts).
// admin y operador pueden crear, editar y eliminar.
// supervisor es de solo lectura, pero puede reconocer alertas.
const WRITE_ROLES: Role[] = ['admin', 'operador']
const ACK_ROLES: Role[] = ['admin', 'operador', 'supervisor']

// Puede crear, editar o eliminar registros.
export function canWrite(role: Role | undefined): boolean {
  return role !== undefined && WRITE_ROLES.includes(role)
}

// Puede reconocer (marcar como atendida) una alerta.
export function canAcknowledge(role: Role | undefined): boolean {
  return role !== undefined && ACK_ROLES.includes(role)
}
