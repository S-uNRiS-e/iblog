const postService = require('../Services/blog-service')
class BlogController {
    async getAllPosts(req,res) {
        const posts = await await postService.getAllPosts()
        res.status(200).json(posts);
    }
    async createPost(req,res,next) {
        try {
            const payload = {
                postName:req.body.postName,
                postDescription:req.body.postDescription,
                background:req.body.background,
                userId:req.user.id
            }
            const post = await postService.createPost(payload)
            res.status(200).json(post)  
        } catch (error) {
            next(error)
        }
    }
    async getUserPostsById(req,res,next) {
        try {
            const userId = req.params.userId
            const posts = await postService.getUserPosts(userId)
            const result = posts.map(item => {
                return {
                    postId:item._id,
                    postName:item.postName,
                    postDescription:item.postDescription,
                    background:item.background,
                }
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async getUserPosts(req,res,next) {
        try {
            const userId = req.user.id
            const posts = await postService.getUserPosts(userId)
            const result = posts.map(item => {
                return {
                    postId:item._id,
                    postName:item.postName,
                    postDescription:item.postDescription,
                    background:item.background,
                }
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
            
        }
    }
    parsePostData(posts) {
        return posts.map(item => {
            return {
                postId:item._id,
                postName:item.postName,
                postDescription:item.postDescription,
                background:item.background,
            }
        })
    }
}
module.exports = new BlogController()