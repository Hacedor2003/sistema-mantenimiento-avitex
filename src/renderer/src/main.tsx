import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Anadir, Area, Ayuda, Calendario, Details, ErrorPage, Home, Login } from './pages'

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
  },
  {
    path: '/home/anadir',
    element: <Anadir />,
    errorElement: <ErrorPage />
  },
  {
    path: '/home/ayuda',
    element: <Ayuda />,
    errorElement: <ErrorPage />
  },
  {
    path: '/home/calendario/:maquinaria',
    element: <Calendario />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
