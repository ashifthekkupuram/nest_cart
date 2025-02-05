import axios from 'axios'
import { useContext } from 'react'

// import { AuthContext } from '../context/AuthContext'

const baseURL = import.meta.env.VITE_API_URL

// const { token } = useContext(AuthContext)

const instance = axios.create({
    baseURL,
    withCredentials: true
})

instance.interceptors.request.use(
    async (config) => {
        // if(token){
        //     config.headers.Authorization = `Bearer ${token}`
        // }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance