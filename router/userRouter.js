const express=require('express')
const userModel=require('../Sechena/userModel')
const userValidate=require('../validate/userValidate')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
const secret="blogbuddy"
const router=express()
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'kg558390@gmail.com',
           pass: 'slhvmfyplbcoswxg'
       }
   });
  
router.post('/signup',async(req,res)=>{
try {
    await userValidate.validateAsync(req.body)
    const {fullname,email,password}=req.body
    const emailchecki=await userModel.findOne({email})
    if(emailchecki){
        res.json({msg:"this email already used"})
    }else{
    const otpnum=Math.floor(100000+Math.random()*900000)
    const user=await userModel.create({fullname,email,password,otpnum})
    const userId=user._id
    const token=jwt.sign({userId},secret)
    const mailOptions = {
        from: 'kg558390@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'verify your account', // Subject line
        html: `this is your otp:${otpnum}`// plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
         if(err)
           console.log(err)
         else
         res.status(200).json({token,info,msg:"signup successfully"})
      });
    }
} catch (error) {
    res.status(400).json({err:error})
}
})
router.patch('/verify',async(req,res)=>{
    try {
        const {otpnum}=req.body
        const user=await userModel.updateOne({otpnum},{$set:{isVerify:true}})
        res.status(200).json({msg:"verified",user})
    } catch (error) {
        res.status(400).json({err:error})
    }
    })
    
module.exports=router