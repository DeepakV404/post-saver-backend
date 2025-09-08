import postDAO from '../dao/postDAO.js';

const postService = {

    async getAllPosts() {
        try {
            const posts = await postDAO.findAll();
            return posts;
        } catch (error) {
            throw new Error('Failed to fetch posts');
        }
    },

    async getPostById(postId) {
        try {
            const post = await postDAO.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            return post;
        } catch (error) {
            throw error;
        }
    },

    async createPost(postData) {
        try {
            if (!postData.user_id || !postData.title || !postData.content || !postData.author) {
                throw new Error('user_id, title, content, and author are required');
            }
            
            const newPost = await postDAO.create(postData);
            return newPost;
        } catch (error) {
            throw error;
        }
    },

    async updatePost(postId, updateData) {
        try {
            const existingPost = await postDAO.findById(postId);
            if (!existingPost) {
                throw new Error('Post not found');
            }

            const updatedPost = await postDAO.update(postId, updateData);
            return updatedPost;
        } catch (error) {
            throw error;
        }
    },

    async deletePost(postId) {
        try {
            const existingPost = await postDAO.findById(postId);
            if (!existingPost) {
                throw new Error('Post not found');
            }

            const deleted = await postDAO.delete(postId);
            return deleted;
        } catch (error) {
            throw error;
        }
    }
};

export default postService;
