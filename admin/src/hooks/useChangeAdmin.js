import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import api from '../api/api'

const useChangeAdmin = () => {

    const queryClient = useQueryClient()

    const [ loading, setLoading ] = useState(false)

    const changeAdmin = async (userId) => {
        setLoading(true)
        try{
            await api.post(`/admin/user-admin/${userId}`)
            queryClient.invalidateQueries([`users`])
        } catch(error) {
            
        } finally {
            setLoading(false)
        }
    }

    return { loading, changeAdmin }

}

export default useChangeAdmin