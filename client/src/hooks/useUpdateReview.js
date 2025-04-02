import { useState } from 'react'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useUpdateReview = () => {

    const [loading, setLoading] = useState(false)

    const updateReview = async (productId, title, content, stars) => {
        setLoading(true)
        try {
            const response = await api.put(`/review/${productId}`, { title: title.trim(), content, stars })
            toast.success('Review has been updated')
            return response.data.data
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
        return null
    }

    return { loading, updateReview }
}

export default useUpdateReview