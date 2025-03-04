import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import useUpdateAddress from '../hooks/useUpdateAddress'
import api from '../api/axios'
import { indianStatesAndDistricts } from '../data/data'

const UpdateAddress = () => {

    const [fullName, setFullName] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [state, setState] = useState('')
    const [district, setDistrict] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [contactNumber, setContactNumber] = useState('')

    const { loading, error, updateAddress } = useUpdateAddress()

    const { addressId } = useParams()

    const { data } = useQuery({ queryKey: ['address', addressId],queryFn: async () => {
        const response = await api.get(`/address/${addressId}`)
        return response.data.data
    } })

    const handleSubmit = (e) => {
        e.preventDefault()
        updateAddress(addressId, fullName, address1, address2, state, district, postalCode, contactNumber)
      }

    const disabled = !fullName || !address1 || !state || !district || !postalCode || !contactNumber || loading

    useEffect(() => {
        if(data){
            setFullName(data.fullName)
            setAddress1(data.address1)
            setAddress2(data.address2)
            setState(data.state)
            setDistrict(data.district)
            setPostalCode(data.postalCode)
            setContactNumber(data.contactNumber)
        }
    }, [data])

    return (
        <div className='flex flex-col items-center px-1 py-8 md:px-32'>
            <form className='flex flex-col border-2 border-[#FFB200] p-6 rounded-2xl w-full' onSubmit={handleSubmit}>
                <div className='mb-2 self-center'>
                    <h1 className='font-bold text-xl'>Update Address</h1>
                </div>
                {error && <div className='mb-1 rounded-2xl bg-red-600 p-2'>
                    {error}
                </div>}
                <div className='flex flex-col mb-2'>
                    <label htmlFor="fullName">Full Name: </label>
                    <input value={fullName} type="text" id='fullName' name='fullName' onChange={(e) => setFullName(e.target.value)} placeholder='John Wick' />
                </div>
                <div className='flex flex-col mb-2'>
                    <label htmlFor="address1">Address Line 1: </label>
                    <input value={address1} type="text" id='address1' name='address1' onChange={(e) => setAddress1(e.target.value)} placeholder='' />
                </div>
                <div className='flex flex-col mb-2'>
                    <label htmlFor="address2">Address Line 2: </label>
                    <input value={address2} type="text" id='address2' name='address2' onChange={(e) => setAddress2(e.target.value)} placeholder='' />
                </div>
                <div className='flex flex-col mb-2'>
                    <label htmlFor="state">State: </label>
                    <select onChange={(e) => setState(e.target.value)} className='px-2 py-1 outline-0 border-2 border-[#FFB200] rounded-xl focus:border-[#EB5B00]'>
                        {Object.keys(indianStatesAndDistricts).map((key) => <option key={key} value={key} onChange={(e) => setState(e.target.value)} selected={state === key} >{key}</option>)}
                    </select>
                </div>
                {state && <div className='flex flex-col mb-2'>
                    <label htmlFor="district">District: </label>
                    <select onChange={(e) => setDistrict(e.target.value)} className='px-2 py-1 outline-0 border-2 border-[#FFB200] rounded-xl focus:border-[#EB5B00]'>
                        {indianStatesAndDistricts[state]?.map((item) => <option key={item} value={item} selected={item === district}>{item}</option>)}
                    </select>
                </div>}
                <div className='flex flex-col mb-2'>
                    <label htmlFor="postalCode">Postal Code: </label>
                    <input value={postalCode} type="number" id='postalCode' name='postalCode' onChange={(e) => setPostalCode(e.target.value)} placeholder='123456' />
                </div>
                <div className='flex flex-col mb-2'>
                    <label htmlFor="contactNumber">Contact Number: </label>
                    <input value={contactNumber} type="number" id='contactNumber' name='contactNumber' onChange={(e) => setContactNumber(e.target.value)} placeholder='1234567890' />
                </div>
                <button disabled={disabled} className='btn'>Update Address</button>
            </form>
        </div>
    )
}

export default UpdateAddress
