const PostModel = require('../Models/Post.js');
const ApiError = require('../exeptions/api-error')
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
        const { userId, newsId, post } = payload;
        const favorite = await FavoriteModel.findOne({ userId, newsId,post });
        if (favorite) {
            throw ApiError.BadRequestError('This news already added to favorites');
        }
        try {
            const newFavorite = new FavoriteModel({ userId, newsId, post });
            await newFavorite.save();
            return newFavorite;
            
        } catch (error) {
            console.log(error);
        }
    }
    async removeFavoritePost(payload) {
        const { userId, newsId} = payload;

        const favorite = await FavoriteModel.findOne({ userId, newsId });
        if (favorite) {
            try {
                await FavoriteModel.deleteOne({ newsId });
                return 'Success'
            } catch (error) {
                console.log(error);
            }
        } else {
            throw ApiError.BadRequestError("Can't remove");
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
    async getFavPostById(payload) {
        try {
            const favorite = await FavoriteModel.findOne(payload);
            return favorite
        } catch (error) {
            
        }
    }
    async getPostBySearchTerm(name) {
        try {
            const post = await PostModel.find({ postName: { $regex: name, $options: 'i' } })
            return post
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