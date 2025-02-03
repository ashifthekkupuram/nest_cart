import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config.js'

import ConnectDatabase from './config/database.js'
import AuthRouter from './routes/auth.router.js'
import CategoryRouter from './routes/category.router.js'

const PORT = process.env.PORT || 5000

const app = express()

// App Configuration
app.use(express.json())
app.use(cookieParser())

// API Routes
app.use('/api/auth', AuthRouter)
app.use('/api/category', CategoryRouter)

app.listen(PORT, () => {
    ConnectDatabase()
    console.log(`server is running on ${PORT}`)
})