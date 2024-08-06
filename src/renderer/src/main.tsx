import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Anadir, Area, Calendario, Details, ErrorPage, Guia, Home, Login } from './pages'
import { Orden } from './pages/Orden'
import { PrivateRouteAdmin, PrivateRouteUser } from './components/PrivateRoute'

const router = createHashRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/home',
    element: (
      <PrivateRouteUser role="user">
        <Home />
      </PrivateRouteUser>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/home/:area',
    element: (
      <PrivateRouteUser role="user">
        <Area />
      </PrivateRouteUser>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/home/:area/:details',
    element: (
      <PrivateRouteUser role="user">
        <Details />
      </PrivateRouteUser>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/home/anadir',
    element: (
      <PrivateRouteAdmin role="admin">
        <Anadir />
      </PrivateRouteAdmin>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/home/calendario/:maquinaria',
    element: (
      <PrivateRouteUser role="user">
        <Calendario />
      </PrivateRouteUser>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/home/orden',
    element: (
      <PrivateRouteUser role="user">
        <Orden />
      </PrivateRouteUser>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/home/guia',
    element: (
      <PrivateRouteUser role="user">
        <Guia />
      </PrivateRouteUser>
    ),
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

/* Author Big Tec SRL */
