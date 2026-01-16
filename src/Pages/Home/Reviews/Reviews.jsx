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
    <div className="lg:pt-24">
      <Container>
        <div className="flex flex-col gap-3.5 justify-center items-center max-w-200 mx-auto text-center mb-10">
          <div className="">
            <img src={cusmTop} alt="" />
          </div>
          <h2 className="text-4xl font-extrabold text-secondary">What our customers are sayings</h2>
          <p className="text-info leading-6">
            Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper
            alignment, reduce pain, and strengthen your body with ease!
          </p>
        </div>
        <Swiper
          // loop={true}
          spaceBetween={30}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          effect={'coverflow'}
          coverflowEffect={{
            rotate: 30,
            stretch: '50%',
            depth: 200,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          // autoplay={{
          //   delay: 2000,
          //   disableOnInteraction: false,
          // }}
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
