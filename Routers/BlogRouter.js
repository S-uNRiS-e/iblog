const Router = require('express');
const blogController = require('../Controllers/BlogController')
const router = new Router({mergeParams: true});
const authMiddleware = require('../middleware/auth-middleware')

router.post('/create', authMiddleware,blogController.createPost)
router.get('/posts', authMiddleware,blogController.getAllPosts)
router.get('/user-posts', authMiddleware,blogController.getUserPosts)
router.get('/user-posts/:userId',authMiddleware,blogController.getUserPostsById)


module.exports = router;