import mongoose from 'mongoose'
import 'dotenv/config.js'

const MONGODB_URI = process.env.MONGODB_URI

const ConnectDatabase = async () => {
    try{
        await mongoose.connect(MONGODB_URI)
        console.log('Database Connected')
    } catch(err) {
        console.log(err)
    }
}

export default ConnectDatabase