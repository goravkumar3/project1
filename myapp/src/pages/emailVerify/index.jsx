import {useNavigate} from "react-router-dom"
import { useState } from "react"
const EmailVerify = () => {
  let Navigate=useNavigate()
  let [otpnum,setOtpnum]=useState('')
  const matchHandler=async()=>{
  try {
    const res=await fetch('http://localhost:5000/auth/verify',{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({otpnum})
     })
     const data=await res.json()
     console.log(data)
     if(data.msg==="verified"){
      localStorage.setItem('verify',data.msg)
      Navigate('/Home')
     }
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className="container">
    <div className="card">
      <div className="card_title">
        <h1>Create Account</h1>
        <span>Verify Your email to enter your Otp</span>
      </div>
      <div className="form">
        <input type="text" placeholder="Otp Number" id="email" onChange={(e)=>setOtpnum(e.target.value)}/>
        <button onClick={matchHandler}>Send</button>
      </div>
    </div>
  </div>
  )
}

export default EmailVerify