const {model,Schema} = require('mongoose')

const PostSchema = new Schema({
    postName:{
        type:String,
        required:true
    },
    postDescription:{
        type:String,
        required:true,
        unique:false
    },
    background:{
        type:String,
        required:true,
        default:''
    },
    user:{
        ref:'User',
        type:Schema.Types.ObjectId
    }
})


module.exports = model('Post',PostSchema)
