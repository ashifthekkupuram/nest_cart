import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

const AuthRequired = () => {

    const { token } = useContext(AuthContext)

  return token ? <Outlet />  : <Navigate to='/login' />
}

export default AuthRequired
