import { useState } from 'react'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useWriteReview = () => {

    const [loading, setLoading] = useState(false)

    const writeReview = async (productId, title, content, stars) => {
        setLoading(true)
        try {
            const response = await api.post(`/review/${productId}`, { title: title.trim(), content, stars })
            toast.success('Thanks for Submitting your review')
            return response.data.data
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
        return null
    }

    return { loading, writeReview }
}

export default useWriteReview