import Product from '../models/product.model.js'
import cloudinary from '../config/cloudinary.js'

export const get_products = async (req, res, next) => {
    try {

        const FilterData = {}

        const products = await Product.find(FilterData)

        return res.json({
            success: true,
            message: 'Products retrieved',
            products
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const get_product = async (req, res, next) => {
    try {

        const { productId } = req.params

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found'
            })
        }

        return res.json({
            success: true,
            message: 'Product retrieved',
            product
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const create_product = async (req, res, next) => {
    try {

        const { name, description, price } =  req.body
        console.log(req.body)

        if(!name || name.length < 7 || name.length > 157 ){
            return res.status(400).json({
                success: false,
                message: 'Product name must be between 6 and 156 characters'
            })
        }

        if(!description || description.length < 21 ){
            return res.status(400).json({
                success: false,
                message: 'Product name must be 20 characters or above'
            })
        }

        if(!price || price.length < 6 ){
            return res.status(400).json({
                success: false,
                message: 'Minimum price is 5 rupees'
            })
        }

        // if(!images){
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Atleast one image is required'
        //     })
        // }

        return res.json({
            message: 'Test'
        })

    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}