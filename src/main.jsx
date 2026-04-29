import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GlobalProvider } from '@/context/GlobalContext'
import { ToastContainer } from 'react-toastify'
import { ParallaxProvider } from 'react-scroll-parallax'

import Aos from '@/library/Aos'

import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60,
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        <ParallaxProvider>
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
            {/* <ReactQueryDevtools /> */}
          </AuthContextProvider>
        </ParallaxProvider>
      </QueryClientProvider>
    </GlobalProvider>
  </BrowserRouter>,
)
