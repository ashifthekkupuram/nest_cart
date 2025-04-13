import express from 'express'

import { getOrder, getOrders, checkout, getAllOrders, updateOrder } from '../controllers/order.controller.js'
import isAuthenticated from '../middlewares/auth.middleware.js'
import isAdmin from '../middlewares/admin.middleware.js'

const OrderRouter = express.Router()

OrderRouter.get('/', isAuthenticated, getOrders)
OrderRouter.get('/all', isAuthenticated, isAdmin, getAllOrders)
OrderRouter.get('/:orderId', isAuthenticated, getOrder)
OrderRouter.put('/:orderId', isAuthenticated, isAdmin, updateOrder)
OrderRouter.post('/:addressId', isAuthenticated, checkout)


export default OrderRouter