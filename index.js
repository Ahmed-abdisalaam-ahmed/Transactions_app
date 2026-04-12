dotenv.config()
import express from 'express'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import uploadRoutes from './routes/upload.js'
import transactionRouter from './routes/transaction.js'
import dotenv from 'dotenv'

const app = express()

import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import logger from './middlewares/logger.js'
import notFound from './middlewares/notFound.js'
import errorHandle from './middlewares/errorHandle.js'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './utils/swagger.js'
import helmet from 'helmet'
import { limiter } from './middlewares/rateLimits.js'


const PORT = process.env.PORT || 5000


// middleware 
app.use(express.json())

app.use(cors(
    {
        origin: ["dugsiiye.com", "shihabi.com"]
    }
))
if(process.env.NODE_ENV == "development"){
    app.use(morgan('dev'))
}
// swaager
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 
app.use(helmet())
// custom middleware
app.use(logger)
// limits REquest
app.use(limiter)
// Routes middleware
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/transactions', transactionRouter)
app.use('/upload', uploadRoutes)

// Read 
// Corrected:
app.get('/', (req, res) => { 
    res.json("API is Running")
})

// error midddleware 
app.use(notFound)
app.use(errorHandle)

// connect mongodb
const connectionString = process.env.NODE_ENV === "development" 
    ? process.env.MONGO_URI_DEV 
    : process.env.MONGO_URI_PRO;

// Log which environment we are in (Check your Render logs for this!)
console.log(`Attempting to connect in ${process.env.NODE_ENV} mode...`);

if (!connectionString) {
    console.error("❌ ERROR: Connection string is undefined. Check your Environment Variables!");
}

mongoose.connect(connectionString)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
        app.listen(PORT, () => {
            console.log(`🚀 Server is Running on Port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Connection Error:", err.message);
    });
