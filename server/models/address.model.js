import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AddressSchema = new Schema({
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
})

export default mongoose.model('Address', AddressSchema)