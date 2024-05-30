import { Link } from "react-router-dom"


const Login = () => {
  return (
    <div className="container">
    <div className="card">
      <div className="card_title">
        <h1>Create Account</h1>
        <span>If you don not have an account?<Link to="/Signup">Sign Up</Link></span>
      </div>
      <div className="form">
      <form action="/register" method="post">
        <input type="email" name="email" placeholder="Email" id="email" />
        <input type="password" name="password" placeholder="Password" id="password" />
        <button>Sign Up</button>
        </form>
      </div>
      <div className="card_terms">
          <input type="checkbox" name="" id="terms" /> <span>I have read and agree to the <a href="">Terms of Service</a></span>
      </div>
    </div>
  </div>
  )
}

export default Login