dotenv.config()
import express from 'express'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import dotenv from 'dotenv'

const app = express()

import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import logger from './middlewares/logger.js'
import notFound from './middlewares/notFound.js'
import errorHandle from './middlewares/ErrorHandle.js'


const PORT = process.env.PORT || 5000


// middleware 
app.use(express.json())

app.use(cors(
    {
        origin: ["dugsiiye.com", "shihabi.com"]
    }
))
app.use(morgan('dev'))

// custom middleware
app.use(logger)

// Routes middleware
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
// Read 
// Corrected:
app.get('/', (req, res) => { 
    res.json("API is Running")
})

// error midddleware 
app.use(notFound)
app.use(errorHandle)

// connecting the database 
mongoose.connect(process.env.MONGO_URI)
    .then(()=> 
        app.listen(PORT, ()=> {
            console.log(`🚀 Server is Running on Port http//localhost:${PORT}`)
        }),
        console.log("mongoDb is Connnected locally✅"))
    .catch((err)=> console.log(`Error Connection:${err}`))
