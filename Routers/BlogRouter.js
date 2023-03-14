const Router = require('express');
const blogController = require('../Controllers/BlogController')
const router = new Router();
const authMiddleware = require('../middleware/auth-middleware')
router.post('/create', authMiddleware,blogController.createPost)


module.exports = router;