import pool from '../config/database.js';

const postService = {

    async getAllPosts() {
        try {
            const query = 'SELECT * FROM posts ORDER BY created_at DESC';
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw new Error('Failed to fetch posts');
        }
    },

    async getPostById(postId) {
        // TODO: get the post by Id and return the post
        return {};
    },

    async createPost(postData) {
        // TODO: create a new post and return the created post
        
        return {}
    },

    async updatePost(postId, updateData) {
        // TODO: update post with updateData and return the updated post
        return {};
    },

    async deletePost(postId) {
        // TODO: delete the post and return success status
        return true;
    }
};

export default postService;
