import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import api from '../api/axios'
import useCart from '../zustand/useCart'

const useCheckout = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const setCart = useCart((state) => state.setCart)

    const navigate = useNavigate()

    const checkout = async (selectedAddress) => {
        setError(null)
        setLoading(true)
        try{
            const response = await api.post(`/order/${selectedAddress}`)
            setCart()
            setError(null)
            navigate('/')
            toast.success(response.data.message)
        } catch(error) {
           setError(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, checkout }
}

export default useCheckout