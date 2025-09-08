import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string().uuid().optional(),
    email: z.string().email(),
    password_hash: z.string().min(60).max(100).nullable().optional(),
    display_name: z.string().max(150).optional(),
    avatar_url: z.string().url().optional().or(z.literal('')),
    role: z.enum(['user', 'admin']).default('user').optional(),
    status: z.enum(['active', 'disabled']).default('active').optional(),
    provider: z.enum(['password', 'google', 'github']).default('password').optional(),
    provider_id: z.string().optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional(),
    last_login_at: z.coerce.date().optional()
});

export const CreateUserSchema = UserSchema.omit({
    id: true,
    created_at: true,
    updated_at: true,
    last_login_at: true
}).extend({
    // For password flow, password_hash may be provided now or later (OAuth)
    email: z.string().email(),
});

export const UpdateUserSchema = z.object({
    email: z.string().email().optional(),
    password_hash: z.string().min(60).max(100).nullable().optional(),
    display_name: z.string().max(150).optional(),
    avatar_url: z.string().url().optional().or(z.literal('')),
    role: z.enum(['user', 'admin']).optional(),
    status: z.enum(['active', 'disabled']).optional(),
    provider: z.enum(['password', 'google', 'github']).optional(),
    provider_id: z.string().optional()
});

export class User {
    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.password_hash = data.password_hash ?? null;
        this.display_name = data.display_name;
        this.avatar_url = data.avatar_url;
        this.role = data.role ?? 'user';
        this.status = data.status ?? 'active';
        this.provider = data.provider ?? 'password';
        this.provider_id = data.provider_id;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.last_login_at = data.last_login_at;
    }

    static validate(data) {
        return UserSchema.parse(data);
    }

    static validateCreate(data) {
        return CreateUserSchema.parse(data);
    }

    static validateUpdate(data) {
        return UpdateUserSchema.parse(data);
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            display_name: this.display_name,
            avatar_url: this.avatar_url,
            role: this.role,
            status: this.status,
            provider: this.provider,
            provider_id: this.provider_id,
            created_at: this.created_at,
            updated_at: this.updated_at,
            last_login_at: this.last_login_at
        };
    }
}

export default User;


