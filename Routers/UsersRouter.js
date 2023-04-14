const Router = require('express');
const userController = require('../Controllers/UserController')
const router = new Router()
const authMiddleware = require('../middleware/auth-middleware')
const upload = require('../middleware/upload')
router.get('/users',authMiddleware,userController.getUsers);
router.get('/user-info',authMiddleware,userController.getUserInfo);
router.get('/user/:userId',authMiddleware,userController.getUserByUserId);

router.post('/upload-avatar', upload.single('avatar'),authMiddleware, userController.uploadAvatar)

module.exports = router