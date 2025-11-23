import { Link } from 'react-router';

const ForgotPassword = () => {
  return (
    <div className="">
      <h2 className="text-[42px] font-extrabold">Forgot Password</h2>
      <p className="mb-5">
        Enter your email address and we’ll send you a <br /> reset link.
      </p>

      <form action="" className="w-[385px]">
        <fieldset className="fieldset">
          {/* /email field */}
          <label className="label">Email</label>
          <input type="email" className="input w-full" placeholder="Email" />
          <button type="button" className="btn bg-primary mt-4">
            Send
          </button>
        </fieldset>
        <p className="mt-2">
          Remember your password?{' '}
          <Link to="/login" className="link link-hover text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
