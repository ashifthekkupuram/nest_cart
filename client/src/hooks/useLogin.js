import { useState } from 'react'

import api from '../api/axios'
import useAuth from '../zustand/useAuth'

const useLogin = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const setAuth = useAuth((state) => state.setAuth)

    const login = async (email, password) => {
        setError(null)
        setLoading(true)
        try{
            const response = await api.post('/auth/login', { email, password })
            setAuth(response.data.data)
            setError(null)
        } catch(error) {
            setError(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, login }
}

export default useLogin