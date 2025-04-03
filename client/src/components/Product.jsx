import React from 'react'
import { useNavigate } from 'react-router-dom'

import useAddToCart from '../hooks/useAddToCart'
import useAuth from '../zustand/useAuth'

const Product = ({ product }) => {

    const { loading, addToCart } = useAddToCart()

    const navigate = useNavigate()
    const token = useAuth((state) => state.token)

    const handleCart = () => {
        token ? addToCart(product._id) : navigate('/login')
    } 

    const disabled = loading

    return (
        <div className='flex flex-col justify-center items-center gap-1 px-2 py-6 bg-amber-50 hover:bg-amber-100 rounded-4xl border border-amber-200 hover:border-amber-300'>
            <img onClick={() => navigate(`/product/${product._id}`)} className='w-26' src={product.images[0]} />
            <h1 onClick={() => navigate(`/product/${product._id}`)} className='text-xl font-semibold'>{product.name}</h1>
            <h6 onClick={() => navigate(`/product/${product._id}`)} className='text-lg font-bold'>₹{product.price}</h6>
            <button disabled={disabled} className='btn' onClick={handleCart}>Add to Cart</button>
        </div>
    )
}

export default Product
