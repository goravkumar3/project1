import {Routes,Route} from 'react-router-dom'
import { Home,Login,Signup,EmailVerify,ForgetPassword,UpdatePassword } from '../pages'
const Navigator = () => {
  return (
    <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/Home' element={<Home/>} />
    <Route path='/Signup' element={<Signup/>} />
    <Route path='/EmailVerify' element={<EmailVerify/>} />
    <Route path='/ForgetPass' element={<ForgetPassword/>} />
    <Route path='/UpdatePass/:userId' element={<UpdatePassword/>} />
    </Routes>
  )
}

export default Navigator