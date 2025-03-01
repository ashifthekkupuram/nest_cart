import { useState } from 'react'

import api from '../api/axios'
import useAuth from '../zustand/useAuth'

const useRefresh = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const setAuth = useAuth((state) => state.setAuth)

    const refresh = async () => {
        setError(null)
        setLoading(true)
        try{
            const response = await api.post('/auth/refresh')
            setAuth(response.data.data)
            setError(null)
        } catch(error) {
            setError(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, refresh }
}

export default useRefresh