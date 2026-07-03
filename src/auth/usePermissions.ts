import { useAuth } from './useAuth'
import { canAcknowledge, canWrite } from './permissions'

// Expone los permisos del usuario actual segun su rol.
export function usePermissions() {
  const { user } = useAuth()
  const role = user?.role
  return {
    role,
    canWrite: canWrite(role),
    canAcknowledge: canAcknowledge(role),
  }
}
