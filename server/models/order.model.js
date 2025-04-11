import mongoose from 'mongoose'

const Schema = mongoose.Schema

const OrderSchema = new Schema({
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
    }],
    address: {
        fullName: {
            type: String,
            required: true,
            minLength: 5
        },
        address1: {
            type: String,
            required: true
        },
        address2: {
            type: String,
            default: ''
        },
        district: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postalCode: {
            type: Number,
            required: true,
            minLength: 6
        },
        contactNumber: {
            type: Number,
            required: true,
            minLength: 10,
            maxLength: 10
        }
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['COD'],
        default: 'COD'
    },
    paid: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['PENDING', 'CANCELLED', 'DELIVERED'],
        default: 'PENDING'
    }
}, { timestamps: true })

export default mongoose.model('Order', OrderSchema)