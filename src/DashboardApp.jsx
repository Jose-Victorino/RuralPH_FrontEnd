import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router'

const DashboardLayout = lazy(() => import('@/pages/Dashboard/DashboardLayout'))
const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'))
const DashboardEvent = lazy(() => import('@/pages/Dashboard/Event/Event'))
const DashboardNews = lazy(() => import('@/pages/Dashboard/News/News'))
const DashboardJourney = lazy(() => import('@/pages/Dashboard/Journey/Journey'))
const DashboardStory = lazy(() => import('@/pages/Dashboard/Story/Story'))
const DashboardUsers = lazy(() => import('@/pages/Dashboard/Users/Users'))

function DashboardApp() {
  return (
    <Routes>
      <Route path='/' element={<DashboardLayout />}>
        <Route path='*' element={<Navigate to='/dashboard' />} />
        <Route index element={<Dashboard />}/>
        <Route path='event' element={<DashboardEvent />}/>
        <Route path='news' element={<DashboardNews />}/>
        <Route path='journey' element={<DashboardJourney />}/>
        <Route path='story' element={<DashboardStory />}/>
        <Route path='users' element={<DashboardUsers />}/>
      </Route>
    </Routes>
  )
}

export default DashboardApp