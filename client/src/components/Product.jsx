import React from 'react'

const Product = ({ product }) => {
    return (
        <div className='flex flex-col justify-center items-center gap-1 px-2 py-6 bg-amber-50 hover:bg-amber-100 rounded-4xl border border-amber-200 hover:border-amber-300'>
            <img className='w-26' src={product.images[0]} />
            <h1 className='text-xl font-semibold'>{product.name}</h1>
            <h6 className='text-lg font-bold'>₹{product.price}</h6>
            <button className='btn'>Add to Cart</button>
        </div>
    )
}

export default Product
