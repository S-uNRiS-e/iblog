const {Schema,model} = require('mongoose')

const UserSchema = new Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,unique:true,required:true},
    avatar: {type:String, required:false}
})
module.exports = model('User',UserSchema)
