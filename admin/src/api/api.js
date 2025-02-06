import axios from 'axios'

import { PassAccessTokenProvider } from '../context/AuthContext'

const baseURL = import.meta.env.VITE_API_URL

const instance = axios.create({
    baseURL,
    withCredentials: true
})

instance.interceptors.request.use(
    async (config) => {
        if(PassAccessTokenProvider?.token){
            config.headers.Authorization = `Bearer ${PassAccessTokenProvider.token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance