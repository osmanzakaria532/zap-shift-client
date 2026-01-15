import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import brandImg1 from '../../../../src/assets/brands/amazon.png';
import brandImg2 from '../../../../src/assets/brands/amazon_vector.png';
import brandImg3 from '../../../../src/assets/brands/casio.png';
import brandImg4 from '../../../../src/assets/brands/moonstar.png';
import brandImg5 from '../../../../src/assets/brands/randstad.png';
import brandImg6 from '../../../../src/assets/brands/star.png';
import brandImg7 from '../../../../src/assets/brands/start_people.png';
import Container from '../../../Components/Container';

const brandsLogo = [brandImg1, brandImg2, brandImg3, brandImg4, brandImg5, brandImg6, brandImg7];

const Brands = () => {
  return (
    <div className="py-10 mt-10">
      <h2 className="text-center md:text-lg lg:text-3xl font-extrabold mb-4 md:mb-10 text-secondary">
        We've helped thousands of sales teams
      </h2>
      <Container className="flex gap-1.5 justify-center">
        <Swiper
          className="mySwiper"
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          breakpoints={{
            // small device (mobile)
            0: {
              slidesPerView: 2,
            },
            // tablet
            640: {
              slidesPerView: 3,
            },
            // laptop
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {brandsLogo.map((logo, index) => (
            <SwiperSlide key={index} className=" flex! items-center! justify-center! p-1">
              <img src={logo} alt="" className="max-w-20 sm:max-w-20 object-contain " />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default Brands;
