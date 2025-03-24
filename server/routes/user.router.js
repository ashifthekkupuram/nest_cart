import express from 'express'

import { changeName, changePassword } from '../controllers/user.controller.js'
import isAuthenticated from '../middlewares/auth.middleware.js'

const UserRouter = express.Router()

UserRouter.post('/change-name' , isAuthenticated, changeName)
UserRouter.post('/change-password', isAuthenticated, changePassword)

export default UserRouter