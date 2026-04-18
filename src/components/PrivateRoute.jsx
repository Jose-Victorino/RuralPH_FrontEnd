import { UserAuth } from '@/context/AuthContext'
import { Navigate } from 'react-router'

function PrivateRoute({children}) {
  const { session, isLoading } = UserAuth()

  if(isLoading) return null
  return session ? children : <Navigate to='/auth/login' replace />
}

export default PrivateRoute