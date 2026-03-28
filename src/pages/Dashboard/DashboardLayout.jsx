import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserAuth } from '@/context/AuthContext'

import s from './DashboardLayout.module.scss' 
import { PrivateRoute } from '@/context/AuthContext'

function DashboardLayout() {
  const navigate = useNavigate()
  const { signOut } = UserAuth()

  const handleSignOut = async () => {
    const error = await signOut()

    if(!error) navigate('/')
  }
  
  return (
    <PrivateRoute>
      <nav className={s.nav}>
        <div className={s.container}>
          <button className={s.userButton} popoverTarget='user-options' id="user">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
            </svg>
          </button>
          <div id='user-options' className={s.options} popover='auto' anchor="user">
            <ul className='flex-col'>
              <li>
                <button onClick={() => handleSignOut()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </PrivateRoute>
  )
}

export default DashboardLayout