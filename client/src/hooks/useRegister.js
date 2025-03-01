import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useRegister = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const register = async (email, phone, firstName, secondName, password) => {
        setError(null)
        setLoading(true)
        try{
            const response = await api.post('/auth/register', { email, phone, firstName, secondName, password })
            setError(null)
            navigate('/login')
            toast.success(response.data.message)
        } catch(error) {
            setError(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, register }
}

export default useRegister