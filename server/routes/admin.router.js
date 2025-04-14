import express from 'express'

import { getDashboardDetails, updateAdminUser } from '../controllers/admin.controller.js'
import isAuthenticated from '../middlewares/auth.middleware.js'
import isAdmin from '../middlewares/admin.middleware.js'

const AdminRouter = express.Router()

AdminRouter.get('/', isAuthenticated, isAdmin, getDashboardDetails)
AdminRouter.post('/user-admin/:userId', isAuthenticated, isAdmin, updateAdminUser)

export default AdminRouter