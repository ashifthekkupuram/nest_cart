import { createContext, useState, useEffect } from "react";

import api from '../api/api'

export const AuthContext = createContext(null)
export const PassAccessTokenProvider = {}

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState('')
    const [user, setUser] = useState({})

    PassAccessTokenProvider.token = token
    PassAccessTokenProvider.setToken = setToken
    PassAccessTokenProvider.setUser = setUser

    const refresh = async () => {
        try{
            const response = await api.post('/auth/refresh')
            setToken(response.data.access_token)
            setUser(response.data.UserData)
        } catch(err) {

        }
    }

    useEffect(() => {
        refresh()
    },[])

    return <AuthContext.Provider value={{ token, setToken, user, setUser }} >
        { children }
    </AuthContext.Provider>
}

export default AuthProvider
