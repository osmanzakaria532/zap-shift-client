import topImg from '../../../../src/assets/be-a-merchant-bg.png';
import merchantBox from '../../../../src/assets/location-merchant.png';
import Container from '../../../components/Logo/Container';

const CustomerSatisfaction = () => {
  return (
    <div className="py-10 mt-20">
      <Container className="lg:px-12">
        <div className="border-t border-dashed pt-20"></div>
        <div className="bg-secondary rounded-4xl p-20 relative flex ">
          <div className="absolute top-0">
            <img src={topImg} alt="" />
          </div>

          <div className="">
            <h2 className="text-[40px] font-extrabold text-white">
              <div>Merchant and Customer Satisfaction</div>
              <div>is Our First Priority</div>
            </h2>
            <p className="leading-6 text-primary-content">
              <span className="block">
                We offer the lowest delivery charge with the highest value along with
              </span>
              <span className="block">
                100% safety of your product. Pathao courier delivers your parcels in every
              </span>
              <span className="block">corner of Bangladesh right on time.</span>
            </p>
            <div className="mt-8 space-x-3.5">
              <button className="btn bg-primary hover:bg-transparent hover:text-primary hover:border-primary hover:rounded-full transform transition duration-150 shadow-none">
                Become a Merchant
              </button>
              <button className="btn bg-transparent hover:bg-primary text-primary hover:text-black border-primary hover:rounded-full transform transition duration-150 shadow-none">
                Earn with ZapShift Courier
              </button>
            </div>
          </div>
          <div className="w-[425px]! absolute right-8 bottom-20">
            <img src={merchantBox} alt="" className="w-full" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CustomerSatisfaction;
