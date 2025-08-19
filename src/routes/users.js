import express from 'express';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

// GET /api/users - Get all users
userRouter.get('/', userController.getAllUsers);

// GET /api/users/:id - Get user by ID
userRouter.get('/:id', userController.getUserById);

// POST /api/users - Create new user
userRouter.post('/', userController.createUser);

// PUT /api/users/:id - Update user
userRouter.put('/:id', userController.updateUser);

// DELETE /api/users/:id - Delete user
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;
