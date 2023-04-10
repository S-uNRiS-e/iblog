const { model, Schema } = require('mongoose')

const FavoriteSchema = new Schema({
    userId: {type:Schema.Types.ObjectId, unique: false},
    newsId:{type:Schema.Types.ObjectId, unique: false}
})


module.exports = model('Favorite', FavoriteSchema)
