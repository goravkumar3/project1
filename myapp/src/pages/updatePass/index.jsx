import {useParams,useNavigate} from "react-router-dom"
import { useState } from "react"

const UpdatePassword = () => {
  let params=useParams()
  let {userId}=params
  // console.log(params.userId)
  let Navigate=useNavigate()
  let [password,setPassword]=useState('')
  const updatePassword=async()=>{
   
  try {
    const res=await fetch('http://localhost:5000/auth/updatePass',{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({userId,password})
     })
     const data=await res.json()
     console.log(data)
     if(data.msg==="updatePass"){
     Navigate('/');
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
      </div>
      <div className="form">
      <div>
        <input type="password" name="password" placeholder="Update Password" id="password" onChange={(e)=>setPassword(e.target.value)}  />
        <button onClick={updatePassword}>Update Password</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UpdatePassword