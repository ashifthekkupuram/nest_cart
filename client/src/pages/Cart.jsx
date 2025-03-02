import React, { useEffect, useState } from 'react'

import useCart from '../zustand/useCart'
import useAddToCart from '../hooks/useAddToCart'
import useRemoveFromCart from '../hooks/useRemoveFromCart'

const Cart = () => {

  const [totalAmount, setTotalAmount] = useState(0)
  const { loading: addtoCartLoading, addToCart } = useAddToCart()
  const { loading: removeFromCartLoading, removeFromCart } = useRemoveFromCart()

  const cart = useCart((state) => state.cart)

  useEffect(() => {
    let amount = 0
    cart.forEach((item) => { amount = amount + item.amount })
    setTotalAmount(amount)
  },[cart])

  const disabled = addtoCartLoading || removeFromCartLoading

  return (
    <div className='flex flex-col px-1 py-2 md:px-10'>
      <table className='w-full text-left table-auto min-w-max border border-[#EB5B00]'>
        <thead className='bg-[#FFB200]'>
          <tr>
            <th className='p-4 border-b border-[#EB5B00]'> <p>Name</p> </th>
            <th className='p-4 border-b border-[#EB5B00]'> <p>Image</p> </th>
            <th className='p-4 border-b border-[#EB5B00]'> <p>Price</p> </th>
            <th className='p-4 border-b border-[#EB5B00]'> <p>Quantity</p> </th>
            <th className='p-4 border-b border-[#EB5B00]'> <p>Amount</p> </th>
          </tr>
        </thead>
        <tbody>
          { cart.length > 0 ? cart.map((item) => <tr>
            <td className='p-4 border-b border-[#EB5B00]'> <p>{ item.product.name }</p> </td>
            <td className='p-4 border-b border-[#EB5B00]'> <img className='w-8 md:w-12' src={`${item.product.images[0]}`} /> </td>
            <td className='p-4 border-b border-[#EB5B00]'> <p>₹{ item.price }</p> </td>
            <td className='p-4 border-b border-[#EB5B00]'> <p className='flex items-center gap-1 md:gap-2'> <button disabled={disabled} className='btn p-1' onClick={() => removeFromCart(item.product._id)}>-</button> { item.quantity } <button disabled={disabled} className='btn p-1' onClick={() => addToCart(item.product._id)}>+</button> </p> </td>
            <td className='p-4 border-b border-[#EB5B00]'> <p>₹{ item.amount }</p> </td>
          </tr>) : <tr>
            <td colSpan={5} className='p-4 border-b border-[#EB5B00]'> No Items Added </td>
          </tr> }
        </tbody>
        <tfoot className='w-full bg-[#FFB200]'>
          <tr>
            <th colSpan={5} className='text-right px-8 py-2'>
              Total Amount: ₹{ totalAmount }
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Cart
