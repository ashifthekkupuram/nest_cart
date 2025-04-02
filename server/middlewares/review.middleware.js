import User from '../models/user.model.js'
import Review from '../models/review.model.js'

const isReviewer = async (req, res, next) => {
    try {

        const { productId } = req.params

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID required'
            })
        }

        const review = await Review.findOne({ product: productId, author: req.user })

        if(!review){
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            })
        }

        const user = await User.findById(req.user)

        if (user.admin) {
            return next()
        }

        if(review.author.toString() === req.user){
            return next()
        }else{
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

    } catch (error) {
        next(error)
    }
}

export default isReviewer