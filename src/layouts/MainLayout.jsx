import { Outlet, useLocation } from 'react-router'

import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'

function MainLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      <Navigation />
      <main
        className='container-parent w-100'
        style={{ minHeight: '80vh', overflowX: 'hidden', paddingTop: isHome ? 0 : 'var(--navigation-height, 110px)'}}
      >
        <Outlet />
      </main>
      {pathname !== '/story' &&
        <Footer />
      }
    </>
  )
}

export default MainLayout