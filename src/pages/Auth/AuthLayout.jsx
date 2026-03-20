import { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserAuth } from '@/context/AuthContext'

import s from './AuthLayout.module.scss'

function Login() {
  const { session } = UserAuth()
  if(session) return <Navigate to='/dashboard' />
  
  return (
    <section className={s.authWrapper}>
      <div className={s.bg}></div>
      <div className={s.auth}>
        <Outlet />
      </div>
    </section>
  )
}

export default Login