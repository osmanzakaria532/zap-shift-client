import trackingImg from '../../../../src/assets/tds/live-tracking.png';
import delivaryImg from '../../../../src/assets/tds/safe-delivery.png';
import Container from '../../../components/Logo/Container';

const TDS = () => {
  const tds_content = [
    {
      id: 1,
      image: trackingImg,
      headLine: 'Live Parcel Tracking',
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      id: 2,
      image: delivaryImg,
      headLine: '100% Safe Delivery',
      description:
        'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
    },
    {
      id: 3,
      image: delivaryImg,
      headLine: '24/7 Call Center Support',
      description:
        'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
    },
  ];
  return (
    <div>
      <Container className="mt-24">
        <div className="space-y-6 px-12 ">
          <div className="border-t border-dashed pt-20"></div>
          {tds_content.map((content) => (
            <div key={content.id} className="bg-white p-8 rounded-3xl flex items-center">
              <div className="border-r border-dashed lg:pr-12 w-40 flex justify-center">
                <img src={content.image} alt="" className="max-w-28 max-h-28" />
              </div>

              <div className="lg:pl-12">
                <h2 className="text-2xl font-bold mb-2 text-secondary">{content.headLine}</h2>
                <p className="text-info">{content.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TDS;
