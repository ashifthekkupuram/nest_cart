import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const CartSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order_items: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        amount: {
            type: Number,
            required: true
        }
    }]
})

export default mongoose.model('Cart', CartSchema)