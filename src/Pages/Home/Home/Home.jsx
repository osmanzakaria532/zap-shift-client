import Banner from '../Banner/Banner';
import Brands from '../brands/brands';
import CustomerSatisfaction from '../CustomerSatisfaction/CustomerSatisfaction';
import FAQ from '../FAQ/FAQ';
import Reviews from '../Reviews/Reviews';
import Services from '../Services/Services';
import TDS from '../TDS/TDS';
import WorkingProcess from '../WorkingProcess/WorkingProcess';

const reviewsPromise = fetch('/reviews.json').then((res) => res.json());

const Home = () => {
  return (
    <>
      <Banner />
      <WorkingProcess />
      <Services />
      <Brands />
      {/* Tracking, Delivary and Support */}
      <TDS />
      <CustomerSatisfaction />
      <Reviews reviewsPromise={reviewsPromise} />
      <FAQ />
    </>
  );
};

export default Home;
