const Router = require('express');
const blogController = require('../Controllers/BlogController')
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware')
const upload = require('../middleware/upload')


router.post('/favorites',authMiddleware,blogController.addToFavorite)
router.post('/dislike',authMiddleware,blogController.removeFavorite)
router.post('/search',authMiddleware,blogController.searchPost)
router.post('/create',upload.single('files'),authMiddleware,blogController.createPost)

router.get('/favorites', authMiddleware,blogController.getFavPosts)
router.get('/posts', authMiddleware,blogController.getAllPosts)
router.get('/user-posts', authMiddleware,blogController.getUserPosts)
router.get('/user-favorites', authMiddleware,blogController.getFavPosts)
router.get('/user-posts/:userId',authMiddleware,blogController.getUserPostsById)
router.get('/post/:postId', authMiddleware,blogController.getPostById)


module.exports = router;