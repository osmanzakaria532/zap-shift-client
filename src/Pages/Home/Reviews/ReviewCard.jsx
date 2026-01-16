import { FaQuoteRight } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  if (!review) return null;
  const { userName, review: testimonial, user_photoURL } = review;
  return (
    <div>
      <div className="max-w-md bg-white rounded-xl shadow-sm p-6 ">
        {/* Quote mark */}
        <div className=" text-teal-300 text-3xl mb-2">
          <FaQuoteRight />
        </div>

        {/* Quote text */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{testimonial}</p>

        {/* Dashed divider */}
        <div className="border-t border-dashed border-gray-300 my-4" />

        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full shrink-0 bg-teal-800 overflow-hidden"
            style={{ backgroundColor: '#0f4c49' }}
          >
            <img src={user_photoURL} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="text-teal-900 font-semibold">{userName}</div>
            <div className="text-xs text-gray-400">Senior Product Designer</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
