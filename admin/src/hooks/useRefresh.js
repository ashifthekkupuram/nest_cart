import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '../zustand/useAuth'
import api from '../api/api'

const useRefresh = () => {

    const [ loading, setLoading ] = useState(false)

    const setAuth = useAuth((state) => state.setAuth)

    const navigate = useNavigate()

    const refresh = async () => {
        setLoading(true)
        try{
            const response = await api.post('/auth/refresh',)
            if(response.data.data.UserData.admin){
                setAuth(response.data.data)
                navigate('/')
            }else{
                
            }
        } catch(error) {
            
        } finally {
            setLoading(false)
        }
    }

    return { loading, refresh }

}

export default useRefresh