const express=require('express')
const router=require('./router/userRouter')
const cors=require('cors')
const corsOptions = {
    origin:["http://localhost:5173"],
    methods:["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true
  };
const app=express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({extended:true}))
app.use('/auth',router)
app.listen(5000,()=>{
    console.log("Listening port is 5000")
})