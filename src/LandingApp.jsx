import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home/Home'
import AboutUs from '@/pages/AboutUs/AboutUs'
import Faq from '@/pages/Faq/Faq'
const News = lazy(() => ('@/pages/News/News'))
import OurJourney from '@/pages/OurJourney/OurJourney'
const JourneyPost = lazy(() => import('@/pages/OurJourney/JourneyPost'))
const JourneyCategory = lazy(() => import('@/pages/OurJourney/JourneyCategory'))
const Events = lazy(() => import('@/pages/Event/Events'))
const EventPage = lazy(() => import('@/pages/Event/EventPage'))
import Stories from '@/pages/Stories/Stories'
import StoreLocations from '@/pages/StoreLocations/StoreLocations'
import ContactUs from '@/pages/ContactUs/ContactUs'
import PrivacyPolicy from '@/pages/PrivacyPolicy/PrivacyPolicy'
import TermsAndConditions from '@/pages/TermsAndConditions/TermsAndConditions'

function LandingApp() {
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
    </Routes>
  )
}

export default LandingApp