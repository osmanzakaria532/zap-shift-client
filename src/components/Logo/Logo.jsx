import { Link } from 'react-router';
import logo from '../../../src/assets/logo.png';

const Logo = ({ target = '', className = '' }) => {
  return (
    <Link to={`${target}`} className="inline-block">
      <img src={logo} alt="" className={`${className}`} />
    </Link>
  );
};

export default Logo;
