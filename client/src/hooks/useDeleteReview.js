import { useState } from 'react'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useDeleteReview = () => {

    const [loading, setLoading] = useState(false)

    const deleteReview = async (productId) => {
        setLoading(true)
        try {
            await api.delete(`/review/${productId}`)
            toast.success('Review has been deleted')
            return 1
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
        return null
    }

    return { loading, deleteReview }
}

export default useDeleteReview