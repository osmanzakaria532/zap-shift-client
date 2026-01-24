import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleGoogleSignin = () => {
    signInGoogle()
      .then((result) => {
        const userInfo = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          // region & district থাকবে পরে complete profile এ
        };

        // POST request to save user
        axiosSecure
          .post('/users', userInfo)
          .then((res) => {
            if (res.data.insertedId) {
              // New user → go to complete profile
              navigate('/complete-profile', { state: { email: result.user.email } });
            } else {
              // Existing user → show success and navigate to previous page or home
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login Successful',
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(location.state?.from || '/');
            }
          })
          .catch((error) => {
            console.log('Error Creating User in DB', error);
          });
      })
      .catch((error) => {
        console.log('Google SignIn Error:', error);
      });
  };

  return (
    <button
      onClick={handleGoogleSignin}
      type="button"
      className="btn bg-[#E9ECF1] text-black text-sm md:text-base border-[#e5e5e5] w-full flex items-center justify-center gap-2"
    >
      <FaGoogle /> Login with Google
    </button>
  );
};

export default SocialLogin;
