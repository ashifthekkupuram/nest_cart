import jwt from 'jsonwebtoken'
import 'dotenv/config.js'

import User from '../models/user.model.js'

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY

const isAuthencated = async (req, res, next) => {
    try {

        if (req.headers.authorization === undefined || req.headers.authorization === null) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        jwt.verify(token, ACCESS_SECRET_KEY, async (error, decoded) => {
            if (error) {
                if (error.name === 'TokenExpiredError') {
                    return res.status(403).json({
                        success: false,
                        message: 'Token is expired'
                    })
                }

                next(error)
            }

            if (decoded) {
                const user = await User.findById(decoded._id)

                if (!user) {
                    return res.status(403).json({
                        success: false,
                        message: 'User not found'
                    })
                }

                req.user = decoded._id

                next()
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Token is expired or invalid'
                })
            }

        })

    } catch (error) {
        next(error)
    }
}

export default isAuthencated