import { Outlet } from 'react-router-dom'

import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'

function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout