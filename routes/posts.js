const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// GET /api/posts - Get all posts
router.get('/', postController.getAllPosts);

// GET /api/posts/:id - Get post by ID
router.get('/:id', postController.getPostById);

// POST /api/posts - Create new post
router.post('/', postController.createPost);

// PUT /api/posts/:id - Update post
router.put('/:id', postController.updatePost);

// DELETE /api/posts/:id - Delete post
router.delete('/:id', postController.deletePost);

module.exports = router;
