import userService from '../services/userService.js';
import { CreateUserSchema, UpdateUserSchema } from '../models/User.js';

const userController = {
    async list(req, res, next) {
        try {
            const users = await userService.listUsers();
            res.json(users);
        } catch (err) {
            next(err);
        }
    },

    async getById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (err) {
            next(err);
        }
    },

    async create(req, res, next) {
        try {
            const payload = CreateUserSchema.parse(req.body);
            const existing = await userService.getUserByEmail(payload.email);
            if (existing) return res.status(409).json({ message: 'Email already in use' });
            const user = await userService.createUser(payload);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    },

    async update(req, res, next) {
        try {
            UpdateUserSchema.parse(req.body);
            const user = await userService.updateUser(req.params.id, req.body);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (err) {
            next(err);
        }
    },

    async remove(req, res, next) {
        try {
            const ok = await userService.deleteUser(req.params.id);
            if (!ok) return res.status(404).json({ message: 'User not found' });
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
};

export default userController;
