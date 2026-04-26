import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router'

import DashboardLayout from '@/pages/Dashboard/DashboardLayout'
import Dashboard from '@/pages/Dashboard/Dashboard'
const Event = lazy(() => import('@/pages/Dashboard/Event'))
const News = lazy(() => import('@/pages/Dashboard/News'))
const Journey = lazy(() => import('@/pages/Dashboard/Journey'))
const Story = lazy(() => import('@/pages/Dashboard/Story'))
const NavigationLinks = lazy(() => import('@/pages/Dashboard/NavigationLinks'))

function DashboardApp() {
  return (
    <Routes>
      <Route path='/' element={<DashboardLayout />}>
        <Route path='*' element={<Navigate to='/dashboard' />} />
        <Route index element={<Dashboard />}/>
        <Route path='event' element={<Event />}/>
        <Route path='news' element={<News />}/>
        <Route path='journey' element={<Journey />}/>
        <Route path='story' element={<Story />}/>
        <Route path='navigation-links' element={<NavigationLinks />}/>
      </Route>
    </Routes>
  )
}

export default DashboardApp