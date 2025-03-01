import { useState } from 'react'
import toast from 'react-hot-toast'

import api from '../api/axios'
import useAuth from '../zustand/useAuth'

const useLogout = () => {

    const [loading, setLoading] = useState(false)

    const setAuth = useAuth((state) => state.setAuth)

    const logout = async () => {
        setLoading(true)
        try{
            const response = await api.post('/auth/logout')
            setAuth()
            toast.success(response.data.message)
        } catch(error) {
            toast.error(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}

export default useLogout