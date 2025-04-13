import bcyrpt from 'bcryptjs'

import User from '../models/user.model.js'

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

export const getUsers = async (req, res, next) => {
    try{

        const users = await User.find().select('-password').populate('addresses')

        return res.json({
            success: true,
            message: 'GET users',
            data: users
        })

    } catch(error) {
        next(error)
    }
}

export const changeName = async (req, res, next) => {
    try {

        const { firstName, secondName } = req.body

        if (!firstName || !secondName || firstName.length < 2 || secondName.length < 2) {
            return res.status(400).json({
                success: false,
                message: 'First and Second Name required and need to above 2 characters'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(req.user, {
            name: {
                firstName: firstName.toLowerCase(),
                secondName: secondName.toLowerCase(),
            }
        }, { new: true }).populate('addresses')

        return res.json({
            success: true,
            message: 'User name updated',
            data: {
                email: updatedUser.email,
                phone: updatedUser.phone,
                name: updatedUser.name,
                addresses: updatedUser.addresses,
                admin: updatedUser.admin
            }
        })

    } catch (error) {
        next(error)
    }
}

export const changePassword = async (req, res, next) => {
    try{

        const { oldPassword, newPassword } = req.body

        if(!oldPassword){
            return res.status(400).json({
                success: false,
                message: 'Old Password required'
            })
        }

        if(!newPassword || !newPassword.match(PASSWORD_REGEX)){
            return res.status(400).json({
                success: false,
                message: 'New Password required and must valid'
            })
        }

        const user = await User.findById(req.user)

        const match = bcyrpt.compareSync(oldPassword, user.password)

        if(match){

            bcyrpt.hash(newPassword, 12, async (error, hashedPassword) => {
                if(error){
                    next(error)
                }else{

                    await User.findByIdAndUpdate(req.user, { password: hashedPassword })

                    return res.json({
                        success: true,
                        message: 'User Password changed'
                    })
                }
            })

        }else{
            return res.status(400).json({
                success: false,
                message: 'Invalid Old Password'
            })
        }

    } catch(error) {
        next(error)
    }
}