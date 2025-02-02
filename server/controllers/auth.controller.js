import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config.js'

import User from '../models/user.model.js'

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

export const login = async (req, res, next) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and Password Required'
            })
        }

        const user = await User.findOne({ 'email.email': email.toLowerCase() })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user credentails'
            })
        }


        const match = bcrypt.compareSync(password, user.password)

        if (match) {

            const refresh_token = jwt.sign({ _id: user._id }, REFRESH_SECRET_KEY, { expiresIn: '1d' })
            const access_token = jwt.sign({ _id: user._id }, ACCESS_SECRET_KEY, { expiresIn: '5m' })

            res.cookie('jwt', refresh_token)

            return res.json({
                success: true,
                message: 'You have been logged in',
                access_token,
                UserData: {
                    email: user.email,
                    phone: user.phone,
                    name: user.name,
                    addresses: user.addresses
                }
            })

        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid user credentails'
            })
        }

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrongg',
            error: err
        })
    }
}

export const register = async (req, res, next) => {
    try {

        const { email, phone, firstName, secondName, password } = req.body

        if (!email || !email.match(EMAIL_REGEX)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email',
            })
        }

        if (!phone || phone.toString().length !== 10) {
            return res.status(400).json({
                success: false,
                message: 'Invalid phone number',
            })
        }

        const [emailExist, phoneExist] = await Promise.all([
            await User.findOne({ 'email.email': email.toLowerCase() }),
            await User.findOne({ 'phone.phone': phone }),
        ])

        if (emailExist) {
            return res.status(400).json({
                success: false,
                message: 'User with the email already exist',
            })
        }

        if (phoneExist) {
            return res.status(400).json({
                success: false,
                message: 'User with the phone number already exist',
            })
        }

        if (!firstName || firstName.length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Invalid First name',
            })
        }

        if (!secondName || secondName.length < 2) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Second name',
            })
        }

        if (!password || !password.match(PASSWORD_REGEX)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password',
            })
        }

        bcrypt.hash(password, 12, async (err, hashedPassword) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Something went wrong',
                    error: err
                })
            } else {

                const user = new User({
                    email: { email: email.toLowerCase() },
                    phone: { phone: phone },
                    name: {
                        firstName: firstName.toLowerCase(),
                        secondName: secondName.toLowerCase()
                    },
                    password: hashedPassword
                })

                await user.save()

                return res.json({
                    success: true,
                    message: 'User successfully created'
                })

            }
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrongg',
            error: err
        })
    }
}

export const refresh = async (req, res, next) => {
    try {

        const cookies = req.cookies

        if (!cookies?.jwt) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            })
        }

        const refresh_token = cookies.jwt

        jwt.verify(refresh_token, REFRESH_SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Session Expired',
                })
            }

            const user = await User.findById(decoded._id)

            if(!user){
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                })
            }

            const access_token = jwt.sign({ _id: user._id }, ACCESS_SECRET_KEY, { expiresIn: '5m' })

            return res.json({
                success: true,
                message: 'You have been logged in',
                access_token,
                UserData: {
                    email: user.email,
                    phone: user.phone,
                    name: user.name,
                    addresses: user.addresses
                }
            })
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const logout = async (req, res, next) => {
    try {
        const cookies = req.cookies

        if (!cookies?.jwt) return res.sendStatus(204)

        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' })

        res.json({ success: true, message: 'Logged out' })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}