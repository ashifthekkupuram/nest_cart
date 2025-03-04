import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import api from '../api/axios'
import useAuth from '../zustand/useAuth'

const useDeleteAddress = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const removeAddress = useAuth((state) => state.removeAddress)

    const navigate = useNavigate()

    const deleteAddress = async (addressId) => {
        setError(null)
        setLoading(true)
        try{
            const response = await api.delete(`/address/${addressId}`)
            removeAddress(response.data.data)
            navigate('/profile')
            toast.success(response.data.message)
            setError(null)
        } catch(error) {
            setError(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, deleteAddress }
}

export default useDeleteAddress