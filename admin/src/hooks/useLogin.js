import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '../zustand/useAuth'
import api from '../api/api'

const useLogin = () => {

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const setAuth = useAuth((state) => state.setAuth)

    const navigate = useNavigate()

    const login = async (email, password) => {
        setLoading(true)
        setError(null)
        try{
            const response = await api.post('/auth/login', { email, password })
            if(response.data.data.UserData.admin){
                setAuth(response.data.data)
                navigate('/')
            }else{
                setError('User is not an admin')
            }
        } catch(error) {
            setError(error.response.data.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, login }

}

export default useLogin