import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Area, Details, ErrorPage, Home, Login } from './pages'
import { RootLayout } from './components/Root/AppLayout'

const router = createHashRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: '/home/:area',
    element: <Area />,
    errorElement: <ErrorPage />
  },
  {
    path: '/home/:area/:details',
    element: <Details />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RootLayout>
      <RouterProvider router={router} />
    </RootLayout>
  </React.StrictMode>
)
