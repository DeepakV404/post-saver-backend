import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/', userController.list);
userRouter.get('/:id', userController.getById);
userRouter.post('/', userController.create);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.remove);

export default userRouter;
