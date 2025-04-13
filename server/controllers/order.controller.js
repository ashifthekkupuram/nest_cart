import Order from '../models/order.model.js'
import Address from '../models/address.model.js'
import Cart from '../models/cart.model.js'


export const getAllOrders = async (req, res, next) => {
    try{

        const orders = await Order.find().populate('customer', 'name email phone').populate('order_items.product')

        return res.json({
            success: true,
            mesage: 'GET Orders',
            data: orders
        })

    } catch(error) {

        console.log(error)

        next(error)
    }
}

export const getOrders = async (req, res, next) => {
    try{

        const orders = await Order.find({ customer: req.user }).populate('customer', 'name email phone').populate('order_items.product')

        return res.json({
            success: true,
            mesage: 'GET Orders',
            data: orders
        })

    } catch(error) {
        next(error)
    }
}

export const getOrder = async (req, res, next) => {
    try{

        const { orderId } = req.params

        if(!orderId){
            return res.status(400).json({
                success: false,
                message: 'Order ID required'
            })
        }

        const order = await Order(findById).populate('customer', 'name email phone').populate('order_items.product')

        if(!order){
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

        if(order.customer.toString() !== req.user){
            return res.status(400).json({
                success: false,
                message: 'This is not your order'
            })
        }

        return res.json({
            success: true,
            message: 'GET Order',
            data: order
        })

    } catch(error) {
        next(error)
    } 
}

export const checkout = async (req, res, next) => {
    try {

        const { addressId } = req.params

        const cart = await Cart.findOne({ customer: req.user })
        const address = await Address.findById(addressId)

        console.log(address)
        
        let totalAmount = 0
        cart.order_items.forEach((item) => {
            totalAmount = totalAmount + item.amount
        })

        const order = await Order.create({
            customer: req.user,
            order_items: cart.order_items,
            address: {
                fullName: address.fullName,
                address1: address.address1,
                address2: address.address2,
                state: address.state,
                district: address.district,
                postalCode: address.postalCode,
                contactNumber: address.contactNumber
            },
            totalAmount,
        })

        await Cart.findOneAndUpdate({ customer: req.user }, { order_items: [] })

        return res.json({
            success: true,
            message: 'Order has been made',
            data: order
        })

    } catch(error) {
        next(error)
    } 
}