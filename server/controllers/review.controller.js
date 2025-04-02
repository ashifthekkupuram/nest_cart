import Review from '../models/review.model.js'

export const getReviews = async (req, res, next) => {
    try {

        const { productId } = req.params

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID required'
            })
        }

        const reviews = await Review.find({ product: productId }).populate('author', 'name')

        return res.json({
            success: true,
            message: 'GET Reviews',
            data: reviews
        })

    } catch (error) {
        next(error)
    }
}

export const getReview = async (req, res, next) => {
    try{

        const { productId } = req.params

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID required'
            })
        }

        const review = await Review.findOne({ product: productId, author: req.user })

        if(!review){
            return res.status(400).json({
                success: false,
                message: 'Review do not exist'
            }) 
        }

        return res.json({
            success: true,
            message: 'Get Review',
            data: review
        })

    } catch(error) {
        next(error)
    }
}

export const createReview = async (req, res, next) => {
    try {

        const { title, content, stars } = req.body
        const { productId } = req.params

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID required'
            })
        }

        if (!title || title.length < 20) {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            })
        }

        const review = await Review.create({
            product: productId,
            title,
            content: content || '',
            stars,
            author: req.user
        })

        return res.json({
            success: true,
            message: 'Create Review',
            data: review
        })

    } catch (error) {
        next(error)
    }
}

export const updateReview = async (req, res, next) => {
    try {

        const { title, content, stars } = req.body
        const { productId } = req.params

        if (!title || title.length < 20) {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            })
        }

        const reviewExist = await Review.findOne({ product: productId, author: req.user })

        if(!reviewExist){
            return res.status(400).json({
                success: false,
                message: 'Review do not exist'
            })
        }

        const review = await Review.findOneAndUpdate({ product: productId, author: req.user },{
            product: productId,
            title,
            content: content || '',
            stars,
            author: req.user
        }, { new: true })

        return res.json({
            success: true,
            message: 'Update Review',
            data: review
        })

    } catch (error) {
        next(error)
    }
}

export const deleteReview = async (req, res, next) => {
    try {

        const { productId } = req.params

        await Review.findOneAndDelete({ product: productId, author: req.user })

        return res.json({
            success: true,
            message: 'Delete Review',
            data: productId
        })

    } catch (error) {
        next(error)
    }
}