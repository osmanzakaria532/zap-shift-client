import ServiceImg from '../../../../src/assets/service.png';
import Container from '../../../Components/Container';

const Services = () => {
  const services = [
    {
      id: 1,
      image: ServiceImg,
      header: 'Express  & Standard Delivery',
      description:
        'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off..',
    },
    {
      id: 2,
      image: ServiceImg,
      header: 'Nationwide Delivery',
      description:
        'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.',
    },
    {
      id: 3,
      image: ServiceImg,
      header: 'Booking Pick & Drop',
      description:
        'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off..',
    },
    {
      id: 4,
      image: ServiceImg,
      header: 'Fulfillment Solution',
      description:
        'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off..',
    },
    {
      id: 5,
      image: ServiceImg,
      header: 'Corporate Service / Contract In Logistics',
      description:
        'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off..',
    },
    {
      id: 6,
      image: ServiceImg,
      header: 'Parcel Return',
      description:
        'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off..',
    },
  ];
  return (
    <div className="">
      <Container className="px-2 xl:px-0">
        <div className="bg-secondary py-5 md:py-12 lg:py-24  rounded-4xl">
          <div className="text-center text-white">
            <h2 className="mb-5  font-extrabold text-3xl">Our Services</h2>
            <div className="mt-5 space-y-1.5 text-primary-content px-1 md:px-0 text-sm md:text-base w-2xs md:w-auto mx-auto">
              <p>
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From
                personal packages to
              </p>
              <p>business shipments — we deliver on time, every time.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 md:px-6 lg:px-12 mt-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white hover:bg-primary transition-all duration-300 py-5 lg:py-10 px-4 rounded-3xl text-center"
              >
                <div className="flex justify-center">
                  <img src={service.image} alt="" />
                </div>
                <h2 className="mt-6 mb-4 text-lg md:text-xl font-bold">{service.header}</h2>
                <p className="text-info text-sm md:text-base">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Services;
