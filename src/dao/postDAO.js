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
        const { title, content, author } = postData;
        const query = `
            INSERT INTO posts (title, content, author) 
            VALUES ($1, $2, $3) 
            RETURNING *
        `;
        const result = await pool.query(query, [title, content, author]);
        return result.rows[0];
    }

    // Update post by ID
    async update(id, updateData) {
        const { title, content, author } = updateData;
        const query = `
            UPDATE posts 
            SET title = $1, content = $2, author = $3, updated_at = CURRENT_TIMESTAMP
            WHERE id = $4 
            RETURNING *
        `;
        const result = await pool.query(query, [title, content, author, id]);
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

    // Get posts count
    async count() {
        const query = 'SELECT COUNT(*) FROM posts';
        const result = await pool.query(query);
        return parseInt(result.rows[0].count);
    }
}

export default new PostDAO();
