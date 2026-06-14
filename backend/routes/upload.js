import express from 'express';
import { protect } from '../middlewares/auth.js'
import {upload}  from '../middlewares/upload.js';
import { uploadFile } from '../controllers/uploadControllers.js';

const router = express.Router();

router.post('/profile_image', protect, upload.single('file'), uploadFile)

export default router