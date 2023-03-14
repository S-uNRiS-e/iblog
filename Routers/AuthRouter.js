const Router = require('express');
const userController = require('../Controllers/UserController')
const router = new Router()
const {body} = require('express-validator')
router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.post('/logout',userController.logout)


module.exports = router