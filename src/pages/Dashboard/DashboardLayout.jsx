import { useState, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserAuth, PrivateRoute } from '@/context/AuthContext'

import useClickOutside from '@/hooks/useClickOutside'

import s from './DashboardLayout.module.scss' 

function DashboardLayout() {
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(false)
  const { signOut } = UserAuth()
  const menuRef = useRef()

  useClickOutside(menuRef, () => setOpenMenu(false), openMenu)

  const handleSignOut = async () => {
    setOpenMenu(false)
    const error = await signOut()

    if(!error) navigate('/')
  }
  
  return (
    <>
      <nav className={s.nav}>
        <div className={s.container}>
          <div className='pos-r'>
            <button className={s.userButton} onClick={() => setOpenMenu(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M399 384.2C376.9 345.8 335.4 320 288 320l-64 0c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
              </svg>
            </button>
            {openMenu &&
              <div ref={menuRef} className={s.options}> 
                <ul className='flex-col'>
                  <li>
                    <button onClick={() => handleSignOut()}>Logout</button>
                  </li>
                </ul>
              </div>
            }
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default DashboardLayout