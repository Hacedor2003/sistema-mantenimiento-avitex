import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Anadir, Area, Ayuda, Calendario, Details, ErrorPage, Home, Login } from './pages'
import PrivateRoute from './components/PrivateRoute'
import { Orden } from './pages/Orden'

const router = createHashRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/home',
    element: (
      <PrivateRoute role="user">
        <Home />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/home/:area',
    element: (
      <PrivateRoute role="user">
        <Area />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/home/:area/:details',
    element: (
      <PrivateRoute role="user">
        <Details />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/home/anadir',
    element: (
      <PrivateRoute role="admin">
        <Anadir />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/home/calendario/:maquinaria',
    element: (
      <PrivateRoute role="user">
        <Calendario />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: '/home/orden',
    element: (
      <PrivateRoute role="user">
        <Orden />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
