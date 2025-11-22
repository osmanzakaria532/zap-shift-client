import { useNavigate } from 'react-router';

const NotFoundImg = '../../../src/assets/not-found-img.png';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <img src={NotFoundImg} alt="" />
        <div className="space-x-3.5">
          <button
            onClick={() => navigate('/')}
            className="text-xl font-bold text-center mt-5 bg-primary py-2 px-4 rounded-lg coupo"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-xl font-bold text-center mt-5 bg-primary py-2 px-4 rounded-lg coupo"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
