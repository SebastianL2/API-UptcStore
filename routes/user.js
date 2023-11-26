import express from 'express'
import {obtainAllUsers, saveUser, findUserById, deleteUser, loginUser, updatePassword, sendMailRecoveryPass, updateUser,loginAdminSeller} from '../controllers/controll_user.js'
const router = express.Router()



router.get('/', obtainAllUsers)
router.post('/', saveUser)
router.get('/:id', findUserById)
router.delete('/:id', deleteUser)
router.post('/login', loginUser)  
router.post('/login2', loginAdminSeller)  
router.post('/updatePassword', updatePassword)  
router.post('/sendEmail/:email', sendMailRecoveryPass)
router.put('/:id', updateUser)

export default router