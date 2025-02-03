import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 156
    },
    description: {
        type: String,
        required: true,
        minLength: 20
    },
    price: {
        type: Number,
        min: 5,
        set: (value) => parseFloat(value.toFixed(2)),
        get: (value) => parseFloat(value.toFixed(2)),
    },
    images: [{
        type: String,
        required: true,
        minLength: 1,
        maxLength: 10
    }]
},{ timestamps: true })

export default mongoose.model('Product', ProductSchema)