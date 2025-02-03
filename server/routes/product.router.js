import express from 'express'

import { get_products, get_product, create_product } from '../controllers/product.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import isAdmin from '../middlewares/isAdmin.js'

const Router = express.Router()

Router.get('/', isAuthenticated, get_products)
Router.get('/productId', isAuthenticated, get_product)
Router.post('/', create_product)

export default Router