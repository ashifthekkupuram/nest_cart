import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

const AuthRedirect = () => {

    const { token } = useContext(AuthContext)

  return token ? <Navigate to='/' /> : <Outlet />
}

export default AuthRedirect
