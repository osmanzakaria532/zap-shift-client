import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // console.log('Social Component', { location, navigate });

  const handleGoogleSignin = (data) => {
    console.log(data);
    signInGoogle()
      .then((result) => {
        console.log(result.user);

        navigate(location.state || '/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <button
      onClick={handleGoogleSignin}
      type="button"
      className="btn bg-[#E9ECF1] text-black text-sm md:text-base border-[#e5e5e5] w-full"
    >
      <FaGoogle />
      Login with Google
    </button>
  );
};

export default SocialLogin;
