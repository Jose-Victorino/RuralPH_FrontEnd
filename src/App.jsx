import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import '@/styles/reset.scss'

import MainLayout from '@/layouts/MainLayout'

import Home from '@/pages/Home/Home'
import AboutUs from '@/pages/AboutUs/AboutUs'
import Faq from '@/pages/Faq/Faq'
import News from '@/pages/News/News'
import OurJourney from '@/pages/OurJourney/OurJourney'
import JourneyPost from '@/pages/OurJourney/JourneyPost'
import JourneyCategory from '@/pages/OurJourney/JourneyCategory'
import Events from '@/pages/Event/Events'
import EventPage from '@/pages/Event/EventPage'
import Stories from '@/pages/Stories/Stories'
import StoreLocations from '@/pages/StoreLocations/StoreLocations'
import ContactUs from '@/pages/ContactUs/ContactUs'
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('@/pages/TermsAndConditions/TermsAndConditions'))
const AuthLayout = lazy(() => import('@/pages/Auth/AuthLayout'))
const Login = lazy(() => import('@/pages/Auth/Login'))
const ForgotPassword = lazy(() => import('@/pages/Auth/ForgotPassword'))
const Recover = lazy(() => import('@/pages/Auth/Recover'))
const SignUp = lazy(() => import('@/pages/Auth/SignUp'))
const DashboardLayout = lazy(() => import('@/pages/Dashboard/DashboardLayout'))
const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'))
const DashboardEvent = lazy(() => import('@/pages/Dashboard/Event'))
const DashboardNews = lazy(() => import('@/pages/Dashboard/News'))
const DashboardJourney = lazy(() => import('@/pages/Dashboard/Journey'))
const DashboardStory = lazy(() => import('@/pages/Dashboard/Story'))

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />}/>
        <Route path='about-us' element={<AboutUs />}/>
        <Route path='our-journey' element={<OurJourney />}/>
        <Route path='our-journey/p/:postId' element={<JourneyPost />}/>
        <Route path='our-journey/c/:categoryName' element={<JourneyCategory />}/>
        <Route path='faqs' element={<Faq />}/>
        <Route path='in-the-news' element={<News />}/>
        <Route path='events' element={<Events />}/>
        <Route path='events/:eventId' element={<EventPage />}/>
        <Route path='stories' element={<Stories />}/>
        <Route path='location' element={<StoreLocations />}/>
        <Route path='contact-us' element={<ContactUs />}/>
        <Route path='privacy-policy' element={<PrivacyPolicy />}/>
        <Route path='terms-and-conditions' element={<TermsAndConditions />}/>
      </Route>
      <Route path='/auth' element={<AuthLayout />}>
        <Route index element={<Navigate to='/auth/login' />} />
        <Route path='*' element={<Navigate to='/auth/login' />} />
        <Route path='login' element={<Login />}/>
        <Route path='forgot-password' element={<ForgotPassword />}/>
        <Route path='recover' element={<Recover />}/>
        <Route path='sign-up' element={<SignUp />}/>
      </Route>
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route path='*' element={<Navigate to='/dashboard' />} />
        <Route index element={<Dashboard />}/>
        <Route path='event' element={<DashboardEvent />}/>
        <Route path='news' element={<DashboardNews />}/>
        <Route path='journey' element={<DashboardJourney />}/>
        <Route path='story' element={<DashboardStory />}/>
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default App
