import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import api from '../api/axios'
import useAuth from '../zustand/useAuth'

const useCreateAddress = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const addAddress = useAuth((state) => state.addAddress)

    const navigate = useNavigate()

    const createAddress = async (fullName, address1, address2, state, district, postalCode, contactNumber) => {
        setError(null)
        setLoading(true)
        try{
            const response = await api.post('/address', { fullName, address1, address2, state, district, postalCode, contactNumber })
            addAddress(response.data.data)
            navigate('/profile')
            toast.success(response.data.message)
            setError(null)
        } catch(error) {
            setError(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, createAddress }
}

export default useCreateAddress