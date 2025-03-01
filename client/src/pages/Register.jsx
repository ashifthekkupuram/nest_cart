import React, { useState } from 'react'

import useRegister from '../hooks/useRegister'
import GroceryBG from '../assets/images/grocery-bg.jpg'

const Register = () => {

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [phone, setPhone] = useState(0)
  const [password, setPassword] = useState('')

  const { loading, error, register } = useRegister()

  const handleSubmit = (e) => {
    e.preventDefault()
    register(email, phone, firstName, secondName, password)
  }

  const disabled = !email || !firstName || !secondName || !phone || !password || loading

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
          <label htmlFor="firstName">First Name: </label>
          <input value={firstName} type="text" id='firstName' name='firstName' onChange={(e) => setFirstName(e.target.value)} placeholder='John' />
        </div>
        <div className='flex flex-col mb-2'>
          <label htmlFor="secondName">Second Name: </label>
          <input value={secondName} type="text" id='secondName' name='secondName' onChange={(e) => setSecondName(e.target.value)} placeholder='Wick' />
        </div>
        <div className='flex flex-col mb-2'>
          <label htmlFor="phone">Phone: </label>
          <input value={phone} type="number" id='phone' name='phone' onChange={(e) => setPhone(e.target.value)} placeholder='9995451008' />
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

export default Register
