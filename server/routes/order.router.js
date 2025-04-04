import express from 'express'

import { getOrder, getOrders, checkout } from '../controllers/order.controller.js'
import isAuthenticated from '../middlewares/auth.middleware.js'

const OrderRouter = express.Router()

OrderRouter.get('/', isAuthenticated, getOrders)
OrderRouter.get('/:orderId', isAuthenticated, getOrder)
OrderRouter.post('/:addressId', isAuthenticated, checkout)

export default OrderRouter