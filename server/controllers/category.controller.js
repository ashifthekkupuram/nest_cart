import Category from '../models/category.model.js'

export const get_categories = async (req, res, next) => {
    try{

        const categories = await Category.find()

        return res.json({
            success: true,
            message: 'Categories retrieved',
            categories
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const get_category = async (req, res, next) => {
    try{

        const { categoryId } = req.params

        if(!categoryId){
            return res.status(400).json({
                success: false,
                message: 'Category ID required'
            })
        }

        const category = await Category.findById(categoryId)

        if(!category){
            return res.status(400).json({
                success: false,
                message: 'Category not found'
            })
        }

        return res.json({
            success: true,
            message: 'Category retrieved',
            category
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const create_category = async (req, res, next) => {
    try{

        const { name } = req.body
        
        if(!name || name.length < 3 ){
            return res.status(400).json({
                success: false,
                message: 'Category name length must be 4 or above'
            })
        }

        const category = new Category({ name: name.toLowerCase() })

        await category.save()

        return res.json({
            success: true,
            message: 'Category created',
            category,
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const update_category = async (req, res, next) => {
    try{

        const { name } = req.body
        const { categoryId } = req.params
        
        if(!name || name.length < 3 ){
            return res.status(400).json({
                success: false,
                message: 'Category name length must be 3 or above'
            })
        }

        if(!categoryId){
            return res.status(400).json({
                success: false,
                message: 'Category ID required'
            })
        }

        const category = await Category.findById(categoryId)

        if(!category){
            return res.status(400).json({
                success: false,
                message: 'Category not found'
            })
        }

        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name: name.toLowerCase() }, { new: true })

        return res.json({
            success: true,
            message: 'Category updated',
            category: updatedCategory,
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const delete_category = async (req, res, next) => {
    try{

        const { categoryId } = req.params

        if(!categoryId){
            return res.status(400).json({
                success: false,
                message: 'Category ID required'
            })
        }

        const category = await Category.findById(categoryId)

        if(!category){
            return res.status(400).json({
                success: false,
                message: 'Category not found'
            })
        }

        await Category.findByIdAndDelete(categoryId)

        return res.json({
            success: true,
            message: 'Category deleted',
            category,
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}