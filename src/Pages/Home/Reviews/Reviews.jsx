import { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import cusmTop from '../../../../src/assets/customer-top.png';
import Container from '../../../Components/Container';
import ReviewCard from './ReviewCard';

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  // const reviews = reviewsPromise;
  // console.log(reviews);

  // const [reviews, setReviews] = useState([]);
  // useEffect(() => {
  //   fetch('/reviews.json')
  //     .then((res) => res.json())
  //     .then((data) => setReviews(data));
  // }, []);

  return (
    <div className="py-6 lg:py-14 px-2 lg:px-0">
      <Container>
        <div className="flex flex-col gap-3.5 justify-center items-center max-w-200 mx-auto text-center mb-10">
          <div className="">
            <img src={cusmTop} alt="" className="w-40 md:w-auto" />
          </div>
          <h2 className="md:text-4xl font-extrabold text-secondary">
            What our customers are sayings
          </h2>
          <p className="text-info md:leading-6 text-sm md:text-base">
            Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper
            alignment, reduce pain, and strengthen your body with ease!
          </p>
        </div>
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          pagination={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          effect="coverflow"
          modules={[EffectCoverflow, Pagination, Autoplay]}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 200,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          breakpoints={{
            // Mobile
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // Tablet
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            // Desktop
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id || review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default Reviews;
