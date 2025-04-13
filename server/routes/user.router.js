import express from 'express'

import { changeName, changePassword, getUsers } from '../controllers/user.controller.js'
import isAuthenticated from '../middlewares/auth.middleware.js'
import isAdmin from '../middlewares/admin.middleware.js'

const UserRouter = express.Router()

UserRouter.get('/' , isAuthenticated, isAdmin, getUsers)
UserRouter.post('/change-name' , isAuthenticated, changeName)
UserRouter.post('/change-password', isAuthenticated, changePassword)

export default UserRouter