const postService = require('../services/postService');

const postController = {
    async getAllPosts(req, res) {
        try {
            const posts = await postService.getAllPosts();
            res.json({
                success: true,
                data: posts
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    async getPostById(req, res) {
        try {
            const { id } = req.params;
            const post = await postService.getPostById(id);
            
            if (!post) {
                return res.status(404).json({
                    success: false,
                    error: 'Post not found'
                });
            }

            res.json({
                success: true,
                data: post
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    async createPost(req, res) {
        try {
            const postData = req.body;
            const newPost = await postService.createPost(postData);
            
            res.status(201).json({
                success: true,
                data: newPost
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    async updatePost(req, res) {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const updatedPost = await postService.updatePost(id, updateData);
            
            if (!updatedPost) {
                return res.status(404).json({
                    success: false,
                    error: 'Post not found'
                });
            }

            res.json({
                success: true,
                data: updatedPost
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message
            });
        }
    },

    async deletePost(req, res) {
        try {
            const { id } = req.params;
            const deleted = await postService.deletePost(id);
            
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    error: 'Post not found'
                });
            }

            res.json({
                success: true,
                message: 'Post deleted successfully'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};

module.exports = postController;
