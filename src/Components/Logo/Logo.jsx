import { Link } from 'react-router';
import LogoImg from '../../assets/logo.png';

const Logo = () => {
  return (
    <Link to="/" className="flex items-end">
      <img src={LogoImg} alt="" />
      <h3 className="text-3xl font-bold -ms-2.5">ZapShift</h3>
    </Link>
  );
};

export default Logo;
