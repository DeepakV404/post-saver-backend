import express from 'express';
import postController from '../controllers/postController.js';

const postRouter = express.Router();

// GET /api/posts - Get all posts
postRouter.get('/', postController.getAllPosts);

// GET /api/posts/:id - Get post by ID
postRouter.get('/:id', postController.getPostById);

// POST /api/posts - Create new post
postRouter.post('/', postController.createPost);

// PUT /api/posts/:id - Update post
postRouter.put('/:id', postController.updatePost);

// DELETE /api/posts/:id - Delete post
postRouter.delete('/:id', postController.deletePost);

export default postRouter;
