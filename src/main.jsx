import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GlobalProvider } from '@/context/GlobalContext'
import { ToastContainer } from 'react-toastify'

import Aos from '@/library/Aos'

import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalProvider>
      <AuthContextProvider>
        <ToastContainer
          autoClose={2000}
          hideProgressBar
          newestOnTop
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="colored"
        />
        <Aos />
        <App />
      </AuthContextProvider>
    </GlobalProvider>
  </BrowserRouter>,
)
