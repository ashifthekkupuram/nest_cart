import React, { useEffect, useState } from 'react'

import useCart from '../zustand/useCart'
import useAuth from '../zustand/useAuth'
import useCheckout from '../hooks/useCheckout'

const Checkout = () => {

  const [totalAmount, setTotalAmount] = useState(0)
  const [selectedAddress, setSelectedAddress] = useState('')

  const { loading, error, checkout } = useCheckout()

  const cart = useCart((state) => state.cart)
  const UserData = useAuth((state) => state.UserData)

  const disabled = !selectedAddress

  useEffect(() => {
    let amount = 0
    cart.forEach((item) => { amount = amount + item.amount })
    setTotalAmount(amount)
  }, [cart])

  return (
    <div className='flex flex-col px-1 py-2 gap-2 md:px-10'>
      <table className='border border-gray-300'>
        <thead className='bg-gray-500'>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quanity</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.map((item) =>
            <tr>
              <th>{item.product.name}</th>
              <th>{item.price}</th>
              <th>{item.quantity}</th>
              <th>{item.amount}</th>
            </tr>)}
        </tbody>
        <tfoot className='border border-gray-300'>
          <tr>
            <th colSpan={4} className='self-end'>Total Amount: {totalAmount}</th>
          </tr>
        </tfoot>
      </table>
      {error && <div className='mb-1 rounded-2xl bg-red-600 p-2'>
        {error}
      </div>}
      <fieldset className='flex flex-col gap-2 items-center justify-center bg-gray-300 rounded-2xl w-full py-2 px-4'>
        <h1 className='font-semibold text-2xl' >Addresses</h1>
        {UserData.addresses && UserData.addresses.map((address) =>
          <div className='flex gap-1'>
            <input type="radio" name='addresses' id={address._id} value={address._id} onChange={(e) => setSelectedAddress(e.target.value)} />
            <label key={address._id} className='flex items-center p-2 bg-gray-500 w-full gap-1 rounded-2xl' for={address._id}>
              {address.fullName}, {address.address1}, {address.address2}, {address.state}, {address.district}, {address.postalCode}, {address.contactNumber}
            </label>
          </div>)}
      </fieldset>
      <button disabled={disabled} className='btn' onClick={() => checkout(selectedAddress)}>Checkout</button>
    </div>
  )
}

export default Checkout
