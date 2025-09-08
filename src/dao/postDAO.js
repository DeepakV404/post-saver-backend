import pool from '../config/database.js';

class PostDAO {
    // Get all posts from database
    async findAll() {
        const query = 'SELECT * FROM posts ORDER BY created_at DESC';
        const result = await pool.query(query);
        return result.rows;
    }

    // Get post by ID
    async findById(id) {
        const query = 'SELECT * FROM posts WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    // Create new post
    async create(postData) {
        const { user_id, title, content, author } = postData;
        const query = `
            INSERT INTO posts (user_id, title, content, author) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *
        `;
        const result = await pool.query(query, [user_id, title, content, author]);
        return result.rows[0];
    }

    // Update post by ID
    async update(id, updateData) {
        const { user_id, title, content, author } = updateData;
        const query = `
            UPDATE posts 
            SET user_id = COALESCE($1, user_id), title = $2, content = $3, author = $4, updated_at = CURRENT_TIMESTAMP
            WHERE id = $5 
            RETURNING *
        `;
        const result = await pool.query(query, [user_id, title, content, author, id]);
        return result.rows[0] || null;
    }

    // Delete post by ID
    async delete(id) {
        const query = 'DELETE FROM posts WHERE id = $1 RETURNING id';
        const result = await pool.query(query, [id]);
        return result.rows.length > 0;
    }

    // Get posts by author
    async findByAuthor(author) {
        const query = 'SELECT * FROM posts WHERE author = $1 ORDER BY created_at DESC';
        const result = await pool.query(query, [author]);
        return result.rows;
    }

    async findByUserId(user_id) {
        const query = 'SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC';
        const result = await pool.query(query, [user_id]);
        return result.rows;
    }

    // Get posts count
    async count() {
        const query = 'SELECT COUNT(*) FROM posts';
        const result = await pool.query(query);
        return parseInt(result.rows[0].count);
    }
}

export default new PostDAO();
