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
    imageSrc:{
        type:String,
        default:''
    },
    createDate: {type:Date, required:false,unique:false},
    userId:{type:Schema.Types.ObjectId,ref:'User'},
    author:{type:Object, required:false,unique:false}
})


module.exports = model('Post',PostSchema)
