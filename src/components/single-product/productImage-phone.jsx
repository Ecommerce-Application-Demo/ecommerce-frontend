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
    //   scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
        {/* <div className='product-image-phone-wrapper'> */}
        {products?.map(product=>{
            return (
                <SwiperSlide><img src={product.imgLink} alt='product' className='single-product-image-phone'/></SwiperSlide>
            )
        })}
        {/* </div> */}
      </Swiper>
      </div>
  )
};

export default ProductImagePhone;