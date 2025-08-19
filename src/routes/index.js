const express = require('express');
const router = express.Router();

// Import route modules
const postRoutes = require('./posts');
const userRoutes = require('./users');

// Health check route
router.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Post Saver Backend API',
        version: '1.0.0'
    });
});

// Route modules
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;
