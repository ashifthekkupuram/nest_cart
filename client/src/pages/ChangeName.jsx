import React, { useState, useEffect } from 'react'

import useChangeName from '../hooks/useChangeName'
import useAuth from '../zustand/useAuth'

const ChangeName = () => {

  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')

  const { loading, error, change_name } = useChangeName()

  const UserData = useAuth((state) => state.UserData)

  const handleSubmit = (e) => {
    e.preventDefault()
    change_name(firstName, secondName)
  }

  const disabled = !firstName || !secondName || loading || (( UserData.name.firstName === firstName ) && ( UserData.name.secondName === secondName ))

  useEffect(() => {
    if(UserData){
        setFirstName(UserData.name.firstName)
        setSecondName(UserData.name.secondName)
    }
  },[])

  return (
    <div className='flex justify-center items-center min-h-full '>
      <form className='flex flex-col border-2 border-[#FFB200] p-6 rounded-2xl' onSubmit={handleSubmit}>
        {error && <div className='mb-1 rounded-2xl bg-red-600 p-2'>
          {error}
        </div>}
        <div className='flex flex-col mb-2'>
          <label htmlFor="firstName">First Name: </label>
          <input value={firstName} type="text" id='firstName' name='firstName' onChange={(e) => setFirstName(e.target.value)} placeholder='John' />
        </div>
        <div className='flex flex-col mb-2'>
          <label htmlFor="secondName">Second Name: </label>
          <input value={secondName} type="text" id='secondName' name='secondName' onChange={(e) => setSecondName(e.target.value)} placeholder='Wic' />
        </div>
        <button type='submit' disabled={disabled} className='btn'>{loading ? 'Loading' : 'Change Name'}</button>
      </form>
    </div>
  )
}

export default ChangeName
