import express from 'express'

import { get_categories, create_category, update_category, delete_category } from '../controllers/category.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import isAdmin from '../middlewares/isAdmin.js'

const Router = express.Router()

Router.get('/', isAuthenticated, get_categories)
Router.post('/', isAuthenticated, isAdmin, create_category)
Router.put('/:categoryId', isAuthenticated, isAdmin, update_category)
Router.delete('/:categoryId', isAuthenticated, isAdmin, delete_category)

export default Router