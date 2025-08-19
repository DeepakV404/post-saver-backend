import express from 'express';
import postRouter from './posts.js';
import userRouter from './users.js';

const router = express.Router();

// Health check route
router.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Post Saver Backend API',
        version: '1.0.0'
    });
});

// Route modules
router.use('/posts', postRouter);
router.use('/users', userRouter);

export default router;
