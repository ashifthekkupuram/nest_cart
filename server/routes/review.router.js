import express from 'express'

import { getReviews, createReview, updateReview, deleteReview } from '../controllers/review.controller.js'
import isAuthenticated from '../middlewares/auth.middleware.js'
import isReviewer from '../middlewares/review.middleware.js'

const ReviewRouter = express.Router()

ReviewRouter.get('/:productId', getReviews)
ReviewRouter.post('/:productId', isAuthenticated, createReview)
ReviewRouter.put('/:reviewId', isAuthenticated, isReviewer, updateReview)
ReviewRouter.delete('/:reviewId', isAuthenticated, isReviewer, deleteReview)

export default ReviewRouter