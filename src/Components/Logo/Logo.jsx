import { Link } from 'react-router';
import LogoImg from '../../assets/logo.png';

const Logo = () => {
  return (
    <Link to="/" className="flex items-end">
      <img src={LogoImg} alt="" className="w-6.5 md:w-auto" />
      <h3 className=" md:text-3xl font-bold -ms-2.5">ZapShift</h3>
    </Link>
  );
};

export default Logo;
