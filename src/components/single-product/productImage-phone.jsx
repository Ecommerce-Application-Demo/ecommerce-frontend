import { Navigation, Pagination, Scrollbar, A11y, EffectFlip } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-flip';
import { products } from '../../assets/pictures/productImageAddress';

const ProductImagePhone = () => {
  return (
    <div className='product-image-phone-container'>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFlip]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      EffectFlip={true}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
        {products?.map(product=>{
            return (
                <SwiperSlide><img src={product.imgLink} alt='product' className='single-product-image-phone'/></SwiperSlide>
            )
        })}
      </Swiper> 
      {/* <div style={{width:'100%'}}>
      <img src='https://assets.myntassets.com/assets/images/19182178/2022/12/3/3e9fae85-912c-4034-aca3-ff615c471e381670067566360-U-S-Polo-Assn-Men-Tan-Slim-Fit-Wrinkle-Free-Corduroy-Trouser-4.jpg?im=Crop,rect=(368,706,302,576)' alt='product'/>
      </div> */}
      </div>
  )
};

export default ProductImagePhone;