import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import ReactStars from "react-rating-stars-component"

import api from '../api/axios'
import useAuth from '../zustand/useAuth'
import useAddToCart from '../hooks/useAddToCart'
import useWriteReview from '../hooks/useWriteReview'

const ProductDetail = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [stars, setStars] = useState(0)

    const { productId } = useParams()
    const { data } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const response = await api.get(`product/${productId}`)
            return response.data.data
        }
    })

    const token = useAuth((state) => state.token)
    const { loading, addToCart } = useAddToCart()
    const { loading: reviewLoading, writeReview } = useWriteReview()

    const onWriteReview = () => {
        writeReview(productId, title, description, stars)
        setTitle('')
        setDescription('')
    }

    return (
        <div className='flex flex-col px-1 py-2 md:px-10'>
            {/* Product Detail Section */}
            <section className='flex flex-col justify-center w-full items-start md:items-center gap-1 md:flex-row'>
                {/* Image Section */}
                <Carousel className='md:w-[40%] z-10' >
                    {data?.images.map((image, index) =>
                        <div key={index}>
                            <img src={image} />
                            <p className="legend">{index + 1}</p>
                        </div>)}
                </Carousel>
                {/* Other Detail Section */}
                <div className='flex flex-col justify-center items-center md:w-[60%] p-2 gap-3'>
                    <h1 className='text-3xl font-bold self-start md:text-4xl'>{data?.name}</h1>
                    <p className='self-start'>{data?.description}</p>
                    <h2 className='text-2xl font-bold self-start md:text-3xl'>₹{data?.price}</h2>
                    {token && <button disabled={loading} onClick={() => addToCart(productId)} className='btn self-start'>Add to Cart</button>}
                </div>
            </section>
            {/* Review View and Write section */}
            <section className='flex flex-col w-full'>
                <div className='mb-1'>
                    <label htmlFor="title">Title: </label>
                    <input value={title} name="title" id="title" placeholder='Awesome Product' onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                <div className='mb-1'>
                    <label htmlFor="description">Rating: </label>
                    <ReactStars
                        count={5}
                        onChange={(newRating) => setStars(newRating)}
                        size={50}
                        activeColor="#ffd700"
                    />,
                </div>
                <div className='mb-1'>
                    <label htmlFor="description">Description: </label>
                    <textarea value={description} className='w-full' name="description" id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <button onClick={() => writeReview(productId, title, description, stars)} disabled={!title || !description || !stars || reviewLoading} className='btn'>Write Review</button>
            </section>
        </div>
    )
}

export default ProductDetail
