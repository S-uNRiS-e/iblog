const UserModel = require('../Models/User.js')
const PostModel = require('../Models/Post.js')
const UserService = require('../Services/user-service')
const ApiError = require('../exeptions/api-error')
class BlogService {
    async getAllPosts() {
        try {
            const posts = await PostModel.find()
            return posts
        } catch (error) {
            console.log(error);
        }
    }
    async createPost(payload) {
        const { postName, postDescription, background, userId } = payload
        const post = new PostModel({
            postName,
            postDescription,
            background,
            userId
        })
        try {
            await post.save()
            return post
        } catch (error) {
            console.log(error);
        }
    }
    async getUserPosts(userId) {
        try {
            const userPosts = await PostModel.find({userId})
            return userPosts
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new BlogService();