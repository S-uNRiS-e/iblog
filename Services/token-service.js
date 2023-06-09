const jwt = require('jsonwebtoken');
const TokenModel = require('../Models/Token')
class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET, {expiresIn:'24h'})
        const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    validateAccessToken(token) {
        try {
            const userDate = jwt.verify(token,process.env.JWT_ACCESS_SECRET)
            return userDate
        } catch (error) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userDate = jwt.verify(token,process.env.JWT_REFRESH_SECRET)
            return userDate
        } catch (error) {
            return null;
            
        }
    }
   
    async saveToken(userId,refreshToken) {
        const tokenData = await TokenModel.findOne({user:userId})
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({user:userId,refreshToken})
        return token;
    }
    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({refreshToken})
        return tokenData
    }
}

module.exports = new TokenService()