import { z } from 'zod';

// Post data validation schema
export const PostSchema = z.object({
    id: z.number().optional(), // Optional for creation, required for responses
    title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
    content: z.string().min(1, "Content is required"),
    author: z.string().min(1, "Author is required").max(100, "Author must be less than 100 characters"),
    created_at: z.string().datetime().optional(), // Auto-generated
    updated_at: z.string().datetime().optional()  // Auto-generated
});

// Post creation schema (without id and timestamps)
export const CreatePostSchema = PostSchema.omit({ 
    id: true, 
    created_at: true, 
    updated_at: true 
});

// Post update schema (all fields optional except id)
export const UpdatePostSchema = z.object({
    title: z.string().min(1).max(255).optional(),
    content: z.string().min(1).optional(),
    author: z.string().min(1).max(100).optional()
});

// Post model class
export class Post {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
        this.author = data.author;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    // Validate post data
    static validate(data) {
        return PostSchema.parse(data);
    }

    // Validate post creation data
    static validateCreate(data) {
        return CreatePostSchema.parse(data);
    }

    // Validate post update data
    static validateUpdate(data) {
        return UpdatePostSchema.parse(data);
    }

    // Convert to plain object
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            author: this.author,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

export default Post;
