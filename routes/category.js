import express from 'express'
const router = express.Router()

import  {obtainAll, createCategory, findCategoryById, addProductToCategory, deleteCategory} from '../controllers/controll_category.js'

router.get('/', obtainAll)
router.post('/', createCategory)
router.get('/:id', findCategoryById)
router.put('/:id', addProductToCategory)
router.delete('/:id', deleteCategory)


export default router