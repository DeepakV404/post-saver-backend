import express from 'express';
import postController from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/', postController.getAllPosts);

postRouter.get('/:id', postController.getPostById);

postRouter.post('/', postController.createPost);

postRouter.put('/:id', postController.updatePost);

postRouter.delete('/:id', postController.deletePost);

export default postRouter;
