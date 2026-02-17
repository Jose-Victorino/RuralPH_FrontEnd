import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from '@/context/GlobalContext'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </BrowserRouter>,
)
