const { model, Schema } = require('mongoose')

const FavoriteSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, unique: false},
    newsId: {type:Schema.Types.ObjectId, unique: false},
    post:{type:Object, ref:'Post'},
})


module.exports = model('Favorite', FavoriteSchema)
