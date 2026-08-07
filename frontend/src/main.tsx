import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// React-Router
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.tsx'

// React-Query
import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'

// React-Hot-Toast
import { Toaster } from 'react-hot-toast'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster position='top-center' toastOptions={{duration: 2000, style:{borderRadius:'12px'}}}/>
  </QueryClientProvider>
  </StrictMode>
)
