import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router'

import DashboardLayout from '@/pages/Dashboard/DashboardLayout'
import Dashboard from '@/pages/Dashboard/Dashboard'
const DashboardEvent = lazy(() => import('@/pages/Dashboard/Event'))
const DashboardNews = lazy(() => import('@/pages/Dashboard/News'))
const DashboardJourney = lazy(() => import('@/pages/Dashboard/Journey'))
const DashboardStory = lazy(() => import('@/pages/Dashboard/Story'))

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
      </Route>
    </Routes>
  )
}

export default DashboardApp