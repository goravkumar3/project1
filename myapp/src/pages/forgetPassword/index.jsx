import {Link} from "react-router-dom"
import { useState } from "react"

const ForgetPassword = () => {
  // let Navigate=useNavigate()
  let [email,setEmail]=useState('')
  const forgetPassword=async()=>{
  try {
    const res=await fetch('http://localhost:5000/auth/forget',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email})
     })
     const data=await res.json()
     console.log(data)
    //  if(data.msg==="signup successfully"){
    //   localStorage.setItem('token',data.token)
    //  }
  } catch (error) {
    console.log(error)
  }
  }
  return (
    <div className="container">
    <div className="card">
      <div className="card_title">
        <h1>Create Account</h1>
        <span>If you don not have an account?<Link to="/Signup">Sign Up</Link></span>
      </div>
      <div className="form">
      <div>
        <input type="email" name="email" placeholder="Email" id="email" onChange={(e)=>setEmail(e.target.value)}  />
        <button onClick={forgetPassword}>Forget Password</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ForgetPassword