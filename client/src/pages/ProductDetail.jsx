import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Ratings from 'react-ratings-declarative';

import api from '../api/axios'
import useAuth from '../zustand/useAuth'
import useAddToCart from '../hooks/useAddToCart'
import useWriteReview from '../hooks/useWriteReview'
import useUpdateReview from '../hooks/useUpdateReview'
import useDeleteReview from '../hooks/useDeleteReview'

const ProductDetail = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [stars, setStars] = useState(0)
    const [updateMode, setUpdateMode] = useState(false)

    const { productId } = useParams()
    const { data } = useQuery({
        queryKey: ['product', productId],
        queryFn: async () => {
            const response = await api.get(`product/${productId}`)
            return response.data.data
        }
    })

    const { data: review } = useQuery({
        queryFn: async () => {
            const response = await api.get(`review/single/${productId}`)
            return response.data.data
        },
        retry: 5
    })

    const token = useAuth((state) => state.token)
    const { loading, addToCart } = useAddToCart()
    const { loading: creatingReviewLoading, writeReview } = useWriteReview()
    const { loading: updatingReviewLoading, updateReview } = useUpdateReview()
    const { loading: deletingReviewLoading, deleteReview } = useDeleteReview()

    const onWriteReview = async () => {
        const res = await writeReview(productId, title, description, stars)
        if (res) {
            setTitle(res.title)
            setDescription(res.content)
            setStars(res.stars)
        }
    }
    const onUpdateReview = async () => {
        const res = await updateReview(productId, title, description, stars)
        if (res) {
            setTitle(res.title)
            setDescription(res.content)
            setStars(res.stars)
        }
    }

    const onDeleteReview = async () => {
        const res = await deleteReview(productId)
        if (res) {
            setTitle('')
            setDescription('')
            setStars(0)
            setUpdateMode(false)
        }
    }

    useEffect(() => {
        if (review) {
            setTitle(review.title)
            setDescription(review.content)
            setStars(review.stars)
            setUpdateMode(true)
        }
    }, [review])

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
                    <Ratings
                        rating={stars}
                        numberOfStars={5}
                        changeRating={(rating) => setStars(rating)}
                        starRatedColor="#blue"
                    >
                        <Ratings.Widget widgetRatedColor='orange' />
                        <Ratings.Widget widgetRatedColor='orange' />
                        <Ratings.Widget widgetRatedColor='orange' />
                        <Ratings.Widget widgetRatedColor='orange' />
                        <Ratings.Widget widgetRatedColor='orange' />
                    </Ratings>
                </div>
                <div className='mb-1'>
                    <label htmlFor="description">Description: </label>
                    <textarea value={description} className='w-full' name="description" id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <button onClick={() => updateMode ? onUpdateReview(productId, title, description, stars) : onWriteReview(productId, title, description, stars)} disabled={!title || !description || !stars || creatingReviewLoading || updatingReviewLoading || deletingReviewLoading} className='btn mb-1'>{updateMode ? 'Update' : 'Write'}</button>
                {updateMode  && <button onClick={() => onDeleteReview(productId)} disabled={deletingReviewLoading} className='btn !bg-red-500 hover:!bg-red-600'>Delete</button>}
            </section>
        </div>
    )
}

export default ProductDetail
