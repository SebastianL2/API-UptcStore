import express from 'express'
const router = express.Router()

import { deleteGalery, findById, saveGalery } from '../controllers/controll_galery.js'

router.post('/',saveGalery)
router.get('/:id',findById)
router.delete('/:id', deleteGalery)

export default router