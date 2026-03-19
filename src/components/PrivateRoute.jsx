import { UserAuth } from '@/context/AuthContext'
import { Navigate } from 'react-router'

function PrivateRoute({children}) {
  const { session } = UserAuth()
  
  return (
    <>{session ? <>{children}</> : <Navigate to='/auth/login' />}</>
  )
}

export default PrivateRoute