import { Link } from 'react-router-dom';
import LogoImg from '../../assets/logo.png';

const Logo = () => {
  return (
    <Link to="/" className="flex items-end">
      <img src={LogoImg} alt="" className="w-6.5 lg:w-auto" />
      <h3 className="md:text-2xl lg:text-3xl font-bold -ms-2.5">ZapShift</h3>
    </Link>
  );
};

export default Logo;
