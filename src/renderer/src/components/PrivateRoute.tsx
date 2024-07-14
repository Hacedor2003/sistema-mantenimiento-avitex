/* eslint-disable prettier/prettier */
import { Navigate } from 'react-router-dom'
import React from 'react'

export const PrivateRouteAdmin = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user.Rol === 'admin') {
    return children
  } else if (!user || user.Rol !== role) {
    return <Navigate to="/" replace />
  }
}

export const PrivateRouteUser = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user.Rol === 'user' || user.Rol === 'admin') {
    return children
  } else if (!user || user.Rol !== role) {
    return <Navigate to="/" replace />
  }
}
