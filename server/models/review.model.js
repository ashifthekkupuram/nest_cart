import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    title: {
        type: String,
        minLength: 20,
        required: true
    },
    content: {
        type: String,
    },
    stars: {
        type: Number
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Review', ReviewSchema)