import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import api from '../api/axios'
import useAuth from '../zustand/useAuth'

const useChangeName = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateUserData = useAuth((state) => state.updateUserData)

    const navigate = useNavigate()

    const change_name = async (firstName, secondName) => {
        setError(null)
        setLoading(true)
        try{
            const response = await api.post('/user/change-name', { firstName: firstName.trim(), secondName: secondName.trim() })
            updateUserData(response.data.data)
            setError(null)
            navigate('/profile')
            toast.success(response.data.message)
        } catch(error) {
            setError(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, change_name }
}

export default useChangeName