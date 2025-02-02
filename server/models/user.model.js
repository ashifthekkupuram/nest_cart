import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        email: {
            type: String,
            unique: true,
            required: true
        },
        verified: {
            type: Boolean,
            default: false
        }
    },
    phone: {
        phone: {
            type: Number,
            unique: true,
            minLength: 10,
            maxLength: 10,
            required: true
        },
        verified: {
            type: Boolean,
            default: false
        }
    },
    name: {
        firstName: {
            type: String,
            minLength: 2,
            required: true
        },
        secondName: {
            type: String,
            minLength: 2,
            required: true
        }
    },
    addresses: [{
        type: Schema.Types.ObjectId,
        ref: 'Address',
        default: [],
        maxLength: 3
    }],
    admin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model('User', UserSchema)