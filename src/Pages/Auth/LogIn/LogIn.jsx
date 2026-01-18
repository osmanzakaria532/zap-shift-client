import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // console.log('Login page', { location, navigate });

  const handleLogIn = (data) => {
    console.log('Login From Data', data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        navigate(location.state || '/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="py-10 px-2 xl:px-0 h-screen w-full flex justify-center items-center">
      <div className="w-full">
        <div className="md:flex justify-center items-center">
          <div>
            <div className="text-center md:text-left! mb-4 md:mb-0">
              <h2 className="text-[22px] md:text-[42px] font-extrabold">Welcome Back</h2>
              <p>Login with ZapShift</p>
            </div>

            <form onSubmit={handleSubmit(handleLogIn)} className="md:w-96.25">
              <fieldset className="fieldset">
                {/* /email field */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  {...register('email', { required: true })}
                />
                {errors.email?.type === 'required' && (
                  <p className="text-red-500">Email Is Required</p>
                )}
              </fieldset>
              <fieldset>
                {/* password field */}
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                  {...register('password', { required: true })}
                />
                {errors.password?.type === 'required' && (
                  <p className="text-red-500">Password Is Required</p>
                )}
              </fieldset>
              <div className="mt-2">
                <Link to="/forgot-password" className="link link-hover text-[#71717A]">
                  Forgot password?
                </Link>
              </div>
              <button type="submit" className="btn bg-primary mt-4 w-full">
                Login
              </button>
              <p className="mt-2 text-sm md:text-base">
                Don't have any account?{' '}
                <Link
                  to="/register"
                  state={location.state}
                  className="link link-hover text-[#8FA748]"
                >
                  Register
                </Link>
              </p>
              <p className="text-center my-2">Or</p>
              <SocialLogin />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
