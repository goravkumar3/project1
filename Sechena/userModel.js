const { boolean } = require('joi')
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
mongoose.connect('mongodb://127.0.0.1:27017/blogWeb')
const userSchema=new mongoose.Schema({
  fullname:{
    type:String
  },
  email:{
    type:String
  },password:{
    type:String
  },otpnum:{
    type:String
  },isVerify:{
    type:Boolean,
    default:false
  }
})
userSchema.pre('save',async function(next){
  const user=this
  if(!user.isModified('password')){
    next()
  }
  const salt=await bcrypt.genSalt(12)
  const hashpass=await bcrypt.hashSync(user.password,salt)
  user.password=hashpass
})
module.exports=mongoose.model('user',userSchema)