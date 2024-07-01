import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'))

  if (user.role === 'admin') {
    return children
  } else if (!user || user.role !== role) {
    return <Navigate to="/" replace />
  }
}

export default PrivateRoute
