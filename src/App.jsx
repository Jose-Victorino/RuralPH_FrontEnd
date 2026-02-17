import { Routes, Route } from 'react-router-dom'

import '@/styles/reset.scss'

import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home/Home'
import AboutUs from '@/pages/AboutUs/AboutUs'
import Events from '@/pages/Event/Events'
import Faq from '@/pages/Faq/Faq'
import News from '@/pages/News/News'
import OurJourney from '@/pages/OurJourney/OurJourney'
import ContactUs from '@/pages/ContactUs/ContactUs'
import PrivacyPolicy from '@/pages/PrivacyPolicy/PrivacyPolicy'
import TermsAndConditions from '@/pages/TermsAndConditions/TermsAndConditions'

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />}/>
        <Route path='about-us' element={<AboutUs />}/>
        <Route path='our-journey' element={<OurJourney />}/>
        <Route path='faqs' element={<Faq />}/>
        <Route path='in-the-news' element={<News />}/>
        <Route path='events' element={<Events />}/>
        <Route path='contact-us' element={<ContactUs />}/>
        <Route path='privacy-policy' element={<PrivacyPolicy />}/>
        <Route path='terms-and-conditions' element={<TermsAndConditions />}/>
      </Route>
    </Routes>
  )
}

export default App
