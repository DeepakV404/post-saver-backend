import { z } from 'zod';

// Author data validation schema
export const AuthorSchema = z.object({
    id: z.number().optional(),
    first_name: z.string().min(1, "First name is required").max(100, "First name must be less than 100 characters"),
    last_name: z.string().min(1, "Last name is required").max(100, "Last name must be less than 100 characters"),
    account_name: z.string().min(1, "Account name is required").max(100, "Account name must be less than 100 characters"),
    description: z.string().optional(),
    thumbnail_url: z.string().url().optional().or(z.literal('')),
    role: z.string().max(200, "Role must be less than 200 characters").optional(),
    current_company: z.string().max(200, "Company must be less than 200 characters").optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional()
});

// Author creation schema (without id and timestamps)
export const CreateAuthorSchema = AuthorSchema.omit({ 
    id: true, 
    created_at: true, 
    updated_at: true 
});

// Author update schema (all fields optional)
export const UpdateAuthorSchema = z.object({
    first_name: z.string().min(1).max(100).optional(),
    last_name: z.string().min(1).max(100).optional(),
    account_name: z.string().min(1).max(100).optional(),
    description: z.string().optional(),
    thumbnail_url: z.string().url().optional().or(z.literal('')),
    role: z.string().max(200).optional(),
    current_company: z.string().max(200).optional()
});

// Author model class
export class Author {
    constructor(data) {
        this.id = data.id;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.account_name = data.account_name;
        this.description = data.description;
        this.thumbnail_url = data.thumbnail_url;
        this.role = data.role;
        this.current_company = data.current_company;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    // Get full name
    get fullName() {
        return `${this.first_name} ${this.last_name}`;
    }

    // Validate author data
    static validate(data) {
        return AuthorSchema.parse(data);
    }

    // Validate author creation data
    static validateCreate(data) {
        return CreateAuthorSchema.parse(data);
    }

    // Validate author update data
    static validateUpdate(data) {
        return UpdateAuthorSchema.parse(data);
    }

    // Convert to plain object
    toJSON() {
        return {
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            account_name: this.account_name,
            description: this.description,
            thumbnail_url: this.thumbnail_url,
            role: this.role,
            current_company: this.current_company,
            full_name: this.fullName,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

export default Author;
