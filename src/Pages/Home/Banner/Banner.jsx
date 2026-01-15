import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router';
import bannerImg1 from '../../../../src/assets/banner/banner1.png';
import bannerImg2 from '../../../../src/assets/banner/banner2.png';
import bannerImg3 from '../../../../src/assets/banner/banner3.png';
import Container from '../../../Components/Container';

const Banner = () => {
  const bannerBtn = (
    <>
      <Link className="flex items-center group gap-0.5">
        <span className="btn rounded-md group-hover:rounded-full transform duration-150 bg-primary hover:bg-primary-dark group-hover:shadow-lg">
          Track Your Parcel
        </span>
        <span className="bg-secondary-content group-hover:w-9  group-hover:h-9 w-10 h-10 rounded-full flex justify-center items-center group-hover:shadow-lg">
          <MdArrowOutward className="text-xl text-primary" />
        </span>
      </Link>
      <Link to="/rider" className="btn rounded-md hover:rounded-full bg-white ">
        Be A Rider
      </Link>
    </>
  );
  return (
    <div className="py-10">
      <Container>
        <Carousel autoPlay={true} infiniteLoop={true}>
          <div className="relative">
            <img src={bannerImg1} />
            <div className="space-x-2.5 absolute left-20 bottom-20 z-50 flex items-center">
              {bannerBtn}
            </div>
          </div>
          <div className="relative">
            <img src={bannerImg2} />
            <div className="space-x-2.5 absolute left-20 bottom-20 z-50 flex items-center">
              {bannerBtn}
            </div>
          </div>
          <div className="relative">
            <img src={bannerImg3} />
            <div className="space-x-2.5 absolute left-20 bottom-20 z-50 flex items-center">
              {bannerBtn}
            </div>
          </div>
        </Carousel>
      </Container>
    </div>
  );
};

export default Banner;
