import './reviews.scss'
import { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import Ratings from 'react-ratings-declarative'
import { useInView } from 'react-intersection-observer'
import ClipLoader from 'react-spinners/ClipLoader'

import api from '../../api/api'

const Reviews = ({ setOpen, data: productId }) => {

    const { ref, inView } = useInView()

    const { data, status, fetchNextPage, isFetchingNextPage, error } = useInfiniteQuery({
        queryKey: ['reviews', productId],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await api.get(`/review/${productId}`, { params: { page: pageParam } })
            return response.data.data
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.hasNextPage ? allPages.length + 1 : undefined
        }
    })

    useEffect(() => {
        if(inView) fetchNextPage()
    },[inView, fetchNextPage])

    return (
        <div className='reviews'>
            <div className="modal">
                <span className="close" onClick={() => setOpen({ open: false, productId: '' })}>
                    X
                </span>
                <h1>Reviews</h1>
                {status === 'pending' ? <div className="loading"> <ClipLoader color='white' size={32} /> </div> : status === 'error' ? <div className="error">{error?.response?.data?.message || 'Internal Server Error'}</div> :
                    <div className="allReviews">
                        {data.pages.map((page) => {
                            return page.data.map((review) => <div key={review._id} className="review">
                                <div className='reviewTop'>
                                    <img src='user.svg' />
                                    <span className='capitalize'>{review.author.name.firstName} {review.author.name.secondName}</span>
                                </div>
                                <div className='reviewMiddle'>
                                    <Ratings rating={review.stars} numberOfStars={5}>
                                        <Ratings.Widget widgetDimension='15px' widgetSpacing='1px' widgetRatedColor='orange' />
                                        <Ratings.Widget widgetDimension='15px' widgetSpacing='1px' widgetRatedColor='orange' />
                                        <Ratings.Widget widgetDimension='15px' widgetSpacing='1px' widgetRatedColor='orange' />
                                        <Ratings.Widget widgetDimension='15px' widgetSpacing='1px' widgetRatedColor='orange' />
                                        <Ratings.Widget widgetDimension='15px' widgetSpacing='1px' widgetRatedColor='orange' />
                                    </Ratings>
                                    <span className='text-sm font-bold'>{review.title}</span>
                                </div>
                                {review.title && <div className='reviewBottom'>
                                    <p className='text-gray-600'>
                                        {review.content}
                                    </p>
                                </div>}
                            </div>)
                        })}
                    </div>}
                    <div className='fetchNextPage' ref={ref}> { isFetchingNextPage && <ClipLoader color='white' size={26} /> } </div>
            </div>
        </div>
    )
}

export default Reviews
