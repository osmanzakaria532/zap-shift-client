import { Link } from 'react-router-dom';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
  return (
    <div className="py-10">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h2 className="text-[22px] md:text-[42px] font-extrabold">Create an Account</h2>
        <p className="text-sm md:text-base">Register with ZapShift</p>
      </div>
      <form className="w-full max-w-sm">
        <fieldset className="fieldset">
          {/* name field */}
          <label className="label">Your Name is</label>
          <input type="text" className="input w-full" placeholder="Name" />
        </fieldset>
        <fieldset className="fieldset flex flex-col md:flex-row">
          {/* Resion And District */}
          <div className="w-full md:w-1/2">
            <legend className="fieldset-legend">Your Region is</legend>
            <select defaultValue="Select Your Region" className="select appearance-none  w-full">
              <option>Select Your Region</option>
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <legend className="fieldset-legend">Your Dristrict is</legend>
            <select defaultValue="Select Your Districts" className="select appearance-none  w-full">
              <option>Select Your Districts</option>
            </select>
          </div>
        </fieldset>
        <fieldset className="fieldset">
          {/* /email field */}
          <label className="label">Photo</label>
          <input type="file" className="file-input w-full" placeholder="Add Your Photo " />
        </fieldset>
        <fieldset className="fieldset">
          {/* /email field */}
          <label className="label">Email</label>
          <input type="email" className="input w-full" placeholder="Email" />
        </fieldset>
        <fieldset className="fieldset">
          {/* password field */}
          <label className="label">Password</label>
          <input type="password" className="input w-full" placeholder="Password" />
        </fieldset>
        <button className="btn w-full bg-primary mt-4">Register</button>
        <p className="mt-2 text-sm md:text-base">
          Already have an account?{' '}
          <Link to="/sign-in" className="link link-hover text-[#8FA748] ">
            Sign In
          </Link>
        </p>
        <p className="text-center my-2">Or</p>
        <SocialLogin />
      </form>
    </div>
  );
};

export default Register;
