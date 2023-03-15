const UserModel = require('../Models/User.js')
const bcryptjs = require('bcryptjs')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exeptions/api-error')
class UserService {
    async registration(username, password) {
        try {
            const candidate = await UserModel.findOne({username})
            if(candidate) {
                throw ApiError.BadRequestError(`The user ${username} already exists`)
            }
            const hashPassword = await bcryptjs.hashSync(password,3)
            const user = await UserModel.create({username,password:hashPassword})
            const userDto = new UserDto(user)
            const tokens = tokenService.generateToken({...userDto})
            await tokenService.saveToken(userDto.id,tokens.refreshToken)
            return {
                ...tokens,
                user: userDto
            }

        } catch (error) {
            console.log(error);
        }
    }
    async login(username, password) {
        const user = await UserModel.findOne({username})
        if(!user) {
            throw ApiError.BadRequestError('User not found');
        }
        const isPasswordEquals = await bcryptjs.compare(password, user.password);
        if(!isPasswordEquals) {
            throw ApiError.BadRequestError('Wrong password');
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id,tokens.refreshToken)
        return {
            ...tokens,
            user: userDto
        }
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async getAllUsers() {
        const users = await UserModel.find();
        console.log(users);
        return users.map(item => {
            return {
                username:item.username,
                userId:item._id
            }
        })
    }
    async findUserByUserId(userId) {
        const user = await UserModel.findById({_id:userId});
        return {
            username:user.username,
            userId:user._id
        }
    }
    
}

module.exports = new UserService();