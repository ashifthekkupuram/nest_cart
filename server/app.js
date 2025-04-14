import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config.js'

import ConnectDatabase from './config/database.js'
import AuthRouter from './routes/auth.router.js'
import CategoryRouter from './routes/category.router.js'
import ProductRouter from './routes/product.router.js'
import CartRouter from './routes/cart.router.js'
import AddressRouter from './routes/address.router.js'
import OrderRouter from './routes/order.router.js'
import UserRouter from './routes/user.router.js'
import ReviewRouter from './routes/review.router.js'
import AdminRouter from './routes/admin.router.js'

import errorHandler from './middlewares/error.middleware.js'

const PORT = process.env.PORT || 5000

const app = express()

// App Configuration
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// API Routes
app.use('/api/auth', AuthRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/product', ProductRouter)
app.use('/api/cart', CartRouter)
app.use('/api/address', AddressRouter)
app.use('/api/order', OrderRouter)
app.use('/api/user', UserRouter)
app.use('/api/review', ReviewRouter)
app.use('/api/admin', AdminRouter)

// Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
    ConnectDatabase()
    console.log(`server is running on ${PORT}`)
})