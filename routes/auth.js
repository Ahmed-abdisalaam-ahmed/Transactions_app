import express from 'express'
import {register, login} from '../controllers/auth.js'
import {protect}  from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', register)
router.get('/login', login)

// Protect router
router.get('/protect', protect, (req, res) => {
    console.log("req.user",req.user)
    res.json({ 
        message: "Access Granted",
        user: req.user 
    });
})

export default router;