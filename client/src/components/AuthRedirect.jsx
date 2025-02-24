import { Outlet, Navigate } from 'react-router-dom'

import useAuth from '../zustand/useAuth'

const AuthRedirect = () => {

    const token = useAuth((state) => state.token)

  return (
    token ? <Navigate to='/' /> : <Outlet />
  )
}

export default AuthRedirect
