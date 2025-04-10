import fs from 'fs'

import Product from '../models/product.model.js'
import cloudinary from '../config/cloudinary.js'

export const get_products = async (req, res, next) => {
    try {

        const { search , page = 1, limit = 12 } = req.query

        const FilterData = {}

        const pageNumber = parseInt(page, 10)
        const pageSize = parseInt(limit, 10)

        if(search){
            FilterData.name = { $regex: search, $options: 'i' }
            FilterData.description = { $regex: search, $options: 'i' }
        }

        const products = await Product.find(FilterData).populate('categories', 'name').skip((pageNumber - 1) * pageSize).limit(pageSize)

        const totalProducts = await Product.countDocuments(FilterData)

        return res.json({
            success: true,
            message: 'Products retrieved',
            data: {
                data: products,
                hasNextPage: pageNumber * pageSize < totalProducts
            }
        })

    } catch (error) {
        next(error)
    }
}

export const get_product = async (req, res, next) => {
    try {

        const { productId } = req.params

        const product = await Product.findById(productId).populate('categories', 'name')

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found'
            })
        }

        return res.json({
            success: true,
            message: 'Product retrieved',
            data: product
        })

    } catch (error) {
        next(error)
    }
}

export const create_product = async (req, res, next) => {
    try {

        const { name, description, price, categories } = req.body
        const images = req.files

        if (!name || name.length <= 5 || name.length > 157) {
            return res.status(400).json({
                success: false,
                message: 'Product name must be between 6 and 156 characters'
            })
        }

        if (!description || description.length < 21) {
            return res.status(400).json({
                success: false,
                message: 'Product name must be 20 characters or above'
            })
        }

        if (!price || price.length < !6) {
            return res.status(400).json({
                success: false,
                message: 'Minimum price is 5 rupees'
            })
        }

        if (!categories) {
            return res.status(400).json({
                success: false,
                message: 'Minimum one category required'
            })
        }

        if (!images || images.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'At least one image is required'
            });
        }

        const imageUrls = []
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i].path, { folder: 'products' })
            imageUrls.push(result.secure_url)

            fs.unlink(req.files[i].path, (error) => {
                if (error) console.error(`Failed to delete ${req.files[i].path}:`, error);
                else console.log(`Deleted ${req.files[i].path}`);
            });
        }

        const product = new Product({
            name,
            description,
            categories: categories.toString().split(','),
            price: Number(price),
            images: imageUrls,
        })

        await product.save()

        return res.json({
            success: true,
            message: 'CREATE product',
            data: product
        })

    } catch (error) {
        next(error)
    }
}

export const update_product = async (req, res, next) => {
    try{
        const { name, description, price, categories } = req.body
        const { productId } = req.params

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID required'
            })
        }

        if (!name || name.length <= 5 || name.length > 157) {
            return res.status(400).json({
                success: false,
                message: 'Product name must be between 6 and 156 characters'
            })
        }

        if (!description || description.length < 21) {
            return res.status(400).json({
                success: false,
                message: 'Product name must be 20 characters or above'
            })
        }

        if (!price || price.length < !6) {
            return res.status(400).json({
                success: false,
                message: 'Minimum price is 5 rupees'
            })
        }

        if (!categories) {
            return res.status(400).json({
                success: false,
                message: 'Minimum one category required'
            })
        }

        const product = await Product.findById(productId).populate('categories', 'name')

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found'
            })
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, { name, description, price: Number(price), categories: categories.toString().split(',')})

        return res.json({
            success: true,
            message: 'Product updated',
            data: updatedProduct,
        })
    } catch(error) {
        next(error)
    }
}

export const delete_product = async (req, res, next) => {
    try {

        const { productId } = req.params

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID required'
            })
        }

        const product = await Product.findById(productId).populate('categories', 'name')

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found'
            })
        }

        await Product.findByIdAndDelete(productId)

        return res.json({
            success: true,
            message: 'Product deleted',
            data: product,
        })

    } catch (error) {
        next(error)
    }
}