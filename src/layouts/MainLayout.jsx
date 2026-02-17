import { Outlet } from 'react-router-dom'

import ScrollToTop from '@/hooks/ScrollToTop'
import Navigation from '@/components/Navigation/Navigation'
import Footer from '@/components/Footer/Footer'

function MainLayout() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout