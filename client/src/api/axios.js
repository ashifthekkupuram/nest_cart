import axios from 'axios'

const baseURL = import.meta.env.API_URL

const api = axios.create({
    baseURL,
    withCredentials: true
})

export default api