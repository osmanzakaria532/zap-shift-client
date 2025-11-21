import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Container from '../../../components/Logo/Container';

import { MdArrowOutward } from 'react-icons/md';
import { Link } from 'react-router';
import bannerImg1 from '../../../../src/assets/banner/banner1.png';
import bannerImg2 from '../../../../src/assets/banner/banner2.png';
import bannerImg3 from '../../../../src/assets/banner/banner3.png';

const Banner = () => {
  return (
    <div>
      <Container>
        <Carousel
        // autoPlay={true}
        //  infiniteLoop={true}
        >
          <div className="relative">
            <img src={bannerImg1} />
            <div className="space-x-2.5 absolute left-20 bottom-20 z-50 flex items-center">
              <Link className="flex items-center gap-0.5">
                <span className="btn rounded-md hover:rounded-full transform duration-150 bg-primary hover:bg-primary-dark hover:shadow-lg">
                  Track Your Parcel
                </span>
                <span className="bg-secondary-content w-10 h-10 rounded-full flex justify-center items-center">
                  <MdArrowOutward className="text-xl text-primary" />
                </span>
              </Link>
              <Link className="btn rounded-md hover:rounded-full bg-white ">Be A Rider</Link>
            </div>
          </div>
          <div className="relative">
            <img src={bannerImg2} />
            <div className="space-x-2.5 absolute left-20 bottom-20 z-50 flex items-center">
              <Link className="flex items-center gap-0.5">
                <span className="btn rounded-md hover:rounded-full transform duration-150 bg-primary hover:bg-primary-dark hover:shadow-lg">
                  Track Your Parcel
                </span>
                <span className="bg-secondary-content w-10 h-10 rounded-full flex justify-center items-center">
                  <MdArrowOutward className="text-xl text-primary" />
                </span>
              </Link>
              <Link className="btn rounded-md hover:rounded-full bg-white ">Be A Rider</Link>
            </div>
          </div>
          <div className="relative">
            <img src={bannerImg3} />
            <div className="space-x-2.5 absolute left-20 bottom-20 z-50 flex items-center">
              <Link className="flex items-center gap-0.5">
                <span className="btn rounded-md hover:rounded-full transform duration-150 bg-primary hover:bg-primary-dark hover:shadow-lg">
                  Track Your Parcel
                </span>
                <span className="bg-secondary-content w-10 h-10 rounded-full flex justify-center items-center">
                  <MdArrowOutward className="text-xl text-primary" />
                </span>
              </Link>
              <Link className="btn rounded-md hover:rounded-full bg-white ">Be A Rider</Link>
            </div>
          </div>
        </Carousel>
      </Container>
    </div>
  );
};

export default Banner;
