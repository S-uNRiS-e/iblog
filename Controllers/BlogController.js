const postService = require('../Services/blog-service')
const UserService = require('../Services/user-service')


class BlogController {
    async getAllPosts(req, res) {
        const posts = await await postService.getAllPosts()
        res.status(200).json(posts);
    }
    async createPost(req, res, next) {
        try {
            const author = await UserService.findUserByUserId(req.user.id)
            const payload = {
                postName: req.body.postName,
                postDescription: req.body.postDescription,
                userId: req.user.id,
                imageSrc: req.file ? req.file.path : '',
                author
            }
            const post = await postService.createPost(payload)
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }
    async getUserPostsById(req, res, next) {
        try {
            const userId = req.params.userId
            const posts = await postService.getUserPosts(userId)
            const result = posts.map(item => {
                return {
                    postId: item._id,
                    postName: item.postName,
                    postDescription: item.postDescription,
                    background: item.background,
                    createdDate: item.createDate
                }
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async getUserPosts(req, res, next) {
        try {
            const userId = req.user.id
            const posts = await postService.getUserPosts(userId)
            const result = posts.map(item => {
                return {
                    postId: item._id,
                    postName: item.postName,
                    postDescription: item.postDescription,
                    background: item.background,
                    createdDate: item.createDate
                }
            })
            res.status(200).json(result)
        } catch (error) {
            next(error)

        }
    }
    async getFavPosts(req, res, next) {
        try {
            const userId = req.user.id
            const favorites = await postService.getUserFavPosts(userId)
            res.status(200).json(favorites)
        } catch (error) {
            next(error)
        }
    }
    async addToFavorite(req, res, next) {
        try {
            const { newsId } = req.body;
            const userId = req.user.id;
            const newFavorite = await postService.addToFavorite({ userId, newsId });
            res.status(200).json(newFavorite)
        } catch (error) {
            next(error)
        }
    }
    async searchPost(req,res,next) {
        const name = req.params.name;
        console.log('name',name);
        try {
            const post = await postService.getPostBySearchTerm(name);
            res.json(post);
        } catch (error) {
            next(error)
        }
    }
    async getPostById(req, res, next) {
        try {
            const newsId = req.params.postId
            const userId = req.user.id
            const findedPost = await postService.getPostByPostId(newsId)
            const favorite = await postService.getFavPostById({ userId, newsId });
    
            res.json({data:findedPost,fav:!!Object.keys(favorite || []).length || false})

        } catch (error) {
            next(error)
        }
    }
}
module.exports = new BlogController()