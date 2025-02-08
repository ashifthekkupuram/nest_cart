import axios from 'axios'

import useAuth from '../zustand/useAuth'

const baseURL = import.meta.env.VITE_API_URL

const instance = axios.create({
    baseURL,
    withCredentials: true
})

instance.interceptors.request.use(
    async (config) => {
        const token = useAuth.getState().token
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance