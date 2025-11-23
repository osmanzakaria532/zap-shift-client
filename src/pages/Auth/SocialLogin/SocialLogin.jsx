import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const SocialLogin = () => {
  const { logInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(location?.state || '/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="btn bg-[#E9ECF1] text-black border-[#e5e5e5] w-full"
    >
      <FaGoogle />
      Login with Google
    </button>
  );
};

export default SocialLogin;
