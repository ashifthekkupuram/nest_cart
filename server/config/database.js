import mongoose from 'mongoose'
import 'dotenv/config.js'

const MONGODB_URI = process.env.MONGODB_URI

const ConnectDatabase = async () => {
    try{
        await mongoose.connect(MONGODB_URI)
        console.log('Database Connected')
    } catch(error) {
        console.log(error)
    }
}

export default ConnectDatabase