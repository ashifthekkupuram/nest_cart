import express from 'express'

import { addToCart, removeFromCart } from '../controllers/cart.controller.js'
import isAuthenticated from '../middlewares/auth.middleware.js'

const CartRouter = express.Router()

CartRouter.post('/:productId', isAuthenticated, addToCart)
CartRouter.delete('/:productId', isAuthenticated, removeFromCart)

export default CartRouter