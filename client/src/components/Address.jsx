import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md"

import useDeleteAddress from '../hooks/useDeleteAddress'

const Address = ({ address }) => {

  const { loading, error, deleteAddress } = useDeleteAddress()
  const navigate = useNavigate()

  return (
    <div className='flex justify-between items-center p-2 bg-gray-500 w-full rounded-2xl' >
      <span>{address.fullName}, {address.address1}, {address.address2}, {address.state}, {address.district}, {address.postalCode}, {address.contactNumber}</span>
      <div className='flex items-center'>
        <MdEdit className='text-red-500 text-3xl hover:text-red-600' onClick={() => navigate(`/update-address/${address._id}`)} />
        <MdDelete className='text-red-500 text-3xl hover:text-red-600' onClick={() => deleteAddress(address._id)} />
      </div>
    </div>
  )
}

export default Address
