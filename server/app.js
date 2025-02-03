import express from 'express'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import 'dotenv/config.js'

import ConnectDatabase from './config/database.js'
import AuthRouter from './routes/auth.router.js'
import CategoryRouter from './routes/category.router.js'
import ProductRouter from './routes/product.router.js'

const PORT = process.env.PORT || 5000

const app = express()
// const upload = multer()

// App Configuration
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use(upload.array())

// API Routes
app.use('/api/auth', AuthRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/product', ProductRouter)

app.listen(PORT, () => {
    ConnectDatabase()
    console.log(`server is running on ${PORT}`)
})