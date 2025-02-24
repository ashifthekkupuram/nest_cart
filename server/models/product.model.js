import mongoose from 'mongoose'
import { arrayBuffer } from 'stream/consumers'

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
        validate: [
            function(value){ return value.length <! 1 || value.length >! 10 }, 'Maximum of 10 images can be uploaded'
        ]
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }]
},{ timestamps: true })

export default mongoose.model('Product', ProductSchema)