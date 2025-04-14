import User from '../models/user.model.js'
import Product from '../models/product.model.js'
import Order from '../models/order.model.js'

export const getDashboardDetails = async (req, res, next) => {
    try{

        const usersCount = await User.countDocuments()
        const productsCount = await Product.countDocuments()
        const ordersCount = await Order.countDocuments()
        const pendingOrdersCount = await Order.countDocuments({ status: 'PENDING' })
        const deliveredOrdersCount = await Order.countDocuments({ status: 'DELIVERED' })

        return res.json({
            success: true,
            message: 'GET dashboard details',
            data: {
                usersCount,
                productsCount,
                ordersCount,
                pendingOrdersCount,
                deliveredOrdersCount
            }
        })

    } catch(error) {
        next(error)
    }
}

export const updateAdminUser = async (req, res, next) => {
    try{

        const { userId } = req.params

        if(!userId){
            return res.status(400).json({
                success: false,
                message: 'User ID required'
            })
        }

        const user = await User.findById(userId).select('-password')

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { admin: !user.admin }, { new: true }).select('-password')

        return res.json({
            success: true,
            message: 'UPDATE user',
            data: updatedUser
        })

    } catch(error) {
        next(error)
    }
}