import { Navigation, Pagination, Scrollbar, A11y, EffectFlip } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-flip';
import { objectToArrayConverter } from '../../api/utilities/helper';

const ProductImagePhone = ({productImages}) => {
  const imageArray = productImages ? objectToArrayConverter(productImages) : [];

  return (
    <div className='product-image-phone-container'>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFlip]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      EffectFlip={true}
      loop={true}
      autoplay={20}
    >
        {imageArray?.map(product=>{
            return (
                <SwiperSlide><img src={product} alt='product' className='single-product-image-phone'/></SwiperSlide>
            )
        })}
      </Swiper> 
      </div>
  )
};

export default ProductImagePhone;