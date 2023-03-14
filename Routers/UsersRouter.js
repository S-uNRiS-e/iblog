const Router = require('express');
const userController = require('../Controllers/UserController')
const router = new Router()
const authMiddleware = require('../middleware/auth-middleware')
router.get('/users',authMiddleware,userController.getUsers)

module.exports = router