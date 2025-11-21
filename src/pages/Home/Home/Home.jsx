import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import WorkingProcess from '../WorkingProcess/WorkingProcess';

const Home = () => {
  return (
    <div>
      <div className="py-10">
        <Banner />
        <WorkingProcess />
        <Services />
      </div>
    </div>
  );
};

export default Home;
