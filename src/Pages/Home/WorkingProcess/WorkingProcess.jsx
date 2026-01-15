import WorkingProcessImg from '../../../../src/assets/WorkingProcessImg.png';
import Container from '../../../Components/Container';

const WorkingProcess = () => {
  const contents = [
    {
      id: 1,
      image: WorkingProcessImg,
      header: 'Booking Pick & Drop',
      description: 'From personal packages to business shipments — we deliver on time, every time.',
    },
    {
      id: 2,
      image: WorkingProcessImg,
      header: 'Booking Pick & Drop',
      description: 'From personal packages to business shipments — we deliver on time, every time.',
    },
    {
      id: 3,
      image: WorkingProcessImg,
      header: 'Booking Pick & Drop',
      description: 'From personal packages to business shipments — we deliver on time, every time.',
    },
    {
      id: 4,
      image: WorkingProcessImg,
      header: 'Booking Pick & Drop',
      description: 'From personal packages to business shipments — we deliver on time, every time.',
    },
  ];
  return (
    <div className="py-12 lg:py-24">
      <Container className="px-2 md:px-0">
        <h2 className="pl-10 mb-5 text-secondary font-extrabold text-3xl">How it Works</h2>
        <div className="md:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contents.map((content) => (
              <div key={content.id} className="bg-white py-10 px-4 rounded-3xl">
                <div>
                  <img src={content.image} alt="" />
                </div>
                <h2 className="mt-6 mb-4 text-xl font-bold">{content.header}</h2>
                <p className="text-info">{content.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WorkingProcess;
