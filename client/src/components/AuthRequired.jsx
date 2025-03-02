import { Outlet, Navigate } from 'react-router-dom'

import useAuth from '../zustand/useAuth'

const AuthRequired = () => {

    const token = useAuth((state) => state.token)

  return (
    token ? <Outlet /> : <Navigate to='/login' />
  )
}

export default AuthRequired
