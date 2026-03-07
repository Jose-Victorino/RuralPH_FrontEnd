import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from '@/context/GlobalContext'

import Aos from '@/library/Aos'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalProvider>
      <Aos />
      <App />
    </GlobalProvider>
  </BrowserRouter>,
)
