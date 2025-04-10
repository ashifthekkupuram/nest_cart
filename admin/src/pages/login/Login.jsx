import { useState } from 'react'
import './login.scss'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const disabled = false

    return (
        <div className='login'>
            <form>
                <div className="title">
                    <img src="admin.svg" alt="" />
                    <span>Nest Cart Admin Page</span>
                </div>
                <div className="field">
                    <label htmlFor="email">Email: </label>
                    <input value={email} type="email" name='email' id='email' onChange={(e) => setEmail(e.target.value)} placeholder='admin@xyz.com' />
                </div>
                <div className="field">
                    <label htmlFor="password">Password: </label>
                    <input value={password} type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} placeholder='*******************' />
                </div>
                <button disabled={disabled}>Login</button>
            </form>
        </div>
    )
}

export default Login
