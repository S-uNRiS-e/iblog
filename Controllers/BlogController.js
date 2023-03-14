const PostModel = require('../Models/Post.js');
class BlogController {
    async getUserPosts(req,res) {
        const posts = await postModel.find({user:req.user.id});
        res.status(200).json(posts);
    }
    async createPost(req,res) {
        const post = new PostModel({
            name: req.body.name,
            background: req.body.background,
            user:req.user._id
        })
        try {
            await post.save()
            res.status(201).json(post)  
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}
module.exports = new BlogController()