const postService = require('../Services/blog-service')
const UserService = require('../Services/user-service')

class BlogController {
    async getAllPosts(req,res) {
        const posts = await await postService.getAllPosts()
        res.status(200).json(posts);
    }
    async createPost(req,res,next) {
        try {
            const author = await UserService.findUserByUserId(req.user.id)
            const payload = {
                postName:req.body.postName,
                postDescription:req.body.postDescription,
                userId:req.user.id,
                imageSrc:req.file ? req.file.path : '',
                author
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
                    createdDate:item.createDate
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
                    createdDate:item.createDate
                }
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
            
        }
    }
    async getFavPosts(req,res,next) {
        try {
            const userId = req.user.id
            const favorites = await postService.getUserFavPosts(userId)
            res.status(200).json(favorites)
        } catch (error) {
            next(error)
        }
    } 
    async addToFavorite(req,res,next) {
        try {
            const post = await postService.getPostByPostId(req.params.postId)
            const userId = req.user.id
            const payload = {
                post,
                userId
            }
            const favorite = await postService.addToFavorite(payload)
            res.status(200).json(favorite)
        } catch (error) {
            next(error)
        }
    }
    async getPostById(req,res,next) {
        try {
            const postId = req.params.postId
            const post = await postService.getPostByPostId(postId)
            const result = post.map(item => {
                return {
                    postId:item._id,
                    postName:item.postName,
                    postDescription:item.postDescription,
                    background:item.background,
                    createdDate:item.createDate
                }
            })
            res.json(result)
            
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new BlogController()