import ServiceImg from '../../../../src/assets/service.png';
import Container from '../../../components/Logo/Container';

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
      id: 1,
      image: ServiceImg,
      header: 'Parcel Return',
      description:
        'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off..',
    },
  ];
  return (
    <div>
      <Container className="bg-secondary py-24 rounded-lg">
        <div className="text-center text-white">
          <h2 className="pl-10 mb-5  font-extrabold text-3xl">Our Services</h2>
          <div className="mt-5 space-y-1.5 text-primary-content">
            <p>
              Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From
              personal packages to
            </p>
            <p>business shipments — we deliver on time, every time.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12 mt-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white hover:bg-primary py-10 px-4 rounded-3xl text-center"
            >
              <div className="flex justify-center">
                <img src={service.image} alt="" />
              </div>
              <h2 className="mt-6 mb-4 text-xl font-bold">{service.header}</h2>
              <p className="text-info">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Services;
