import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './login.scss'

import useLogin from '../../hooks/useLogin'
import useAuth from '../../zustand/useAuth'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { loading, error, login } = useLogin()

    const navigate = useNavigate()
    const token = useAuth((state) => state.token)

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    const disabled = !email || !password | loading

    if(token){
        navigate('/')
    }

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <div className="title">
                    <img src="admin.svg" alt="" />
                    <span>Nest Cart Admin Page</span>
                </div>
                { error && <div className='error' >{error}</div> }
                <div className="field">
                    <label htmlFor="email">Email: </label>
                    <input value={email} type="email" name='email' id='email' onChange={(e) => setEmail(e.target.value)} placeholder='admin@xyz.com' />
                </div>
                <div className="field">
                    <label htmlFor="password">Password: </label>
                    <input value={password} type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} placeholder='*******************' />
                </div>
                <button disabled={disabled}>{loading ? 'Loading...' : 'Login'}</button>
                <Toaster position='top-right' reverseOrder={false} />
            </form>
        </div>
    )
}

export default Login
