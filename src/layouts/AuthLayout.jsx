import { Outlet } from 'react-router-dom';
import authImg from '../../src/assets/authImage.png';
import Logo from '../Components/Logo/Logo';

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen">
      {/* Logo */}
      <div className="absolute top-4 left-4 z-50 hidden">
        <Logo target="/" className="w-28" />
      </div>

      <div className="md:flex min-h-screen">
        {/* Left side (form) */}
        <div className="md:w-1/2 flex items-center justify-center bg-white">
          <Outlet />
        </div>

        {/* Right side (image) */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-[#FAFDF0]">
          <img src={authImg} alt="auth" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
