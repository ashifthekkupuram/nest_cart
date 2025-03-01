import React, { useState } from 'react'

import useLogin from '../hooks/useLogin'
import GroceryBG from '../assets/images/grocery-bg.jpg'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { loading, error, login } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  const disabled = !email || !password || loading

  return (
    <div style={{ backgroundImage: `url(${GroceryBG})`, objectFit: 'contain' }} className='flex justify-center items-center min-h-full text-white'>
      <form className='flex flex-col border-2 border-[#FFB200] p-6 rounded-2xl' onSubmit={handleSubmit}>
        {error && <div className='mb-1 rounded-2xl bg-red-600 p-2'>
          {error}
        </div>}
        <div className='flex flex-col mb-2'>
          <label htmlFor="email">Email: </label>
          <input value={email} type="email" id='email' name='email' onChange={(e) => setEmail(e.target.value)} placeholder='abc@xyz.com' />
        </div>
        <div className='flex flex-col mb-2'>
          <label htmlFor="password">Password: </label>
          <input value={password} type="password" id='password' name='password' onChange={(e) => setPassword(e.target.value)} placeholder='************' />
        </div>
        <button type='submit' disabled={disabled} className='btn'>{loading ? 'Loading' : 'Login'}</button>
      </form>
    </div>
  )
}

export default Login
