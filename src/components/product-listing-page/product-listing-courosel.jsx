import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { products } from '../../assets/pictures/productImageAddress';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';

const ProductCarousel = () => {


  return (
    <div className="product-carousel">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 1000 }}
        loop={true}
        className='product-courosel-swiper-container'
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className='courosel-image-wrapper'>
            <img
              src={product.imgLink}
              alt={`Product ${product.id}`}
              className="carousel-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
