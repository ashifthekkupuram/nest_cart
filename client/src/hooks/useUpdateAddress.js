import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import api from '../api/axios'
import useAuth from '../zustand/useAuth'

const useCreateAddress = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const editAddress = useAuth((state) => state.editAddress)

    const navigate = useNavigate()

    const updateAddress = async (addressId,fullName, address1, address2, state, district, postalCode, contactNumber) => {
        setError(null)
        setLoading(true)
        try{
            const response = await api.put(`/address/${addressId}`, { fullName, address1, address2, state, district, postalCode, contactNumber })
            editAddress({ addressId, address: response.data.data})
            navigate('/profile')
            toast.success(response.data.message)
            setError(null)
        } catch(error) {
            setError(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, updateAddress }
}

export default useCreateAddress