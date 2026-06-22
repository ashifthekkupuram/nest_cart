import express from 'express'

import { createPaymentOrder } from '../controllers/razorpay.controller.js'
import authenticate from "../middlewares/auth.middleware.js"

const Router = express.Router()

Router.post('/orderPayment', authenticate, createPaymentOrder)

export default Router