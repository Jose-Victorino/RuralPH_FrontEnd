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
        className='container-parent'
        style={{ minHeight: '80vh', paddingTop: isHome ? 0 : 'var(--navigation-height, 110px)'}}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default MainLayout