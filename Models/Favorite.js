const { model, Schema } = require('mongoose')

const FavoriteSchema = new Schema({
    userId: {type:Schema.Types.ObjectId,ref:'User'},
    post:{type:Array,ref:'Post',unique:true},
})


module.exports = model('Favorite', FavoriteSchema)
