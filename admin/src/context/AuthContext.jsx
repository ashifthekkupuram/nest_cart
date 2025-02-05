import { createContext, useState, useEffect } from "react";

import api from '../api/api'

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null)
    const [user, setUser] = useState({})

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
