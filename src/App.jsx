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
import PrivacyPolicy from '@/pages/PrivacyPolicy/PrivacyPolicy'
import TermsAndConditions from '@/pages/TermsAndConditions/TermsAndConditions'
import AuthLayout from '@/pages/Auth/AuthLayout'
import Login from '@/pages/Auth/Login'
import ForgotPassword from '@/pages/Auth/ForgotPassword'
import SignUp from '@/pages/Auth/SignUp'
import Dashboard from '@/pages/Admin/Dashboard'
import AdminLayout from '@/pages/Admin/AdminLayout' 
import AdminEvent from '@/pages/Admin/AdminEvent' 
import AdminStory from '@/pages/Admin/AdminStory' 
import AdminNews from '@/pages/Admin/AdminNews' 

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
        <Route path='login' element={<Login />}/>
        <Route path='forgot-password' element={<ForgotPassword />}/>
        <Route path='sign-up' element={<SignUp />}/>
      </Route>
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<Dashboard />}/>
        <Route path='event' element={<AdminEvent />}/>
        <Route path='story' element={<AdminStory />}/>
        <Route path='news' element={<AdminNews />}/>
      </Route>
    </Routes>
  )
}

export default App
