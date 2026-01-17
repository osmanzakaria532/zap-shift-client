import { Link } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';

const LogIn = () => {
  return (
    <div className="py-10 px-2 xl:px-0 h-screen w-full flex justify-center items-center">
      <div className="w-full">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-[22px] md:text-[42px] font-extrabold">Welcome Back</h2>
          <p>Login with ZapShift</p>
        </div>

        <form className="md:w-96.25">
          <fieldset className="fieldset">
            {/* /email field */}
            <label className="label">Email</label>
            <input type="email" className="input w-full" placeholder="Email" />
            {/* password field */}
            <label className="label">Password</label>
            <input type="password" className="input w-full" placeholder="Password" />
            <div>
              <Link to="/forgot-password" className="link link-hover text-[#71717A]">
                Forgot password?
              </Link>
            </div>
          </fieldset>
          <button type="submit" className="btn bg-primary mt-4 w-full">
            Login
          </button>
          <p className="mt-2 text-sm md:text-base">
            Don't have any account?{' '}
            <Link to="/register" className="link link-hover text-[#8FA748]">
              Register
            </Link>
          </p>
          <p className="text-center my-2">Or</p>
          <SocialLogin />
        </form>
      </div>
    </div>
  );
};

export default LogIn;
