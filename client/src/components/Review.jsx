import React from 'react'
import Ratings from 'react-ratings-declarative';
import { RxAvatar } from "react-icons/rx"

const Review = ({ review }) => {
    return (
        <div className='flex flex-col w-full bg-gray-100 p-4 rounded-2xl'>
            <div className='flex justify-start items-center gap-1'>
                <RxAvatar className='text-3xl' />
                <h1 className='capitalize'>{review.author.name.firstName} {review.author.name.secondName}</h1>
            </div>
            <div className='flex justify-start items-center mb-1 ml-1 gap-2'>
                <Ratings rating={review.stars} numberOfStars={5}>
                    <Ratings.Widget widgetDimension='15px' widgetSpacing='1px' widgetRatedColor='orange' />
                    <Ratings.Widget widgetDimension='15px' widgetSpacing='1px' widgetRatedColor='orange' />
                    <Ratings.Widget widgetDimension='15px' widgetSpacing='1px' widgetRatedColor='orange' />
                    <Ratings.Widget widgetDimension='15px' widgetSpacing='1px' widgetRatedColor='orange' />
                    <Ratings.Widget widgetDimension='15px' widgetSpacing='1px' widgetRatedColor='orange' />
                </Ratings>
                <h1 className='text-sm font-bold'>{review.title}</h1>
            </div>
            {review.title && <div className='flex justify-start items-center mb-1 ml-1 gap-2'>
                <p className='text-gray-600'>
                    {review.content}
                </p>
            </div>}
        </div>
    )
}

export default Review
