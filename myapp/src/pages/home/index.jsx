import { useEffect } from 'react';
import {useNavigate} from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination,Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image1 from '../../media/images/cederic-vandenberghe-21DP3hytVHw-unsplash.jpg'
import Image2 from '../../media/images/james-wheeler-XuAxyq0uRT0-unsplash.jpg'
import Image3 from '../../media/images/johannes-plenio-DKix6Un55mw-unsplash.jpg'
import Image4 from '../../media/images/nasa-Q1p7bh3SHj8-unsplash.jpg'

const Home = () => {
  let Navigate=useNavigate()
  let logout=()=>{
    localStorage.removeItem('token')
  }
  useEffect(() => {
    if(localStorage.getItem('token')===null){
       Navigate('/')
    }if(localStorage.getItem('verify')===null){
      Navigate('/EmailVerify')
    }
  
  }, [])
  
  return (
    <div className='swipContainer'>
      <button onClick={logout}>Logout</button>
        <Swiper
     modules={[EffectCoverflow, Pagination,Autoplay]}
     autoplay={true}
     effect={'coverflow'}
     grabCursor={true}
     slidesPerView={'auto'}
     centeredSlides={true}
     coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: false,
      }}
     pagination={true}
     className="mySwiper"
    >
      <SwiperSlide className='box'><img src={Image1} alt=""  /></SwiperSlide>
      <SwiperSlide className='box'><img src={Image2} alt="" /></SwiperSlide>
      <SwiperSlide className='box'><img src={Image3} alt="" /></SwiperSlide>
      <SwiperSlide className='box'><img src={Image4} alt="" /></SwiperSlide>
    </Swiper>
    </div>
  )
}

export default Home