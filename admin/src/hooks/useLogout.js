import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import useAuth from '../zustand/useAuth'
import api from '../api/api'

const useLogout = () => {

    const [ loading, setLoading ] = useState(false)

    const setAuth = useAuth((state) => state.setAuth)

    const navigate = useNavigate()

    const logout = async () => {
        setLoading(true)
        try{
            await api.post('/auth/logout')
            setAuth()
            navigate('/login')
            toast.success('Logged Out')
        } catch(error) {
            toast.error(error.response.data.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }

}

export default useLogout