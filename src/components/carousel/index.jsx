import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './carousel.module.scss';
import { CarouselData } from '../../constants';

const FullWidthImageCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed:1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, 
  };
  return (
    <div className={style['main-slider']}>
      <Slider {...settings}>
        {CarouselData.map((imageUrl) => (
          <div key={imageUrl.id} className={style['slider']}>
            <img src={imageUrl.imageUrl} alt={`Slide ${imageUrl.id}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FullWidthImageCarousel;
