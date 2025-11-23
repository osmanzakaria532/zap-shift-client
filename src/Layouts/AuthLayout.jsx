import { Outlet } from 'react-router';

import authImg from '../../src/assets/authImage.png';
import Logo from '../components/Logo/Logo';

const AuthLayout = () => {
  return (
    <div className="">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full z-50 mt-4 pl-10">
          <Logo target="/" className="w-28" />
        </div>
        <div className="flex justify-center items-center">
          <div className="w-1/2 h-screen relative flex justify-center items-center">
            <div className="bg-white absolute top-0 left-0 w-full h-full z-40!"></div>
            <div className="z-50">
              <Outlet />
            </div>
          </div>
          <div className="w-1/2 h-screen relative overflow-hidden flex justify-center items-center">
            <div className="bg-[#FAFDF0] absolute top-0 left-0 w-full h-full z-40!"></div>
            <img src={authImg} alt="auth-image" className="z-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
