import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useChangePassword = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const change_password = async (oldPassword, newPassword) => {
        setError(null)
        setLoading(true)
        try{
            const response = await api.post('/user/change-password', { oldPassword, newPassword })
            setError(null)
            navigate('/profile')
            toast.success(response.data.message)
        } catch(error) {
            setError(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, change_password }
}

export default useChangePassword