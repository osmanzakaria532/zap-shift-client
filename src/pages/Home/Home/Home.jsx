import Banner from '../Banner/Banner';
import Brands from '../brands/brands';
import Services from '../Services/Services';
import TDS from '../TDS/TDS';
import WorkingProcess from '../WorkingProcess/WorkingProcess';

const Home = () => {
  return (
    <div>
      <div className="py-10">
        <Banner />
        <WorkingProcess />
        <Services />
        <Brands />
        {/* Tracking, Delivery & Support */}
        <TDS />
      </div>
    </div>
  );
};

export default Home;
