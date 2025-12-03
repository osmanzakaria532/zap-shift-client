import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SocialLogin = () => {
  const { logInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const axiosSecure = useAxiosSecure();

  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(location?.state || '/');

        const userInfo = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };

        axiosSecure.post('/users', userInfo).then((res) => {
          if (res.data.insertedId) {
            console.log('user data has been store  in the database');
          }
        });
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
