import User from '../models/user.model.js'
import Review from '../models/review.model.js'

const isReviewer = async (req, res, next) => {
    try {

        const { reviewId } = req.params

        if (!reviewId) {
            return res.status(400).json({
                success: false,
                message: 'Review ID required'
            })
        }

        const review = await Review.findById(reviewId)

        if(!review){
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            })
        }

        const user = await User.findById(req.user)

        if (user.admin) {
            next()
        }

        if(review.author.toString() === req.user.toString()){
            next()
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