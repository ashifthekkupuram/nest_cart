import React from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '../zustand/useAuth'
import Address from '../components/Address'

const Profile = () => {

  const UserData = useAuth((state) => state.UserData)

  const navigate = useNavigate()

  const disabled = UserData.addresses.length >= 3

  return (
    <div className='flex flex-col items-center px-1 py-8 md:px-32'>
      <h1 className='font-bold capitalize text-5xl'>{UserData.name.firstName} {UserData.name.secondName}</h1>
      <span className='text-gray-600'>{ UserData.email.email }</span>
      <span className='text-gray-600'>{ UserData.phone.phone }</span>
      <hr className='w-full my-4' />
      <div className='flex flex-col gap-2 items-center justify-center bg-gray-300 rounded-2xl w-full py-2 px-4'>
        <h1 className='font-semibold text-2xl' >Addresses</h1>
        { UserData.addresses.length > 0 ? UserData.addresses.map((address) => <Address address={address} key={address._id} />) : <p className='text-gray-500'>No Address were added</p> }
        <button disabled={disabled} className='btn' onClick={() => navigate('/create-address')}>{disabled ? 'Maximum number of addresses exceeded' : 'Add Address'}</button>
      </div>
    </div>
  )
}

export default Profile
