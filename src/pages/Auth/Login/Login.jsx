import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
  const { logInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const handleLogIn = (data) => {
    console.log('login submitted', data);
    logInUser(data.email, data.password)
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
    <div className="">
      <h2 className="text-[42px] font-extrabold">Welcome Back</h2>
      <p>Login with ZapShift</p>

      <form onSubmit={handleSubmit(handleLogIn)} className="w-[385px]">
        <fieldset className="fieldset">
          {/* /email field */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input w-full"
            placeholder="Email"
            {...register('email', { required: true })}
          />
          {/* password field */}
          <label className="label">Password</label>
          <input
            type="password"
            className="input w-full"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          <div>
            <Link to="/forgot-password" className="link link-hover text-[#71717A]">
              Forgot password?
            </Link>
          </div>
          <button className="btn bg-primary mt-4">Login</button>
        </fieldset>
        <p className="mt-2">
          Don't have any account?{' '}
          <Link to="/register" className="link link-hover text-primary">
            Register
          </Link>
        </p>
        <p className="text-center my-2">Or</p>
        <SocialLogin />
      </form>
    </div>
  );
};
export default Login;
