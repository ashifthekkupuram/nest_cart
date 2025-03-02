import React, { useEffect, useState } from 'react'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'

import api from '../api/api'
import useAuth from '../zustand/useAuth'

const AuthWrapper = () => {

    const [loading, setLoading] = useState(false)
    const token = useAuth((state) => state.token)
    const setAuth = useAuth((state) => state.setAuth)

    const refresh = async () => {
        setLoading(true)
        try {
            const response = await api.post('/auth/refresh')
            setAuth(response.data.data)
        } catch (err) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refresh()
    },[])

    return (
        token ? <Dashboard /> : <Login />
    )
}

export default AuthWrapper
