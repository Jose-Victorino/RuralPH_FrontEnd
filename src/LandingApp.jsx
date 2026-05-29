import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { categoryHooks } from './service/crudService'

const MainLayout = lazy(() => import('@/layouts/MainLayout'))
const Home = lazy(() => import('@/pages/Home/Home'))
const AboutUs = lazy(() => import('@/pages/AboutUs/AboutUs'))
const Faq = lazy(() => import('@/pages/Faq/Faq'))
const News = lazy(() => import('@/pages/News/News'))
const JourneyPost = lazy(() => import('@/pages/AboutUs/JourneyPost'))
const Events = lazy(() => import('@/pages/Event/Events'))
const EventPage = lazy(() => import('@/pages/Event/EventPage'))
const Stories = lazy(() => import('@/pages/Stories/Stories'))
const StoryPost = lazy(() => import('@/pages/Stories/StoryPost'))
const StoreLocations = lazy(() => import('@/pages/StoreLocations/StoreLocations'))
const ContactUs = lazy(() => import('@/pages/ContactUs/ContactUs'))
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('@/pages/TermsAndConditions/TermsAndConditions'))

function LandingApp() {
  categoryHooks.prefetchAll({ order: { column: 'name', ascending: true } })

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='*' element={<Navigate to='/' />}/>
        <Route index element={<Home />}/>
        <Route path='about-us' element={<AboutUs />}/>
        <Route path='our-journey/p/:postId' element={<JourneyPost />}/>
        <Route path='faqs' element={<Faq />}/>
        <Route path='in-the-news' element={<News />}/>
        <Route path='events' element={<Events />}/>
        <Route path='events/s' element={<Events />}/>
        <Route path='events/:eventId' element={<EventPage />}/>
        <Route path='location' element={<StoreLocations />}/>
        <Route path='contact-us' element={<ContactUs />}/>
        <Route path='privacy-policy' element={<PrivacyPolicy />}/>
        <Route path='terms-and-conditions' element={<TermsAndConditions />}/>
        <Route path='story' element={<Stories />}/>
        <Route path='story/:publicId' element={<StoryPost />}/>
      </Route>
    </Routes>
  )
}

export default LandingApp