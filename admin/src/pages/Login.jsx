import React, { useState, useContext } from 'react'

import api from '../api/api'
import { AuthContext } from '../context/AuthContext'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { setToken, setUser } = useContext(AuthContext)

    const onSubmit = async () => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const response = await api.post('/auth/login', { email: email.trim(), password })
            setToken(response.data.access_token)
            setUser(response.data.UserData)
            setError(null)
        } catch (err) {
            setError(err?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    const disabled = !email || !password || loading

    return (
        <div className='admin-login'>
            <form onSubmit={onSubmit}>
                <span>Nest Cart Admin Panel</span>
                {error &&
                    <div className='error'>
                        {error}
                    </div>}
                <div>
                    <label htmlFor="email">Email:</label>
                    <input value={email} type="email" name='email' id='email' onChange={(e) => setEmail(e.target.value)} placeholder='abc@xyz.com' />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input value={password} type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} placeholder='**********' />
                </div>
                <button type='submit' disabled={disabled} >{loading ? 'Loading...' : 'Login'}</button>
            </form>
        </div>
    )
}

export default Login
