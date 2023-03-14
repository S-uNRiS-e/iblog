const {model,Schema} = require('mongoose')

const PostSchema = new Schema({
    postName:{
        type:String,
        required:true,
        unique:false
    },
    postDescription:{
        type:String,
        required:true,
        unique:false
    },
    background:{
        type:String,
        required:true,
        unique:false,
        default:''
    },
    userId:{type:Schema.Types.ObjectId,ref:'User'}
})


module.exports = model('Post',PostSchema)
