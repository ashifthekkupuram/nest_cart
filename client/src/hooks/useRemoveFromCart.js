import { useState } from 'react'
import toast from 'react-hot-toast'

import api from '../api/axios'
import useCart from '../zustand/useCart'

const useRemoveFromCart = () => {

    const [loading, setLoading] = useState(false)

    const setCart = useCart((state) => state.setCart)

    const removeFromCart = async (productId) => {
        setLoading(true)
        try{
            const response = await api.delete(`/cart/${productId}`)
            setCart(response.data.data.order_items || [])
        } catch(error) {
           toast.error(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, removeFromCart }
}

export default useRemoveFromCart