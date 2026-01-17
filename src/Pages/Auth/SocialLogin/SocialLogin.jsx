import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {
  return (
    <button
      type="button"
      className="btn bg-[#E9ECF1] text-black text-sm md:text-base border-[#e5e5e5] w-full"
    >
      <FaGoogle />
      Login with Google
    </button>
  );
};

export default SocialLogin;
