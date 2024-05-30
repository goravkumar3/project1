import { Link ,useNavigate} from "react-router-dom"
import { useState } from "react"
const Signup = () => {
  let Navigate=useNavigate()
  let [fullname,setFullname]=useState('')
  let [email,setEmail]=useState('')
  let [password,setPassword]=useState('')
  const signupHandler=async()=>{
  try {
    const res=await fetch('http://localhost:5000/auth/signup',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({fullname,email,password})
     })
     const data=await res.json()
     if(data.msg==="signup successfully"){
      localStorage.setItem('token',data.token)
      Navigate('/EmailVerify')
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
        <span>Already have an account?  <Link to="/">Sign in</Link></span>
      </div>
      <div className="form">
        <input type="text" name="fullname" id="fullname" placeholder="FullName" onChange={(e)=>setFullname(e.target.value)} />
        <input type="email" name="email" placeholder="Email" id="email" 
        onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" name="password" placeholder="Password" id="password" onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={signupHandler}>Sign Up</button>
      </div>
      <div className="card_terms">
          <input type="checkbox" name="" id="terms" /> <span>I have read and agree to the <a href="">Terms of Service</a></span>
      </div>
    </div>
  </div>
  )
}

export default Signup