import express from 'express'

import { get_products, get_product, create_product, delete_product } from '../controllers/product.controller.js'
import isAuthenticated from '../middlewares/auth.middleware.js'
import isAdmin from '../middlewares/admin.middleware.js'
import upload from '../middlewares/multer.middleware.js'


const Router = express.Router()

Router.get('/', isAuthenticated, get_products)
Router.get('/:productId', isAuthenticated, get_product)
Router.post('/', isAuthenticated, isAdmin, upload.array('images', 10), create_product)
Router.delete('/:productId', isAuthenticated, isAdmin, delete_product)

export default Router