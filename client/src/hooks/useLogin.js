import { useState } from 'react'

import api from '../api/axios'
import useAuth from '../zustand/useAuth'
import useCart from '../zustand/useCart'

const useLogin = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const setAuth = useAuth((state) => state.setAuth)
    const setCart = useCart((state) => state.setCart)

    const login = async (email, password) => {
        setError(null)
        setLoading(true)
        try{
            const response = await api.post('/auth/login', { email, password })
            setAuth(response.data.data)
            setCart(response.data.data.cart.order_items)
            setError(null)
        } catch(error) {
            setError(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, login }
}

export default useLogin