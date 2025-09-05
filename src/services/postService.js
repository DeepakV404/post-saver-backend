import postDAO from '../dao/postDAO.js';

const postService = {

    async getAllPosts() {
        try {
            const posts = await postDAO.findAll();
            return posts;
        } catch (error) {
            console.error('Error fetching posts:', error);
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
            console.error('Error fetching post:', error);
            throw error;
        }
    },

    async createPost(postData) {
        try {
            // Business logic: validate required fields
            if (!postData.title || !postData.content || !postData.author) {
                throw new Error('Title, content, and author are required');
            }
            
            const newPost = await postDAO.create(postData);
            return newPost;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    },

    async updatePost(postId, updateData) {
        try {
            // Business logic: check if post exists
            const existingPost = await postDAO.findById(postId);
            if (!existingPost) {
                throw new Error('Post not found');
            }

            const updatedPost = await postDAO.update(postId, updateData);
            return updatedPost;
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    },

    async deletePost(postId) {
        try {
            // Business logic: check if post exists
            const existingPost = await postDAO.findById(postId);
            if (!existingPost) {
                throw new Error('Post not found');
            }

            const deleted = await postDAO.delete(postId);
            return deleted;
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    }
};

export default postService;
