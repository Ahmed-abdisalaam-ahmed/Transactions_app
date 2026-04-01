import express from 'express'
import { protect }  from '../middlewares/auth.js'
import { authorize } from '../middlewares/authorize.js'

const router = express.Router()

// Protect router
router.get('/dashboard', protect, authorize('admin'), (req, res) =>{
    res.json(`wellcome to dashboard ${req.user.name}`)
})

export default router;