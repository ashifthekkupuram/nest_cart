import Address from '../models/address.model.js'
import User from '../models/user.model.js'

const isAddressAdder = async (req, res, next) => {
    try{

        const { addressId } = req.params

        if(!addressId){
            return res.status(404).json({
                success: false,
                message: 'Address ID required'
            })
        }

        const address = await Address.findById(addressId)

        if(!address){
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            })
        }

        const user = await User.findById(req.user)

        if(user.addresses.includes(addressId)){
            next()
        }else{
            return res.status(400).json({
                success: false,
                message: 'You are not the adder of this address'
            })
        }

    } catch(error) {
        next(error)
    }
}

export default isAddressAdder