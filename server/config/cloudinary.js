import { v2 as cloudinary } from 'cloudinary' 
import 'dotenv/config.js'

const CLOUDINARY_URL = process.env.CLOUDINARY_URL

export default cloudinary.config({
    cloudinary_url: CLOUDINARY_URL,
    secure: true
})
