const PostModel = require('../Models/Post.js');
const UserModel = require('../Models/User.js');
const FavoriteModel = require('../Models/Favorite.js');
class BlogService {
    async getAllPosts() {
        try {
            const posts = await PostModel.find()
            return posts.reverse();
        } catch (error) {
            console.log(error);
        }
    }
    async createPost(payload) {
        const { postName, postDescription, background, userId, imageSrc, author } = payload
        const post = new PostModel({
            postName,
            postDescription,
            background,
            imageSrc,
            createDate: new Date().toISOString(),
            userId,
            author
        })
        try {
            await post.save()
            return post
        } catch (error) {
            console.log(error);
        }
    }
    async addToFavorite(payload) {
        const {post,userId} = payload;

        const favorite = await new FavoriteModel({
            post,
            userId
        })
        try {
            await favorite.save()
            return favorite;
        } catch (error) {
            return error
        }
    }
    async getUserPosts(userId) {
        try {
            const userPosts = await PostModel.find({ userId })
            return userPosts
        } catch (error) {
            console.log(error);
        }
    }
    async getUserFavPosts(userId) {
        try {
            const userPosts = await FavoriteModel.find({userId})
            return {favorites:userPosts}
        } catch (error) {
            console.log(error);
        }
    }
    async getPostByPostId(postId) {
        try {
            const post = await PostModel.find({ _id: postId })
            return post
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new BlogService();