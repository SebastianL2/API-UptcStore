import Category from '../models/Category.js'


export const obtainAll = async (req, res) => {
    try {
        const dataCategory = await Category.find().populate('products')
        return res.status(200).json({
            "status": true,
            "dataCategory": dataCategory
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}
export const createCategory = async (req, res) => {
    console.log(req.files)
    try {
       
        const categoryJSON = new Category(req.body)
        const dataCategorySave = await categoryJSON.save()
        return res.status(200).json({
            "status": true,
            "dataCategory": dataCategorySave
        })
        
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}
export const findCategoryById = async (req, res) => {
    try {
        const id = req.params.id
        const dataCategory = await Category.findById(id).populate('products')
        return res.status(200).json({
            "status": true,
            "category": dataCategory
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}
export const addProductToCategory = async (req, res) => {
    try {
        const idCategory = req.params.id
        const { idProduct } = req.body
        const Category = await Category.findById(idCategory)
        if (!Category) {
            return res.status(500).json({
                "status": false,
                "message": "Categoria no encontrada"
            })
        }
        Category.products.push(idProduct)
        const updatedCategory = await Category.save()
        return res.status(200).json({
            "status": true,
            "dataCategoryUpdate": updatedCategory
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}
export const deleteCategory = async (req, res) => {
    try {
        const idCategory = req.params.id
        console.log(idCategory);
        const categoryDelete = await Category.findByIdAndDelete(idCategory)
        return res.status(200).json({
            "status": true,
            "deletedCategory": categoryDelete
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}

