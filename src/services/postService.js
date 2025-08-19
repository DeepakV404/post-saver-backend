// Mock data for demonstration - replace with actual database operations
let posts = [
    {
        id: 1,
        title: "Sample Post 1",
        content: "This is a sample post content",
        author: "John Doe",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        title: "Sample Post 2",
        content: "This is another sample post content",
        author: "Jane Smith",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

const postService = {
    async getAllPosts() {
        // TODO: Replace with actual database query
        return posts;
    },

    async getPostById(id) {
        // TODO: Replace with actual database query
        const postId = parseInt(id);
        return posts.find(post => post.id === postId);
    },

    async createPost(postData) {
        // TODO: Add validation using Zod
        // TODO: Replace with actual database insert
        const newPost = {
            id: posts.length + 1,
            ...postData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        posts.push(newPost);
        return newPost;
    },

    async updatePost(id, updateData) {
        // TODO: Add validation using Zod
        // TODO: Replace with actual database update
        const postId = parseInt(id);
        const postIndex = posts.findIndex(post => post.id === postId);
        
        if (postIndex === -1) {
            return null;
        }
        
        posts[postIndex] = {
            ...posts[postIndex],
            ...updateData,
            updatedAt: new Date().toISOString()
        };
        
        return posts[postIndex];
    },

    async deletePost(id) {
        // TODO: Replace with actual database delete
        const postId = parseInt(id);
        const postIndex = posts.findIndex(post => post.id === postId);
        
        if (postIndex === -1) {
            return false;
        }
        
        posts.splice(postIndex, 1);
        return true;
    }
};

module.exports = postService;
