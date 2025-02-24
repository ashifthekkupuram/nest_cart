const errorHandler = (err, req, res, next) => {
    try{

        const error = { ...err }

        error.message = err.message

        res.status(error.statusCode || 500).json({ success: false, message: error.message || 'Internal Server Error' })

    } catch(error) {
        next(error)
    }
}

export default errorHandler