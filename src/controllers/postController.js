import postService from '../services/postService.js';

const postController = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await postService.getAllPosts();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch posts' });
        }
    },
    getPostById: async (req, res) => {
        const postId = req.params.id;
        if (!postId) {
            return res.status(400).json({ error: 'Post ID is required' });
        }
        try {
            const post = await postService.getPostById(postId)
            res.json(post);
        } catch(error) {
            res.status(500).json({ error: `Failed to fetch post with ${postId}`})
        }
    },
    createPost: async (req, res) => {
        try {
            const post = await postService.createPost(req.body);
            res.status(201).json(post);
        } catch(error) {
            res.status(500).json({ error: 'Failed to create post' });
        }
    },
    updatePost: async (req, res) => {
        const postId = req.params.id;
        if (!postId) {
            return res.status(400).json({ error: 'Post ID is required' });
        }
        try {
            const updatedPost = await postService.updatePost(postId, req.body);
            res.json(updatedPost);
        } catch(error) {
            res.status(500).json({ error: 'Failed to update post' });
        }
    },
    deletePost: async (req, res) => {
        const postId = req.params.id;
        if (!postId) {
            return res.status(400).json({ error: 'Post ID is required' });
        }
        try {
            await postService.deletePost(postId);
            res.status(204).send();
        } catch(error) {
            res.status(500).json({ error: 'Failed to delete post' });
        }
    },
};

export default postController
