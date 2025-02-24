import express from 'express'

import { get_categories, get_category, create_category, update_category, delete_category } from '../controllers/category.controller.js'
import isAuthenticated from '../middlewares/auth.middleware.js'
import isAdmin from '../middlewares/admin.middleware.js'

const Router = express.Router()

Router.get('/', isAuthenticated, get_categories)
Router.get('/:categoryId', isAuthenticated, get_category)
Router.post('/', isAuthenticated, isAdmin, create_category)
Router.put('/:categoryId', isAuthenticated, isAdmin, update_category)
Router.delete('/:categoryId', isAuthenticated, isAdmin, delete_category)

export default Router