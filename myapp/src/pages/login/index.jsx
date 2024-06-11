import { Link,useNavigate} from "react-router-dom"
import { useState } from "react"

const Login = () => {
  let Navigate=useNavigate()
  let [email,setEmail]=useState('')
  let [password,setPassword]=useState('')
  const signinHandler=async()=>{
  try {
    const res=await fetch('http://localhost:5000/auth/signin',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
     })
     const data=await res.json()
     console.log(data)
     if(data.msg==="signin successfully"){
      localStorage.setItem('token',data.token)
       if(data.emailVerify){
        Navigate('/Home')
       }else{
        Navigate('/EmailVerify')
       }
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
        <span>If you don not have an account?<Link to="/Signup">Sign Up</Link></span>
      </div>
      <div className="form">
      <div>
        <input type="email" name="email" placeholder="Email" id="email" onChange={(e)=>setEmail(e.target.value)}  />
        <input type="password" name="password" placeholder="Password" id="password"  onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={signinHandler}>Sign in</button>
        <Link to='/ForgetPass'>Forget Password?</Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login