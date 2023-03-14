const tokenService = require('../Services/token-service')
const ApiError = require('../exeptions/api-error')
module.exports = function(req,res,next) {
    try {
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken) {
            next(ApiError.UnauthorizedError())
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            return next(ApiError.UnauthorizedError())
        }
        req.user = userData;
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}