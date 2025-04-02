import express from 'express'

import { getReviews, getReview, createReview, updateReview, deleteReview } from '../controllers/review.controller.js'
import isAuthenticated from '../middlewares/auth.middleware.js'
import isReviewer from '../middlewares/review.middleware.js'

const ReviewRouter = express.Router()

ReviewRouter.get('/:productId', getReviews)
ReviewRouter.post('/:productId', isAuthenticated, createReview)
ReviewRouter.put('/:productId', isAuthenticated, isReviewer, updateReview)
ReviewRouter.delete('/:productId', isAuthenticated, isReviewer, deleteReview)

ReviewRouter.get('/single/:productId', isAuthenticated, getReview)

export default ReviewRouter