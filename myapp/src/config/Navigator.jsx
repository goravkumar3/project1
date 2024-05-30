import {Routes,Route} from 'react-router-dom'
import { Home,Login,Signup,EmailVerify } from '../pages'
const Navigator = () => {
  return (
    <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/Home' element={<Home/>} />
    <Route path='/Signup' element={<Signup/>} />
    <Route path='/EmailVerify' element={<EmailVerify/>} />
    </Routes>
  )
}

export default Navigator