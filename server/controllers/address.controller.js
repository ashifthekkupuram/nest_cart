import Address from '../models/address.model.js'
import User from '../models/user.model.js'

export const getAddress = async (req, res, next) => {
    try{

        const { addressId } = req.params

        const address = await Address.findById(addressId)

        return res.json({
            success: true,
            message: 'Get Address',
            data: address
        })

    } catch(error) {
        next(error)
    }
}

export const createAddress = async (req, res, next) => {
    try {

        const { fullName, address1, address2, district, state, postalCode, contactNumber } = req.body

        const user = await User.findByIdAndUpdate(req.user)

        if (user?.addresses.length > 3) {
            return res.status(400).json({
                success: false,
                message: 'Only 3 Addresses allowed to add'
            })
        }

        if (!fullName || fullName.length < 5) {
            return res.status(400).json({
                success: false,
                message: 'Full Name must have 5 character or above'
            })
        }

        if (!address1 || !district || !state) {
            return res.status(400).json({
                success: false,
                message: 'Address, District and State required'
            })
        }

        if (!postalCode || postalCode.toString().length !== 6) {
            return res.status(400).json({
                success: false,
                message: 'Postal Code must have 6 digits'
            })
        }

        if (!contactNumber || contactNumber.toString().length !== 10) {
            return res.status(400).json({
                success: false,
                message: 'Contact number must be valid'
            })
        }

        const address = await Address.create({
            fullName,
            address1,
            address2: address2 || '',
            district,
            state,
            postalCode,
            contactNumber
        })

        await User.findByIdAndUpdate(req.user, {
            '$push': {
                'addresses': address
            }
        }, { new: true })

        return res.json({
            success: true,
            message: 'created address',
            data: address
        })

    } catch (error) {
        next(error)
    }
}

export const updateAddress = async (req, res, next) => {
    try {

        const { addressId } = req.params

        const { fullName, address1, address2, district, state, postalCode, contactNumber } = req.body

        if (!fullName || fullName.length < 5) {
            return res.status(400).json({
                success: false,
                message: 'Full Name must have 5 character or above'
            })
        }

        if (!address1 || !district || !state) {
            return res.status(400).json({
                success: false,
                message: 'Address, District and State required'
            })
        }

        if (!postalCode || postalCode.toString().length !== 6) {
            return res.status(400).json({
                success: false,
                message: 'Postal Code must have 6 digits'
            })
        }

        if (!contactNumber || contactNumber.toString().length !== 10) {
            return res.status(400).json({
                success: false,
                message: 'Contact number must be valid'
            })
        }

        const address = await Address.findByIdAndUpdate(addressId , {
            fullName,
            address1,
            address2: address2 || '',
            district,
            state,
            postalCode,
            contactNumber
        }, { new: true })

        return res.json({
            success: true,
            message: 'Updated address',
            data: address
        })

    } catch(error) {
        next(error)
    }
}

export const deleteAddress = async (req, res, next) => {
    try {

        const { addressId } = req.params

        await User.findByIdAndUpdate(req.user, {
            '$pull': {
                'addresses': addressId
            }
        })

        await Address.findByIdAndDelete(addressId)

        return res.json({
            success: true,
            message: 'Deleted address',
            data: addressId
        })

    } catch (error) {
        next(error)
    }
}