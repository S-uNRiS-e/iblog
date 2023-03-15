const userService = require('../Services/user-service')
class UserController {
    async registration(req,res,next) {
        try {
            const {username,password} = req.body
            const userData = await userService.registration(username,password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30 * 24 * 60 * 60 * 1000,httpOnly:true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
    async login(req,res,next) {
        try {
            const {username,password} = req.body
            const userData = await userService.login(username,password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30 * 24 * 60 * 60 * 1000,httpOnly:true})
            return res.json(userData)
        } catch (error) {
            next(error)
            
        }
    }
    async logout(req,res,next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200).json({message:"Successfully logged out", token})
        } catch (error) {
            next(error)
            
        }
    }
    async getUsers(req,res,next) {
        try {
            const users = await userService.getAllUsers()
            return res.status(200).json({users})
            
        } catch (error) {
            next(error)
        }
    }
    async getUserByUserId(req,res,next) {
        try {
            const userId = req.params.userId
            const user = await userService.findUserByUserId(userId)
            return res.status(200).json({user})
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController()