import { useState } from 'react'

import api from '../api/axios'
import useAuth from '../zustand/useAuth'
import useCart from '../zustand/useCart'

const useRefresh = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const setAuth = useAuth((state) => state.setAuth)
    const setCart = useCart((state) => state.setCart)

    const refresh = async () => {
        setError(null)
        setLoading(true)
        try{
            const response = await api.post('/auth/refresh')
            setAuth(response.data.data)
            setCart(response.data.data.cart.order_items)
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