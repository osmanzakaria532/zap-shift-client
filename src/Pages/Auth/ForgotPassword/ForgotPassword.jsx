import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="h-screen w-full py-10 px-2 xl:px-0 flex justify-center items-center">
      <div className="w-full flex items-center justify-center">
        <div className="">
          <div className="text-center md:text-left">
            <h2 className="text-[22px] md:text-[42px] font-extrabold">Forgot Password</h2>
            <p className="mb-5 hidden md:block">
              Enter your email address and we'll send you a <br /> reset link.
            </p>
            <p className="mb-5 block md:hidden text-sm">
              Enter your email address and <br /> we'll send you a reset link.
            </p>
          </div>

          <form action="" className="md:w-96.25">
            <fieldset className="fieldset">
              {/* /email field */}
              <label className="label">Email</label>
              <input type="email" className="input w-full" placeholder="Email" />
              <button type="button" className="btn bg-primary mt-4">
                Send
              </button>
            </fieldset>
            <p className="mt-2 text-sm md:text-base">
              Remember your password?{' '}
              <Link to="/sign-in" className="link link-hover text-primary">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
