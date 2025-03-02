import Product from '../models/product.model.js'
import Cart from '../models/cart.model.js'

export const addToCart = async (req, res, next) => {
    try {

        const { productId } = req.params

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID required'
            })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product do not exist'
            })
        }

        let cart = await Cart.findOne({ customer: req.user })

        if (!cart) {
            cart = await Cart.create({ customer: req.user, order_items: [] })
        }

        const existingItem = cart.order_items.find((item) => item.product.toString() === productId)

        if (existingItem) {
            await Cart.findOneAndUpdate({ customer: req.user, "order_items.product": productId }, {
                "$inc": { "order_items.$.quantity": 1, "order_items.$.amount": product.price }
            },)
        } else {
            const newOrderItem = { product: productId, price: product.price, quantity: 1, amount: product.price }
            await Cart.findOneAndUpdate({ customer: req.user }, {
                "$push": {
                    "order_items": newOrderItem
                }
            })
        }

        const updatedCart = await Cart.findOne({ customer: req.user }).populate('order_items.product', 'name images')

        return res.json({
            success: true,
            message: 'Added to Cart',
            data: updatedCart
        })

    } catch (error) {
        next(error)
    }
}

export const removeFromCart = async (req, res, next) => {
    try {

        const { productId } = req.params

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID required'
            })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product do not exist'
            })
        }

        let cart = await Cart.findOne({ customer: req.user })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'There is no items in cart'
            })
        }

        const existingItem = cart.order_items.find((item) => item.product.toString() === productId)

        if (existingItem) {
            if(existingItem.quantity > 1){
                await Cart.findOneAndUpdate({ customer: req.user, "order_items.product": productId }, {
                    "$inc": { "order_items.$.quantity": -1, "order_items.$.amount": -product.price }
                },)
            }else{
                await Cart.findOneAndUpdate({ customer: req.user}, {
                    "$pull": {
                        "order_items": { product: productId }
                    }
                },)
            }
        } else {
            return res.status(404).json({
                success: false,
                message: 'Item do not exist to remove'
            })
        }

        const updatedCart = await Cart.findOne({ customer: req.user }).populate('order_items.product', 'name images')

        return res.json({
            success: true,
            message: 'Added to Cart',
            data: updatedCart
        })

    } catch (error) {
        next(error)
    }
}