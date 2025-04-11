import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    }
}, { timestamps: true })

export default mongoose.model('Category', CategorySchema)