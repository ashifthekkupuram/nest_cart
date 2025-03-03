import express from 'express'

import { getAddress ,createAddress, updateAddress, deleteAddress } from '../controllers/address.controller.js'
import isAuthenticated from '../middlewares/auth.middleware.js'
import isAddressAdder from '../middlewares/address.middleware.js'

const AddressRouter = express.Router()

AddressRouter.get('/:addressId', isAuthenticated, isAddressAdder, getAddress)
AddressRouter.post('/', isAuthenticated, createAddress)
AddressRouter.put('/:addressId', isAuthenticated, isAddressAdder, updateAddress)
AddressRouter.delete('/:addressId', isAuthenticated, isAddressAdder, deleteAddress)

export default AddressRouter