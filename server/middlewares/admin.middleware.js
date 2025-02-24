import User from '../models/user.model.js'

const isAdmin = async (req, res, next) => {
    try{
        
        const user = await User.findById(req.user)

        if(user.admin){
            next()
        }else{
            return res.status(401).json({
                success: false,
                message: 'You are not admin'
            })
        }

    }catch(error){
        next(error)
    }
}

export default isAdmin